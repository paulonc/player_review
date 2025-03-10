/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import GameController from '../../src/controllers/GameController';
import GameService from '../../src/services/GameService';
import { Game } from '../../src/models/Game';

describe('GameController', () => {
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
    it('should create a game and return 201 status', async () => {
      // Arrange
      const gameData = {
        title: 'Test Game',
        description: 'A test game description',
        companyId: uuidv4(),
        releaseDate: new Date(),
      };

      const createdGame: Game = {
        id: uuidv4(),
        ...gameData,
        createdAt: new Date(),
      };

      req.body = gameData;
      const createStub = sandbox
        .stub(GameService, 'createGame')
        .resolves(createdGame);

      // Act
      await GameController.create(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(createStub.calledOnceWith(gameData)).to.be.true;
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(createdGame)).to.be.true;
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.body = { title: 'Test Game' };
      sandbox.stub(GameService, 'createGame').rejects(error);

      // Act
      await GameController.create(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('getGame', () => {
    it('should return a game and 200 status', async () => {
      // Arrange
      const gameId = uuidv4();
      const game = {
        id: gameId,
        title: 'Test Game',
        description: 'A test game description',
        companyId: uuidv4(),
        releaseDate: new Date(),
        createdAt: new Date(),
      };

      req.params = { id: gameId };
      const getGameByIdStub = sandbox
        .stub(GameService, 'getGameById')
        .resolves(game);

      // Act
      await GameController.getGame(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(getGameByIdStub.calledOnceWith(gameId)).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(game);
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      sandbox.stub(GameService, 'getGameById').rejects(error);

      // Act
      await GameController.getGame(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('getAllGames', () => {
    it('should return all games and 200 status', async () => {
      // Arrange
      const games = [
        {
          id: uuidv4(),
          title: 'Game 1',
          description: 'Description for Game 1',
          companyId: uuidv4(),
          releaseDate: new Date(),
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          title: 'Game 2',
          description: 'Description for Game 2',
          companyId: uuidv4(),
          releaseDate: new Date(),
          createdAt: new Date(),
        },
      ];

      const getAllGamesStub = sandbox
        .stub(GameService, 'getAllGames')
        .resolves(games);

      // Act
      await GameController.getAllGames(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(getAllGamesStub.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(games);
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      sandbox.stub(GameService, 'getAllGames').rejects(error);

      // Act
      await GameController.getAllGames(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('update', () => {
    it('should update a game and return 200 status', async () => {
      // Arrange
      const gameId = uuidv4();
      const updateData = {
        title: 'Updated Game Title',
        description: 'Updated game description',
      };

      const updatedGame = {
        id: gameId,
        title: 'Updated Game Title',
        description: 'Updated game description',
        companyId: uuidv4(),
        releaseDate: new Date(),
        createdAt: new Date(),
      };

      req.params = { id: gameId };
      req.body = updateData;
      const updateGameStub = sandbox
        .stub(GameService, 'updateGame')
        .resolves(updatedGame);

      // Act
      await GameController.update(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(updateGameStub.calledOnceWith(gameId, updateData)).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedGame);
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      req.body = { title: 'Updated Game Title' };
      sandbox.stub(GameService, 'updateGame').rejects(error);

      // Act
      await GameController.update(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('delete', () => {
    it('should delete a game and return 204 status', async () => {
      // Arrange
      const gameId = uuidv4();
      req.params = { id: gameId };
      const deleteGameStub = sandbox.stub(GameService, 'deleteGame').resolves();

      // Act
      await GameController.delete(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(deleteGameStub.calledOnceWith(gameId)).to.be.true;
      expect(res.status).to.have.been.calledWith(204);
      expect(res.send).to.have.been.called;
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      sandbox.stub(GameService, 'deleteGame').rejects(error);

      // Act
      await GameController.delete(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('updateReleaseDate', () => {
    it('should update release date and return 200 status', async () => {
      // Arrange
      const gameId = uuidv4();
      const releaseDate = new Date('2023-12-25');

      const updatedGame = {
        id: gameId,
        title: 'Test Game',
        description: 'A test game description',
        companyId: uuidv4(),
        releaseDate: releaseDate,
        createdAt: new Date(),
      };

      req.params = { id: gameId };
      req.body = { releaseDate: releaseDate.toISOString() };
      const updateReleaseDateStub = sandbox
        .stub(GameService, 'updateReleaseDate')
        .resolves(updatedGame);

      // Act
      await GameController.updateReleaseDate(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(updateReleaseDateStub.calledOnce).to.be.true;
      expect(updateReleaseDateStub.firstCall.args[0]).to.equal(gameId);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedGame);
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      req.body = { releaseDate: new Date().toISOString() };
      sandbox.stub(GameService, 'updateReleaseDate').rejects(error);

      // Act
      await GameController.updateReleaseDate(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });
});
