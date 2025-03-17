/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import CompanyService from '../../src/services/CompanyService';
import CompanyRepository from '../../src/repositories/CompanyRepository';
import { NotFoundError, ValidationError } from '../../src/errors/AppError';
import { ZodError } from 'zod';
import { describe, it, afterEach } from 'mocha';
import { Company } from '../../src/models/Company';

describe('CompanyService', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('createCompany', () => {
    it('should create a company when valid data is provided', async () => {
      const companyData = { name: 'Empresa Teste', country: 'Brasil' };
      const createdCompany = { id: '1', ...companyData, createdAt: new Date() };
      sinon.stub(CompanyRepository, 'create').resolves(createdCompany);

      const result = await CompanyService.createCompany(companyData);
      expect(result).to.deep.equal(createdCompany);
    });

    it('should throw a ZodError if the company name is missing', async () => {
      const invalidData = { country: 'Brasil' } as Company;
      try {
        await CompanyService.createCompany(invalidData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });

    it('should throw a ZodError if the country is missing', async () => {
      const invalidData = { name: 'Empresa Teste' } as Company;
      try {
        await CompanyService.createCompany(invalidData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('getCompanyById', () => {
    it('should return the company when a valid id is provided', async () => {
      const companyId = '1';
      const company = {
        id: companyId,
        name: 'Empresa Teste',
        country: 'Brasil',
        createdAt: new Date(),
      };

      sinon
        .stub(CompanyRepository, 'findById')
        .withArgs(companyId)
        .resolves(company);

      const result = await CompanyService.getCompanyById(companyId);
      expect(result).to.deep.equal(company);
    });

    it('should throw a ValidationError if the id is empty', async () => {
      try {
        await CompanyService.getCompanyById('');
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Company ID is required');
      }
    });

    it('should throw a NotFoundError if the company is not found', async () => {
      const companyId = '1';
      sinon
        .stub(CompanyRepository, 'findById')
        .withArgs(companyId)
        .resolves(null);

      try {
        await CompanyService.getCompanyById(companyId);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
        expect((error as Error).message).to.equal('Company not found');
      }
    });
  });

  describe('getAllCompanys', () => {
    it('should return a list of companies', async () => {
      const companies = [
        {
          id: '1',
          name: 'Empresa A',
          country: 'Brasil',
          createdAt: new Date(),
        },
        {
          id: '2',
          name: 'Empresa B',
          country: 'Argentina',
          createdAt: new Date(),
        },
      ];

      sinon.stub(CompanyRepository, 'findAll').resolves(companies);

      const result = await CompanyService.getAllCompanies(1, 10);
      expect(result).to.deep.equal(companies);
    });

    it('should call repository with correct pagination parameters', async () => {
      // Arrange
      const page = 2;
      const limit = 5;
      const expectedOffset = (page - 1) * limit; // 5
      
      const findAllStub = sinon.stub(CompanyRepository, 'findAll').resolves([]);
      
      // Act
      await CompanyService.getAllCompanies(page, limit);
      
      // Assert
      expect(findAllStub.calledOnceWith(expectedOffset, limit)).to.be.true;
    });
    
    it('should throw ValidationError when page is less than 1', async () => {
      // Act & Assert
      try {
        await CompanyService.getAllCompanies(0, 10);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Page must be greater than 0');
      }
    });
    
    it('should throw ValidationError when limit is less than 1', async () => {
      // Act & Assert
      try {
        await CompanyService.getAllCompanies(1, 0);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Limit must be greater than 0');
      }
    });
  });

  describe('updateCompany', () => {
    it('should update and return the company when valid data is provided', async () => {
      const companyId = '1';
      const existingCompany = {
        id: companyId,
        name: 'Empresa Antiga',
        country: 'Brasil',
        createdAt: new Date(),
      };
      const updateData = { name: 'Empresa Atualizada' };
      const updatedCompany = { ...existingCompany, ...updateData };

      sinon
        .stub(CompanyRepository, 'findById')
        .withArgs(companyId)
        .resolves(existingCompany);
      sinon
        .stub(CompanyRepository, 'update')
        .withArgs(companyId, sinon.match.any)
        .resolves(updatedCompany);

      const result = await CompanyService.updateCompany(companyId, updateData);
      expect(result).to.deep.equal(updatedCompany);
    });

    it('should throw a ValidationError if the id is missing', async () => {
      try {
        await CompanyService.updateCompany('', { name: 'Teste' });
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Company ID is required');
      }
    });

    it('should throw a NotFoundError if the company is not found', async () => {
      const companyId = '1';
      sinon
        .stub(CompanyRepository, 'findById')
        .withArgs(companyId)
        .resolves(null);

      try {
        await CompanyService.updateCompany(companyId, { name: 'Teste' });
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
        expect((error as Error).message).to.equal('Company not found');
      }
    });

    it('should throw a ZodError if the update data is invalid', async () => {
      const companyId = '1';
      const existingCompany = {
        id: companyId,
        name: 'Empresa Antiga',
        country: 'Brasil',
        createdAt: new Date(),
      };

      sinon
        .stub(CompanyRepository, 'findById')
        .withArgs(companyId)
        .resolves(existingCompany);

      try {
        await CompanyService.updateCompany(companyId, { name: '' });
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.have.property('errors');
      }
    });
  });

  describe('deleteCompany', () => {
    it('should delete the company when a valid id is provided', async () => {
      const companyId = '1';
      const company = {
        id: companyId,
        name: 'Empresa Teste',
        country: 'Brasil',
        createdAt: new Date(),
      };

      sinon
        .stub(CompanyRepository, 'findById')
        .withArgs(companyId)
        .resolves(company);
      const deleteStub = sinon
        .stub(CompanyRepository, 'delete')
        .withArgs(companyId)
        .resolves();

      await CompanyService.deleteCompany(companyId);
      expect(deleteStub.calledOnce).to.be.true;
    });

    it('should throw a ValidationError if the id is missing', async () => {
      try {
        await CompanyService.deleteCompany('');
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Company ID is required');
      }
    });

    it('should throw a NotFoundError if the company is not found', async () => {
      const companyId = '1';
      sinon
        .stub(CompanyRepository, 'findById')
        .withArgs(companyId)
        .resolves(null);

      try {
        await CompanyService.deleteCompany(companyId);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
        expect((error as Error).message).to.equal('Company not found');
      }
    });
  });
});
