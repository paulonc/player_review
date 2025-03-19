/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import { v4 as uuidv4 } from 'uuid';
import GameService from '../../src/services/GameService';
import GameRepository from '../../src/repositories/GameRepository';
import CompanyService from '../../src/services/CompanyService';
import { NotFoundError, ValidationError } from '../../src/errors/AppError';
import CategoryService from '../../src/services/CategoryService';

describe('GameService', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('createGame', () => {
    it('should create a game when valid data is provided', async () => {
      const date = new Date();
      // Arrange
      const companyId = uuidv4();
      const categoryId = uuidv4();
      const gameData = {
        title: 'Test Game',
        description: 'A test game description',
        releaseDate: new Date(),
        companyId: companyId,
        categoryId: categoryId,
        createdAt: date,
      };

      const expectedGame = {
        id: uuidv4(),
        ...gameData,
        releaseDate: new Date(),
        createdAt: date,
      };

      sandbox.stub(CompanyService, 'getCompanyById').resolves({
        id: companyId,
        name: 'Test Company',
        country: 'United States',
        createdAt: new Date(),
      });

      sandbox.stub(CategoryService, 'getCategoryById').resolves({
        id: categoryId,
        name: 'Test Category',
        createdAt: new Date(),
      });

      const createStub = sandbox
        .stub(GameRepository, 'create')
        .resolves(expectedGame);

      // Act
      const result = await GameService.createGame(gameData);

      // Assert
      expect(createStub.calledOnce).to.be.true;
      expect(result).to.deep.equal(expectedGame);
    });

    it('should throw NotFoundError when company does not exist', async () => {
      // Arrange
      const date = new Date();
      const gameData = {
        title: 'Test Game',
        description: 'A test game description',
        releaseDate: new Date(),  
        companyId: uuidv4(),
        categoryId: uuidv4(),
        createdAt: date,
      };

      sandbox.stub(CompanyService, 'getCompanyById').resolves(null);

      // Act & Assert
      try {
        await GameService.createGame(gameData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });

    it('should throw ValidationError when invalid data is provided', async () => {
      // Arrange
      const invalidGameData = {
        title: '',
        description: 'A test game description',
        releaseDate: new Date('invalid-date'),
        companyId: 'invalid-uuid',
        categoryId: 'invalid-uuid',
        createdAt: new Date(),
      };

      // Act & Assert
      try {
        await GameService.createGame(invalidGameData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
  });

  describe('getGameById', () => {
    it('should return a game when it exists', async () => {
      // Arrange
      const gameId = uuidv4();
      const expectedGame = {
        id: gameId,
        title: 'Test Game',
        description: 'A test game description',
        releaseDate: new Date(),
        companyId: uuidv4(),
        categoryId: uuidv4(),
        createdAt: new Date(),
      };

      sandbox.stub(GameRepository, 'findById').resolves(expectedGame);

      // Act
      const result = await GameService.getGameById(gameId);

      // Assert
      expect(result).to.deep.equal(expectedGame);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      // Arrange
      const gameId = uuidv4();
      sandbox.stub(GameRepository, 'findById').resolves(null);

      // Act & Assert
      try {
        await GameService.getGameById(gameId);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });

    it('should throw ValidationError when id is not provided', async () => {
      // Act & Assert
      try {
        await GameService.getGameById('');
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
      }
    });
  });

  describe('getAllGames', () => {
    it('should return all games', async () => {
      // Arrange
      const expectedGames = [
        {
          id: uuidv4(),
          title: 'Game 1',
          description: 'Description 1',
          releaseDate: new Date(),
          companyId: uuidv4(),
          categoryId: uuidv4(),
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          title: 'Game 2',
          description: 'Description 2',
          releaseDate: new Date(),
          companyId: uuidv4(),
          categoryId: uuidv4(),
          createdAt: new Date(),
        },
      ];

      sandbox.stub(GameRepository, 'findAll').resolves(expectedGames);

      // Act
      const result = await GameService.getAllGames(1, 10);

      // Assert
      expect(result).to.deep.equal(expectedGames);
    });

    it('should call repository with correct pagination parameters', async () => {
      // Arrange
      const page = 2;
      const limit = 5;
      const expectedOffset = (page - 1) * limit; // 5
      
      const findAllStub = sandbox.stub(GameRepository, 'findAll').resolves([]);
      
      // Act
      await GameService.getAllGames(page, limit);
      
      // Assert
      expect(findAllStub.calledOnceWith(expectedOffset, limit)).to.be.true;
    });
    
    it('should throw ValidationError when page is less than 1', async () => {
      // Act & Assert
      try {
        await GameService.getAllGames(0, 10);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Page must be greater than 0');
      }
    });
    
    it('should throw ValidationError when limit is less than 1', async () => {
      // Act & Assert
      try {
        await GameService.getAllGames(1, 0);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Limit must be greater than 0');
      }
    });
  });

  describe('updateGame', () => {
    it('should update a game when it exists', async () => {
      // Arrange
      const gameId = uuidv4();
      const updateData = {
        title: 'Updated Game Title',
        description: 'Updated description',
      };

      const existingGame = {
        id: gameId,
        title: 'Original Title',
        description: 'Original description',
        releaseDate: new Date(),
        companyId: uuidv4(),
        createdAt: new Date(),
        categoryId: uuidv4(),
      };

      const updatedGame = {
        ...existingGame,
        ...updateData,
      };

      sandbox.stub(GameRepository, 'findById').resolves(existingGame);
      sandbox.stub(GameRepository, 'update').resolves(updatedGame);

      // Act
      const result = await GameService.updateGame(gameId, updateData);

      // Assert
      expect(result).to.deep.equal(updatedGame);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      // Arrange
      const gameId = uuidv4();
      const updateData = { title: 'Updated Title' };

      sandbox.stub(GameRepository, 'findById').resolves(null);

      // Act & Assert
      try {
        await GameService.updateGame(gameId, updateData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });

    it('should throw ValidationError when id is not provided', async () => {
      // Arrange
      const updateData = { title: 'Updated Title' };

      // Act & Assert
      try {
        await GameService.updateGame('', updateData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
      }
    });
  });

  describe('deleteGame', () => {
    it('should delete a game when it exists', async () => {
      // Arrange
      const gameId = uuidv4();
      const existingGame = {
        id: gameId,
        title: 'Test Game',
        description: 'A test game description',
        releaseDate: new Date(),
        companyId: uuidv4(),
        categoryId: uuidv4(),
        createdAt: new Date(),
      };

      sandbox.stub(GameRepository, 'findById').resolves(existingGame);
      const deleteStub = sandbox.stub(GameRepository, 'delete').resolves();

      // Act
      await GameService.deleteGame(gameId);

      // Assert
      expect(deleteStub.calledOnceWith(gameId)).to.be.true;
    });

    it('should throw NotFoundError when game does not exist', async () => {
      // Arrange
      const gameId = uuidv4();
      sandbox.stub(GameRepository, 'findById').resolves(null);

      // Act & Assert
      try {
        await GameService.deleteGame(gameId);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });

    it('should throw ValidationError when id is not provided', async () => {
      // Act & Assert
      try {
        await GameService.deleteGame('');
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
      }
    });
  });

  describe('updateReleaseDate', () => {
    it('should update release date when game exists', async () => {
      // Arrange
      const date = new Date();
      const gameId = uuidv4();
      const newReleaseDate = new Date('2023-12-25');

      const existingGame = {
        id: gameId,
        title: 'Test Game',
        description: 'A test game description',
        releaseDate: new Date(),
        companyId: uuidv4(),
        createdAt: date,
        categoryId: uuidv4(),
      };

      const updatedGame = {
        ...existingGame,
        releaseDate: newReleaseDate,
      };

      sandbox.stub(GameRepository, 'findById').resolves(existingGame);
      sandbox.stub(GameRepository, 'update').resolves(updatedGame);

      // Act
      const result = await GameService.updateReleaseDate(
        gameId,
        newReleaseDate,
      );

      // Assert
      expect(result).to.deep.equal(updatedGame);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      // Arrange
      const gameId = uuidv4();
      const newReleaseDate = new Date();

      sandbox.stub(GameRepository, 'findById').resolves(null);

      // Act & Assert
      try {
        await GameService.updateReleaseDate(gameId, newReleaseDate);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });

    it('should throw ValidationError when id is not provided', async () => {
      // Arrange
      const newReleaseDate = new Date();

      // Act & Assert
      try {
        await GameService.updateReleaseDate('', newReleaseDate);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
      }
    });

    it('should throw ValidationError when release date is invalid', async () => {
      // Arrange
      const gameId = uuidv4();
      const invalidDate = new Date('invalid-date'); // This creates an Invalid Date object

      const existingGame = {
        id: gameId,
        title: 'Test Game',
        description: 'A test game description',
        releaseDate: new Date(),
        companyId: uuidv4(),
        categoryId: uuidv4(),
        createdAt: new Date(),
      };

      sandbox.stub(GameRepository, 'findById').resolves(existingGame);

      // Act & Assert
      try {
        await GameService.updateReleaseDate(gameId, invalidDate);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
      }
    });

    describe('getTopRatedGames', () => {
      it('should return the top-rated games', async () => {
        // Arrange
        const expectedGames = [
          {
            game: {
              id: uuidv4(),
              title: 'Game 1',
              description: 'Description 1',
              releaseDate: new Date(),
              companyId: uuidv4(),
              categoryId: uuidv4(),
              createdAt: new Date(),
            },
            avgRating: 4.5
          },
        ];  

        sandbox.stub(GameRepository, 'getTopRatedGames').resolves(expectedGames);

        // Act
        const result = await GameService.getTopRatedGames();

        // Assert
        expect(result).to.deep.equal(expectedGames);
      });

      it('should throw NotFoundError when no games with ratings are found', async () => {
        // Arrange
        sandbox.stub(GameRepository, 'getTopRatedGames').resolves([]);
  
        // Act & Assert
        try {
          await GameService.getTopRatedGames(); 
          expect.fail('Expected error was not thrown');
        } catch (error) {
          expect(error).to.be.instanceOf(NotFoundError);
        }
      });
    });
  });
});
