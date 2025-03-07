import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import ReviewController from '../../src/controllers/ReviewController';
import ReviewService from '../../src/services/ReviewService';
import { Review } from '../../src/models/Review';

describe('ReviewController', () => {
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
      send: sandbox.stub().returnsThis()
    };
    next = sandbox.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('createReview', () => {
    it('should create a review and return 201 status', async () => {
      // Arrange
      const reviewData = {
        userId: uuidv4(),
        gameId: uuidv4(),
        rating: 4,
        review: 'Great game!'
      };
      
      const createdReview: Review = {
        id: uuidv4(),
        ...reviewData,
        createdAt: new Date()
      };
      
      req.body = reviewData;
      const createStub = sandbox.stub(ReviewService, 'create').resolves(createdReview);
      
      // Act
      await ReviewController.createReview(req as Request, res as Response, next as unknown as NextFunction);
      
      // Assert
      expect(createStub.calledOnceWith(reviewData)).to.be.true;
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(createdReview)).to.be.true;
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.body = { userId: uuidv4(), gameId: uuidv4(), rating: 5 };
      sandbox.stub(ReviewService, 'create').rejects(error);
      
      // Act
      await ReviewController.createReview(req as Request, res as Response, next as NextFunction);
      
      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('getReview', () => {
    it('should return a review and 200 status', async () => {
      // Arrange
      const reviewId = uuidv4();
      const review = {
        id: reviewId,
        userId: uuidv4(),
        gameId: uuidv4(),
        rating: 5,
        review: 'Amazing gameplay and graphics!',
        createdAt: new Date()
      };
      
      req.params = { id: reviewId };
      const getReviewByIdStub = sandbox.stub(ReviewService, 'getReviewById').resolves(review);
      
      // Act
      await ReviewController.getReview(req as Request, res as Response, next as NextFunction);
      
      // Assert
      expect(getReviewByIdStub.calledOnceWith(reviewId)).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(review);
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      sandbox.stub(ReviewService, 'getReviewById').rejects(error);
      
      // Act
      await ReviewController.getReview(req as Request, res as Response, next as NextFunction);
      
      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('getAllReviews', () => {
    it('should return all reviews and 200 status', async () => {
      // Arrange
      const reviews = [
        {
          id: uuidv4(),
          userId: uuidv4(),
          gameId: uuidv4(),
          rating: 5,
          review: 'Excellent game!',
          createdAt: new Date()
        },
        {
          id: uuidv4(),
          userId: uuidv4(),
          gameId: uuidv4(),
          rating: 3,
          review: 'Good but not great',
          createdAt: new Date()
        }
      ];
      
      const getAllReviewsStub = sandbox.stub(ReviewService, 'getAllReviews').resolves(reviews);
      
      // Act
      await ReviewController.getAllReviews(req as Request, res as Response, next as NextFunction);
      
      // Assert
      expect(getAllReviewsStub.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(reviews);
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      sandbox.stub(ReviewService, 'getAllReviews').rejects(error);
      
      // Act
      await ReviewController.getAllReviews(req as Request, res as Response, next as NextFunction);
      
      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('updateReview', () => {
    it('should update a review and return 200 status', async () => {
      // Arrange
      const reviewId = uuidv4();
      const updateData = {
        rating: 4,
        review: 'Updated review content'
      };
      
      const updatedReview = {
        id: reviewId,
        userId: uuidv4(),
        gameId: uuidv4(),
        rating: 4,
        review: 'Updated review content',
        createdAt: new Date()
      };
      
      req.params = { id: reviewId };
      req.body = updateData;
      const updateStub = sandbox.stub(ReviewService, 'update').resolves(updatedReview);
      
      // Act
      await ReviewController.updateReview(req as Request, res as Response, next as NextFunction);
      
      // Assert
      expect(updateStub.calledOnceWith(reviewId, updateData)).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedReview);
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      req.body = { rating: 3 };
      sandbox.stub(ReviewService, 'update').rejects(error);
      
      // Act
      await ReviewController.updateReview(req as Request, res as Response, next as NextFunction);
      
      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('patchReview', () => {
    it('should patch a review and return 200 status', async () => {
      // Arrange
      const reviewId = uuidv4();
      const patchData = {
        rating: 3
      };
      
      const updatedReview = {
        id: reviewId,
        userId: uuidv4(),
        gameId: uuidv4(),
        rating: 3,
        review: 'Original content',
        createdAt: new Date()
      };
      
      req.params = { id: reviewId };
      req.body = patchData;
      const updateStub = sandbox.stub(ReviewService, 'update').resolves(updatedReview);
      
      // Act
      await ReviewController.patchReview(req as Request, res as Response, next as NextFunction);
      
      // Assert
      expect(updateStub.calledOnceWith(reviewId, patchData)).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedReview);
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      req.body = { review: 'New Review' };
      sandbox.stub(ReviewService, 'update').rejects(error);
      
      // Act
      await ReviewController.patchReview(req as Request, res as Response, next as NextFunction);
      
      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('deleteReview', () => {
    it('should delete a review and return 204 status', async () => {
      // Arrange
      const reviewId = uuidv4();
      req.params = { id: reviewId };
      const deleteStub = sandbox.stub(ReviewService, 'delete').resolves();
      
      // Act
      await ReviewController.deleteReview(req as Request, res as Response, next as NextFunction);
      
      // Assert
      expect(deleteStub.calledOnceWith(reviewId)).to.be.true;
      expect(res.status).to.have.been.calledWith(204);
      expect(res.send).to.have.been.called;
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      sandbox.stub(ReviewService, 'delete').rejects(error);
      
      // Act
      await ReviewController.deleteReview(req as Request, res as Response, next as NextFunction);
      
      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });
}); 