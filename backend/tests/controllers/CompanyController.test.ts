/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CompanyController from '../../src/controllers/CompanyController';
import CompanyService from '../../src/services/CompanyService';
import { Company } from '../../src/models/Company';

describe('CompanyController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: sinon.SinonSpy;
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    req = {};
    res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub().returnsThis(),
      send: sandbox.stub().returnsThis(),
    };
    next = sandbox.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('create', () => {
    it('should create a company and return 201 status', async () => {
      // Arrange
      const companyData = {
        name: 'Test Company',
        country: 'USA',
      };

      const createdCompany: Company = {
        id: uuidv4(),
        ...companyData,
        createdAt: new Date(),
      };

      req.body = companyData;
      const createCompanyStub = sandbox
        .stub(CompanyService, 'createCompany')
        .resolves(createdCompany);

      // Act
      await CompanyController.create(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(createCompanyStub.calledOnceWith(companyData)).to.be.true;
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(createdCompany)).to.be
        .true;
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.body = {
        name: 'Test Company',
        country: 'USA',
      };
      sandbox.stub(CompanyService, 'createCompany').rejects(error);

      // Act
      await CompanyController.create(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('getCompany', () => {
    it('should return a company and 200 status', async () => {
      // Arrange
      const companyId = uuidv4();
      const company: Company = {
        id: companyId,
        name: 'Test Company',
        country: 'USA',
        createdAt: new Date(),
      };

      req.params = { id: companyId };
      const getCompanyByIdStub = sandbox
        .stub(CompanyService, 'getCompanyById')
        .resolves(company);

      // Act
      await CompanyController.getCompany(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(getCompanyByIdStub.calledOnceWith(companyId)).to.be.true;
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(company)).to.be.true;
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      sandbox.stub(CompanyService, 'getCompanyById').rejects(error);

      // Act
      await CompanyController.getCompany(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('getAllCompanies', () => {
    it('should return all companies and 200 status', async () => {
      // Arrange
      const companies: Company[] = [
        {
          id: uuidv4(),
          name: 'Company 1',
          country: 'USA',
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'Company 2',
          country: 'Canada',
          createdAt: new Date(),
        },
      ];

      const getAllCompanieStub = sandbox
        .stub(CompanyService, 'getAllCompanies')
        .resolves(companies);

      // Act
      await CompanyController.getAllCompanies(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(getAllCompanieStub.calledOnce).to.be.true;
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(companies)).to.be.true;
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      sandbox.stub(CompanyService, 'getAllCompanies').rejects(error);

      // Act
      await CompanyController.getAllCompanies(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('update', () => {
    it('should update a company and return 200 status', async () => {
      // Arrange
      const companyId = uuidv4();
      const updateData = {
        name: 'Updated Company Name',
        country: 'Canada',
      };

      const updatedCompany: Company = {
        id: companyId,
        name: 'Updated Company Name',
        country: 'Canada',
        createdAt: new Date(),
      };

      req.params = { id: companyId };
      req.body = updateData;
      const updateCompanyStub = sandbox
        .stub(CompanyService, 'updateCompany')
        .resolves(updatedCompany);

      // Act
      await CompanyController.update(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(updateCompanyStub.calledOnceWith(companyId, updateData)).to.be
        .true;
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(updatedCompany)).to.be
        .true;
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      req.body = { name: 'Updated Company Name' };
      sandbox.stub(CompanyService, 'updateCompany').rejects(error);

      // Act
      await CompanyController.update(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('updateCompanyName', () => {
    it('should update company name and return 200 status', async () => {
      // Arrange
      const companyId = uuidv4();
      const nameData = { name: 'New Company Name' };

      const updatedCompany: Company = {
        id: companyId,
        name: 'New Company Name',
        country: 'USA',
        createdAt: new Date(),
      };

      req.params = { id: companyId };
      req.body = nameData;
      const updateCompanyStub = sandbox
        .stub(CompanyService, 'updateCompany')
        .resolves(updatedCompany);

      // Act
      await CompanyController.updateCompanyName(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(updateCompanyStub.calledOnce).to.be.true;
      expect(updateCompanyStub.firstCall.args[0]).to.equal(companyId);
      expect(updateCompanyStub.firstCall.args[1]).to.equal(nameData.name);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(updatedCompany)).to.be
        .true;
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      req.body = { name: 'New Company Name' };
      sandbox.stub(CompanyService, 'updateCompany').rejects(error);

      // Act
      await CompanyController.updateCompanyName(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('delete', () => {
    it('should delete a company and return 204 status', async () => {
      // Arrange
      const companyId = uuidv4();
      req.params = { id: companyId };
      const deleteCompanyStub = sandbox
        .stub(CompanyService, 'deleteCompany')
        .resolves();

      // Act
      await CompanyController.delete(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(deleteCompanyStub.calledOnceWith(companyId)).to.be.true;
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.send as sinon.SinonStub).called).to.be.true;
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      sandbox.stub(CompanyService, 'deleteCompany').rejects(error);

      // Act
      await CompanyController.delete(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });
});
