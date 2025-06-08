import request from 'supertest';
import express from 'express';
import { dataSource } from '../config/db.mysql';
import { User } from '../models/sql/User';
import authController from '../controllers/authController';
import userController from '../controllers/userController';

describe('Authentication Tests', () => {
  let app: express.Application;
  let testUser: User | null;

  beforeAll(async () => {
    app = express();
    app.use(express.json());

    // Register auth routes
    app.post('/auth/register', (req, res, next) => authController.doRegistration(req, res, next));
    app.post('/auth/login', (req, res, next) => authController.doLogin(req, res, next));
    app.get('/auth/profile', (req, res, next) => userController.getProfile(req, res, next));

    // Clear test data before tests
    const userRepo = dataSource.getRepository(User);
    await userRepo.clear();
  });

  describe('Registration', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User registered successfully');

      // Verify user was created in database
      const userRepo = dataSource.getRepository(User);
      testUser = await userRepo.findOne({ where: { email: 'test@example.com' } });
      expect(testUser).toBeTruthy();
      expect(testUser?.name).toBe('Test User');
    });

    it('should not register a user with existing email', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Another User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('Email Id exists');
    });
  });

  describe('Login', () => {
    it('should login successfully with valid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.token).toBeTruthy();
    });

    it('should not login with invalid password', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should not login with non-existent email', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('Profile', () => {
    let authToken: string;

    beforeAll(async () => {
      // Get auth token for profile tests
      const loginResponse = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      authToken = loginResponse.body.token;
    });

    it('should get user profile with valid token', async () => {
      const response = await request(app)
        .get('/auth/profile')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe('test@example.com');
      expect(response.body.name).toBe('Test User');
    });

    it('should not get profile without token', async () => {
      const response = await request(app)
        .get('/auth/profile');

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('No token provided');
    });

    it('should not get profile with invalid token', async () => {
      const response = await request(app)
        .get('/auth/profile')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Invalid token');
    });
  });
}); 