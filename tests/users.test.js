const request = require('supertest');
const app = require('../app');
const usersModel = require('../models/usersModel');

describe('User Endpoints', () => {
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'user'
  };

  describe('POST /airtribe/v1/users/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/airtribe/v1/users/register')
        .send(testUser);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Registration Successful');
      expect(res.body).toHaveProperty('email', testUser.email);
      expect(res.body).toHaveProperty('name', testUser.name);
    });

    it('should fail if email is already taken', async () => {
      await request(app).post('/airtribe/v1/users/register').send(testUser);
      const res = await request(app).post('/airtribe/v1/users/register').send(testUser);
      
      expect(res.statusCode).toEqual(500); // Mongoose duplicate key error caught by global error handler
      expect(res.body).toHaveProperty('message', 'Something went very wrong!');
    });
  });

  describe('POST /airtribe/v1/users/login', () => {
    beforeEach(async () => {
      // Register before logging in
      await request(app).post('/airtribe/v1/users/register').send(testUser);
    });

    it('should login successfully with correct credentials', async () => {
      const res = await request(app)
        .post('/airtribe/v1/users/login')
        .send({ email: testUser.email, password: testUser.password });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Login Successful');
      expect(res.body).toHaveProperty('token');
    });

    it('should fail with incorrect password', async () => {
      const res = await request(app)
        .post('/airtribe/v1/users/login')
        .send({ email: testUser.email, password: 'wrongpassword' });

      expect(res.statusCode).toEqual(500); // Standard errorHandler in app.js
      expect(res.body).toHaveProperty('message', 'Something went very wrong!');
    });
  });
});
