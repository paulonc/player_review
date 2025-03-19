/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import CategoryService from '../../src/services/CategoryService';
import CategoryRepository from '../../src/repositories/CategoryRepository';
import { NotFoundError, ValidationError } from '../../src/errors/AppError';
import { ZodError } from 'zod';
import { describe, it, afterEach } from 'mocha';
import { Category } from '../../src/models/Category';

describe('CategoryService', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('createCategory', () => {
    it('should create a category when valid data is provided', async () => {
      const categoryData = { name: 'Categoria Teste' };
      const createdCategory = { id: '1', ...categoryData, createdAt: new Date() };
      sinon.stub(CategoryRepository, 'create').resolves(createdCategory);

      const result = await CategoryService.createCategory(categoryData);
      expect(result).to.deep.equal(createdCategory);
    });

    it('should throw a ZodError if the category name is missing', async () => {
      const invalidData = {} as Category;
      try {
        await CategoryService.createCategory(invalidData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('getCategoryById', () => {
    it('should return the category when a valid id is provided', async () => {
      const categoryId = '1';
      const category = {
        id: categoryId,
        name: 'Categoria Teste',
        createdAt: new Date(),
      };

      sinon
        .stub(CategoryRepository, 'findById')
        .withArgs(categoryId)
        .resolves(category);

      const result = await CategoryService.getCategoryById(categoryId);
      expect(result).to.deep.equal(category);
    });

    it('should throw a ValidationError if the id is empty', async () => {
      try {
        await CategoryService.getCategoryById('');
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Category ID is required');
      }
    });

    it('should throw a NotFoundError if the category is not found', async () => {
      const categoryId = '1';
      sinon
        .stub(CategoryRepository, 'findById')
        .withArgs(categoryId)
        .resolves(null);

      try {
        await CategoryService.getCategoryById(categoryId);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
        expect((error as Error).message).to.equal('Category not found');
      }
    });
  });

  describe('getAllCategories', () => {
    it('should return a list of categories', async () => {
      const categories = [
        {
          id: '1',
          name: 'Categoria A',
          createdAt: new Date(),
        },
        {
          id: '2',
          name: 'Categoria B',
          createdAt: new Date(),
        },
      ];

      sinon.stub(CategoryRepository, 'findAll').resolves(categories);

      const result = await CategoryService.getAllCategories(1, 10);
      expect(result).to.deep.equal(categories);
    });

    it('should call repository with correct pagination parameters', async () => {
      // Arrange
      const page = 2;
      const limit = 5;
      const expectedOffset = (page - 1) * limit; // 5
      
      const findAllStub = sinon.stub(CategoryRepository, 'findAll').resolves([]);
      
      // Act
      await CategoryService.getAllCategories(page, limit);
      
      // Assert
      expect(findAllStub.calledOnceWith(expectedOffset, limit)).to.be.true;
    });
    
    it('should throw ValidationError when page is less than 1', async () => {
      // Act & Assert
      try {
        await CategoryService.getAllCategories(0, 10);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Page must be greater than 0');
      }
    });
    
    it('should throw ValidationError when limit is less than 1', async () => {
      // Act & Assert
      try {
        await CategoryService.getAllCategories(1, 0);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Limit must be greater than 0');
      }
    });
  });

  describe('updateCategory', () => {
    it('should update and return the category when valid data is provided', async () => {
      const categoryId = '1';
      const existingCategory = {
        id: categoryId,
        name: 'Categoria Antiga',
        createdAt: new Date(),
      };
      const updateData = { name: 'Categoria Atualizada' };
      const updatedCategory = { ...existingCategory, ...updateData };

      sinon
        .stub(CategoryRepository, 'findById')
        .withArgs(categoryId)
        .resolves(existingCategory);
      sinon
        .stub(CategoryRepository, 'update')
        .withArgs(categoryId, sinon.match.any)
        .resolves(updatedCategory);

      const result = await CategoryService.updateCategory(categoryId, updateData);
      expect(result).to.deep.equal(updatedCategory);
    });

    it('should throw a ValidationError if the id is missing', async () => {
      try {
        await CategoryService.updateCategory('', { name: 'Teste' });
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Category ID is required');
      }
    });

    it('should throw a NotFoundError if the category is not found', async () => {
      const categoryId = '1';
      sinon
        .stub(CategoryRepository, 'findById')
        .withArgs(categoryId)
        .resolves(null);

      try {
        await CategoryService.updateCategory(categoryId, { name: 'Teste' });
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
        expect((error as Error).message).to.equal('Category not found');
      }
    });

    it('should throw a ZodError if the update data is invalid', async () => {
      const categoryId = '1';
      const existingCategory = {
        id: categoryId,
        name: 'Categoria Antiga',
        createdAt: new Date(),
      };

      sinon
        .stub(CategoryRepository, 'findById')
        .withArgs(categoryId)
        .resolves(existingCategory);

      try {
        await CategoryService.updateCategory(categoryId, { name: '' });
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.have.property('errors');
      }
    });
  });

  describe('deleteCategory', () => {
    it('should delete the category when a valid id is provided', async () => {
      const categoryId = '1';
      const category = {
        id: categoryId,
        name: 'Categoria Teste',
        createdAt: new Date(),
      };

      sinon
        .stub(CategoryRepository, 'findById')
        .withArgs(categoryId)
        .resolves(category);
      const deleteStub = sinon
        .stub(CategoryRepository, 'delete')
        .withArgs(categoryId)
        .resolves();

      await CategoryService.deleteCategory(categoryId);
      expect(deleteStub.calledOnce).to.be.true;
    });

    it('should throw a ValidationError if the id is missing', async () => {
      try {
        await CategoryService.deleteCategory('');
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Category ID is required');
      }
    });

    it('should throw a NotFoundError if the category is not found', async () => {
      const categoryId = '1';
      sinon
        .stub(CategoryRepository, 'findById')
        .withArgs(categoryId)
        .resolves(null);

      try {
        await CategoryService.deleteCategory(categoryId);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
        expect((error as Error).message).to.equal('Category not found');
      }
    });
  });

  describe('getTopRatedCategories', () => {
    it('should return a list of top-rated categories', async () => {
      const categories = [
        {
          category: {
            id: '1',
            name: 'Categoria A',
            createdAt: new Date(),
          },
          avgRating: 4.5,
        },
        {
          category: {
            id: '2',
            name: 'Categoria B',
            createdAt: new Date(),
          },
          avgRating: 4.0,
        },
      ];

      sinon.stub(CategoryRepository, 'getTopRatedCategories').resolves(categories);

      const result = await CategoryService.getTopRatedCategories(2);
      expect(result).to.deep.equal(categories);
    });
  });
});
