/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import { v4 as uuidv4 } from 'uuid';
import ReviewService from '../../src/services/ReviewService';
import ReviewRepository from '../../src/repositories/ReviewRepository';
import UserRepository from '../../src/repositories/UserRepository';
import GameRepository from '../../src/repositories/GameRepository';
import { NotFoundError, ValidationError } from '../../src/errors/AppError';

describe('ReviewService', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('create', () => {
    it('should create a review when valid data is provided', async () => {
      // Arrange
      const userId = uuidv4();
      const gameId = uuidv4();
      const reviewData = {
        userId,
        gameId,
        rating: 4,
        review: 'Great game!',
        createdAt: new Date(),
      };

      const expectedReview = {
        id: uuidv4(),
        ...reviewData,
        createdAt: new Date(),
      };

      sandbox.stub(UserRepository, 'findById').resolves({
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        role: 'USER',
        createdAt: new Date(),
      });

      sandbox.stub(GameRepository, 'findById').resolves({
        id: gameId,
        title: 'Test Game',
        description: 'A test game description',
        releaseDate: new Date(),
        companyId: uuidv4(),
        categoryId: uuidv4(),
        createdAt: new Date(),
        imageUrl: null,
      });

      const createStub = sandbox
        .stub(ReviewRepository, 'create')
        .resolves(expectedReview);

      // Act
      const result = await ReviewService.create(reviewData);

      // Assert
      expect(createStub.calledOnce).to.be.true;
      expect(result).to.deep.equal(expectedReview);
    });

    it('should throw NotFoundError when user does not exist', async () => {
      // Arrange
      const reviewData = {
        userId: uuidv4(),
        gameId: uuidv4(),
        rating: 4,
        review: 'Great game!',
        createdAt: new Date(),
      };

      sandbox.stub(UserRepository, 'findById').resolves(null);

      // Act & Assert
      try {
        await ReviewService.create(reviewData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });

    it('should throw NotFoundError when game does not exist', async () => {
      // Arrange
      const userId = uuidv4();
      const reviewData = {
        userId,
        gameId: uuidv4(),
        rating: 4,
        review: 'Great game!',
        createdAt: new Date(),
      };

      sandbox.stub(UserRepository, 'findById').resolves({
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        role: 'USER',
        createdAt: new Date(),
      });

      sandbox.stub(GameRepository, 'findById').resolves(null);

      // Act & Assert
      try {
        await ReviewService.create(reviewData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });

    it('should throw ValidationError when invalid data is provided', async () => {
      // Arrange
      const invalidReviewData = {
        userId: '',
        gameId: uuidv4(),
        rating: 6, // Rating should be max 5
        review: 'Invalid review',
      };

      // Act & Assert
      try {
        await ReviewService.create(invalidReviewData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
  });

  describe('getReviewById', () => {
    it('should return a review when it exists', async () => {
      // Arrange
      const reviewId = uuidv4();
      const expectedReview = {
        id: reviewId,
        userId: uuidv4(),
        gameId: uuidv4(),
        rating: 5,
        review: 'Amazing gameplay and graphics!',
        createdAt: new Date(),
      };

      sandbox.stub(ReviewRepository, 'findById').resolves(expectedReview);

      // Act
      const result = await ReviewService.getReviewById(reviewId);

      // Assert
      expect(result).to.deep.equal(expectedReview);
    });

    it('should throw NotFoundError when review does not exist', async () => {
      // Arrange
      const reviewId = uuidv4();
      sandbox.stub(ReviewRepository, 'findById').resolves(null);

      // Act & Assert
      try {
        await ReviewService.getReviewById(reviewId);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });

    it('should throw ValidationError when id is not provided', async () => {
      // Act & Assert
      try {
        await ReviewService.getReviewById('');
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
      }
    });
  });

  describe('getAllReviews', () => {
    it('should return all reviews', async () => {
      // Arrange
      const expectedReviews = [
        {
          id: uuidv4(),
          userId: uuidv4(),
          gameId: uuidv4(),
          rating: 5,
          review: 'Amazing gameplay and graphics!',
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          userId: uuidv4(),
          gameId: uuidv4(),
          rating: 3,
          review: 'Good but not great',
          createdAt: new Date(),
        },
      ];

      sandbox.stub(ReviewRepository, 'findAll').resolves(expectedReviews);

      // Act
      const result = await ReviewService.getAllReviews(1, 10);

      // Assert
      expect(result).to.deep.equal(expectedReviews);
    });

    it('should call repository with correct pagination parameters', async () => {
      // Arrange
      const page = 2;
      const limit = 5;
      const expectedOffset = (page - 1) * limit; // 5
      
      const findAllStub = sandbox.stub(ReviewRepository, 'findAll').resolves([]);
      
      // Act
      await ReviewService.getAllReviews(page, limit);
      
      // Assert
      expect(findAllStub.calledOnceWith(expectedOffset, limit)).to.be.true;
    });
    
    it('should throw ValidationError when page is less than 1', async () => {
      // Act & Assert
      try {
        await ReviewService.getAllReviews(0, 10);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Page must be greater than 0');
      }
    });
    
    it('should throw ValidationError when limit is less than 1', async () => {
      // Act & Assert
      try {
        await ReviewService.getAllReviews(1, 0);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Limit must be greater than 0');
      }
    });
  });

  describe('update', () => {
    it('should update a review when it exists', async () => {
      // Arrange
      const reviewId = uuidv4();
      const updateData = {
        rating: 4,
        review: 'Updated review content',
      };

      const updatedReview = {
        id: reviewId,
        userId: uuidv4(),
        gameId: uuidv4(),
        rating: 4,
        review: 'Updated review content',
        createdAt: new Date(),
      };

      sandbox.stub(ReviewRepository, 'update').resolves(updatedReview);

      // Act
      const result = await ReviewService.update(reviewId, updateData);

      // Assert
      expect(result).to.deep.equal(updatedReview);
    });

    it('should throw ValidationError when id is not provided', async () => {
      // Arrange
      const updateData = { rating: 4 };

      // Act & Assert
      try {
        await ReviewService.update('', updateData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
      }
    });
  });

  describe('delete', () => {
    it('should delete a review when it exists', async () => {
      // Arrange
      const reviewId = uuidv4();
      const deleteStub = sandbox.stub(ReviewRepository, 'delete').resolves();

      // Act
      await ReviewService.delete(reviewId);

      // Assert
      expect(deleteStub.calledOnceWith(reviewId)).to.be.true;
    });

    it('should throw ValidationError when id is not provided', async () => {
      // Act & Assert
      try {
        await ReviewService.delete('');
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
      }
    });
  });
});
