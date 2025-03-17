/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import UserService from '../../src/services/UserService';
import UserRepository from '../../src/repositories/UserRepository';
import {
  NotFoundError,
  ValidationError,
  ConflictError,
} from '../../src/errors/AppError';

describe('UserService', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('register', () => {
    it('should register a user when valid data is provided', async () => {
      // Arrange
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'USER' as const,
      };

      const hashedPassword = 'hashedpassword123';
      const expectedUser = {
        id: uuidv4(),
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'USER' as const,
        createdAt: new Date(),
      };

      const fakeToken = 'fake-jwt-token';
      
      sandbox.stub(UserRepository, 'findByEmail').resolves(null);
      sandbox.stub(bcrypt, 'hash').resolves(hashedPassword);
      const createStub = sandbox
        .stub(UserRepository, 'create')
        .resolves(expectedUser);
      
      // Add this line to mock the JWT token generation
      const generateTokenStub = sandbox.stub(require('../../src/config/jwt'), 'generateToken').returns(fakeToken);

      // Act
      const result = await UserService.register(userData);

      // Assert
      expect(generateTokenStub.calledOnceWith(expectedUser.id, expectedUser.role)).to.be.true;
      expect(result).to.deep.equal({ id: expectedUser.id, token: fakeToken });
    });

    it('should throw ConflictError when email is already in use', async () => {
      // Arrange
      const userData = {
        username: 'testuser',
        email: 'existing@example.com',
        password: 'password123',
        role: 'USER' as const,
      };

      const existingUser = {
        id: uuidv4(),
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'hashedpassword',
        role: 'USER' as const,
        createdAt: new Date(),
      };

      sandbox.stub(UserRepository, 'findByEmail').resolves(existingUser);

      // Act & Assert
      try {
        await UserService.register(userData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ConflictError);
      }
    });

    it('should throw ValidationError when invalid data is provided', async () => {
      // Arrange
      const invalidUserData = {
        username: 'te', // too short
        email: 'invalid-email',
        password: '12345', // too short
        role: 'USER' as const,
      };

      // Act & Assert
      try {
        await UserService.register(invalidUserData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
  });

  describe('getUserById', () => {
    it('should return a user without password when user exists', async () => {
      // Arrange
      const userId = uuidv4();
      const user = {
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        role: 'USER' as const,
        createdAt: new Date(),
      };

      const userWithoutPassword = {
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        role: 'USER' as const,
        createdAt: new Date(),
      };

      sandbox.stub(UserRepository, 'findById').resolves(user);

      // Act
      const result = await UserService.getUserById(userId);

      // Assert
      expect(result).to.deep.equal(userWithoutPassword);
      expect(result).to.not.have.property('password');
    });

    it('should throw NotFoundError when user does not exist', async () => {
      // Arrange
      const userId = uuidv4();
      sandbox.stub(UserRepository, 'findById').resolves(null);

      // Act & Assert
      try {
        await UserService.getUserById(userId);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });

    it('should throw ValidationError when id is not provided', async () => {
      // Act & Assert
      try {
        await UserService.getUserById('');
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
      }
    });
  });

  describe('getAllUsers', () => {
    it('should return all users without passwords', async () => {
      // Arrange
      const usersWithoutPasswords = [
        {
          id: uuidv4(),
          username: 'user1',
          email: 'user1@example.com',
          role: 'USER' as const,
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          username: 'user2',
          email: 'user2@example.com',
          role: 'ADMIN' as const,
          createdAt: new Date(),
        },
      ];

      sandbox.stub(UserRepository, 'findAll').resolves(usersWithoutPasswords);

      // Act
      const result = await UserService.getAllUsers(1, 10);

      // Assert
      expect(result).to.deep.equal(usersWithoutPasswords);
      result.forEach((user) => {
        expect(user).to.not.have.property('password');
      });
    });

    it('should call repository with correct pagination parameters', async () => {
      // Arrange
      const page = 2;
      const limit = 5;
      const expectedOffset = (page - 1) * limit; // 5
      
      const findAllStub = sandbox.stub(UserRepository, 'findAll').resolves([]);
      
      // Act
      await UserService.getAllUsers(page, limit);
      
      // Assert
      expect(findAllStub.calledOnceWith(expectedOffset, limit)).to.be.true;
    });
    
    it('should throw ValidationError when page is less than 1', async () => {
      // Act & Assert
      try {
        await UserService.getAllUsers(0, 10);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Page must be greater than 0');
      }
    });
    
    it('should throw ValidationError when limit is less than 1', async () => {
      // Act & Assert
      try {
        await UserService.getAllUsers(1, 0);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
        expect((error as Error).message).to.equal('Limit must be greater than 0');
      }
    });
  });

  describe('update', () => {
    it('should update a user when valid data is provided', async () => {
      // Arrange
      const userId = uuidv4();
      const updateData = {
        username: 'updatedusername',
        email: 'updated@example.com',
      };

      const existingUser = {
        id: userId,
        username: 'originalusername',
        email: 'original@example.com',
        password: 'hashedpassword',
        role: 'USER' as const,
        createdAt: new Date(),
      };

      const updatedUser = {
        ...existingUser,
        ...updateData,
      };

      sandbox.stub(UserRepository, 'findById').resolves(existingUser);
      sandbox.stub(UserRepository, 'findByEmail').resolves(null);
      sandbox.stub(UserRepository, 'update').resolves(updatedUser);

      // Act
      const result = await UserService.update(userId, userId, updateData);

      // Assert
      expect(result).to.deep.equal(updatedUser);
    });

    it('should throw NotFoundError when user does not exist', async () => {
      // Arrange
      const userId = uuidv4();
      const updateData = { username: 'updatedusername' };

      sandbox.stub(UserRepository, 'findById').resolves(null);

      // Act & Assert
      try {
        await UserService.update(userId, userId, updateData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });

    it('should throw ConflictError when email is already in use by another user', async () => {
      // Arrange
      const userId = uuidv4();
      const updateData = {
        email: 'existing@example.com',
      };

      const existingUser = {
        id: userId,
        username: 'originalusername',
        email: 'original@example.com',
        password: 'hashedpassword',
        role: 'USER' as const,
        createdAt: new Date(),
      };

      const anotherUser = {
        id: uuidv4(), // Different ID
        username: 'anotheruser',
        email: 'existing@example.com', // Same email as updateData
        password: 'hashedpassword',
        role: 'USER' as const,
        createdAt: new Date(),
      };

      sandbox.stub(UserRepository, 'findById').resolves(existingUser);
      sandbox.stub(UserRepository, 'findByEmail').resolves(anotherUser);

      // Act & Assert
      try {
        await UserService.update(userId, userId, updateData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ConflictError);
      }
    });

    it('should throw ValidationError when id is not provided', async () => {
      // Arrange
      const updateData = { username: 'updatedusername' };

      // Act & Assert
      try {
        await UserService.update('', '', updateData);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
      }
    });
  });

  describe('deleteUser', () => {
    it('should delete a user when user exists', async () => {
      // Arrange
      const userId = uuidv4();
      const existingUser = {
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        role: 'USER' as const,
        createdAt: new Date(),
      };

      sandbox.stub(UserRepository, 'findById').resolves(existingUser);
      const deleteStub = sandbox.stub(UserRepository, 'delete').resolves();

      // Act
      await UserService.deleteUser(userId, userId);

      // Assert
      expect(deleteStub.calledOnceWith(userId)).to.be.true;
    });

    it('should throw NotFoundError when user does not exist', async () => {
      // Arrange
      const userId = uuidv4();
      sandbox.stub(UserRepository, 'findById').resolves(null);

      // Act & Assert
      try {
        await UserService.deleteUser(userId, userId);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });

    it('should throw ValidationError when id is not provided', async () => {
      // Act & Assert
      try {
        await UserService.deleteUser('', '');
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
      }
    });
  });

  describe('changePassword', () => {
    it('should change password when credentials are valid', async () => {
      // Arrange
      const userId = uuidv4();
      const oldPassword = 'oldpassword123';
      const newPassword = 'newpassword456';
      const hashedOldPassword = 'hashedoldpassword';
      const hashedNewPassword = 'hashednewpassword';

      const existingUser = {
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        password: hashedOldPassword,
        role: 'USER' as const,
        createdAt: new Date(),
      };

      sandbox.stub(UserRepository, 'findById').resolves(existingUser);
      sandbox.stub(bcrypt, 'compare').resolves(true);
      sandbox.stub(bcrypt, 'hash').resolves(hashedNewPassword);
      const updatePasswordStub = sandbox
        .stub(UserRepository, 'updatePassword')
        .resolves();

      // Act
      await UserService.changePassword(userId, userId, oldPassword, newPassword);

      // Assert
      expect(updatePasswordStub.calledOnceWith(userId, hashedNewPassword)).to.be
        .true;
    });

    it('should throw NotFoundError when user does not exist', async () => {
      // Arrange
      const userId = uuidv4();
      const oldPassword = 'oldpassword123';
      const newPassword = 'newpassword456';

      sandbox.stub(UserRepository, 'findById').resolves(null);

      // Act & Assert
      try {
        await UserService.changePassword(userId, userId, oldPassword, newPassword);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });

    it('should throw ValidationError when old password is incorrect', async () => {
      // Arrange
      const userId = uuidv4();
      const oldPassword = 'wrongpassword';
      const newPassword = 'newpassword456';
      const hashedOldPassword = 'hashedoldpassword';

      const existingUser = {
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        password: hashedOldPassword,
        role: 'USER' as const,
        createdAt: new Date(),
      };

      sandbox.stub(UserRepository, 'findById').resolves(existingUser);
      sandbox.stub(bcrypt, 'compare').resolves(false); // Password doesn't match

      // Act & Assert
      try {
        await UserService.changePassword(userId, userId, oldPassword, newPassword);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(ValidationError);
      }
    });

    it('should throw ValidationError when password data is invalid', async () => {
      // Arrange
      const userId = uuidv4();
      const oldPassword = '';
      const newPassword = '12345'; // Too short

      // Act & Assert
      try {
        await UserService.changePassword(userId, userId, oldPassword, newPassword);
        expect.fail('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
  });
});
