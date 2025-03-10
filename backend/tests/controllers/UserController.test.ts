import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import UserController from '../../src/controllers/UserController';
import UserService from '../../src/services/UserService';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('UserController', () => {
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

  describe('register', () => {
    it('should register a user and return 201 status', async () => {
      // Arrange
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'USER' as const,
      };

      const createdUser = {
        id: uuidv4(),
        username: 'testuser',
        email: 'test@example.com',
        role: 'USER' as const,
        password: 'password123',
        createdAt: new Date(),
      };

      req.body = userData;
      const registerStub = sandbox
        .stub(UserService, 'register')
        .resolves(createdUser);

      // Act
      await UserController.register(
        req as Request,
        res as Response,
        next as unknown as NextFunction,
      );

      // Assert
      expect(registerStub.calledOnceWith(userData)).to.be.true;
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(createdUser)).to.be.true;
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.body = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };
      sandbox.stub(UserService, 'register').rejects(error);

      // Act
      await UserController.register(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('getUser', () => {
    it('should return a user and 200 status', async () => {
      // Arrange
      const userId = uuidv4();
      const user = {
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        role: 'USER' as const,
        password: 'password123',
        createdAt: new Date(),
      };

      req.params = { id: userId };
      const getUserByIdStub = sandbox
        .stub(UserService, 'getUserById')
        .resolves(user);

      // Act
      await UserController.getUser(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(getUserByIdStub.calledOnceWith(userId)).to.be.true;
      expect(res.status as sinon.SinonStub).to.be.calledWith(200);
      expect(res.json).to.have.been.calledWith(user);
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      sandbox.stub(UserService, 'getUserById').rejects(error);

      // Act
      await UserController.getUser(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('getAllUsers', () => {
    it('should return all users and 200 status', async () => {
      // Arrange
      const users = [
        {
          id: uuidv4(),
          username: 'user1',
          email: 'user1@example.com',
          role: 'USER' as const,
          password: 'password123',
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          username: 'user2',
          email: 'user2@example.com',
          role: 'ADMIN' as const,
          password: 'password123',
          createdAt: new Date(),
        },
      ];

      const getAllUsersStub = sandbox
        .stub(UserService, 'getAllUsers')
        .resolves(users);

      // Act
      await UserController.getAllUsers(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(getAllUsersStub.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(users);
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      sandbox.stub(UserService, 'getAllUsers').rejects(error);

      // Act
      await UserController.getAllUsers(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('updateUser', () => {
    it('should update a user and return 200 status', async () => {
      // Arrange
      const userId = uuidv4();
      const updateData = {
        username: 'updatedusername',
        email: 'updated@example.com',
      };

      const updatedUser = {
        id: userId,
        username: 'updatedusername',
        email: 'updated@example.com',
        role: 'USER' as const,
        password: 'password123',
        createdAt: new Date(),
      };

      req.params = { id: userId };
      req.body = updateData;
      const updateStub = sandbox
        .stub(UserService, 'update')
        .resolves(updatedUser);

      // Act
      await UserController.updateUser(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(updateStub.calledOnceWith(userId, updateData)).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedUser);
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      req.body = { username: 'updatedusername', email: 'updated@example.com' };
      sandbox.stub(UserService, 'update').rejects(error);

      // Act
      await UserController.updateUser(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return 204 status', async () => {
      // Arrange
      const userId = uuidv4();
      req.params = { id: userId };
      const deleteUserStub = sandbox.stub(UserService, 'deleteUser').resolves();

      // Act
      await UserController.deleteUser(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(deleteUserStub.calledOnceWith(userId)).to.be.true;
      expect(res.status).to.have.been.calledWith(204);
      expect(res.send).to.have.been.called;
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      sandbox.stub(UserService, 'deleteUser').rejects(error);

      // Act
      await UserController.deleteUser(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('updatePassword', () => {
    it('should update password and return 200 status', async () => {
      // Arrange
      const userId = uuidv4();
      const passwordData = {
        oldPassword: 'oldpassword123',
        newPassword: 'newpassword456',
      };

      req.params = { id: userId };
      req.body = passwordData;
      const changePasswordStub = sandbox
        .stub(UserService, 'changePassword')
        .resolves();

      // Act
      await UserController.updatePassword(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(
        changePasswordStub.calledOnceWith(
          userId,
          passwordData.oldPassword,
          passwordData.newPassword,
        ),
      ).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        message: 'Password changed successfully',
      });
    });

    it('should call next with error if service throws', async () => {
      // Arrange
      const error = new Error('Service error');
      req.params = { id: uuidv4() };
      req.body = {
        oldPassword: 'oldpassword123',
        newPassword: 'newpassword456',
      };
      sandbox.stub(UserService, 'changePassword').rejects(error);

      // Act
      await UserController.updatePassword(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      // Assert
      expect(next.calledOnceWith(error)).to.be.true;
    });
  });
});
