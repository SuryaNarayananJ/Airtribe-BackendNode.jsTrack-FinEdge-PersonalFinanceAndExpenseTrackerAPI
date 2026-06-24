const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Transaction Endpoints', () => {
  let token;
  const testUser = {
    name: 'Transaction User',
    email: 'transact@example.com',
    password: 'password123'
  };

  const testTransaction = {
    title: 'Groceries',
    amount: 150,
    type: 'expense',
    category: 'Food',
    date: '2023-10-15'
  };

  beforeAll(async () => {
    // Register and get token
    await request(app).post('/airtribe/v1/users/register').send(testUser);
    const loginRes = await request(app)
      .post('/airtribe/v1/users/login')
      .send({ email: testUser.email, password: testUser.password });
    token = loginRes.body.token;
  });

  describe('POST /airtribe/v1/transactions', () => {
    it('should create a new transaction when authenticated', async () => {
      const res = await request(app)
        .post('/airtribe/v1/transactions')
        .set('Authorization', token)
        .send(testTransaction);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('amount', testTransaction.amount);
      expect(res.body).toHaveProperty('type', testTransaction.type);
      expect(res.body).toHaveProperty('category', testTransaction.category);
    });

    it('should fail when missing authorization header', async () => {
      const res = await request(app)
        .post('/airtribe/v1/transactions')
        .send(testTransaction);

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Invalid Token');
    });
  });

  describe('GET /airtribe/v1/transactions', () => {
    beforeEach(async () => {
      // Add a transaction before getting
      await request(app)
        .post('/airtribe/v1/transactions')
        .set('Authorization', token)
        .send(testTransaction);
    });

    it('should retrieve all transactions for the user', async () => {
      const res = await request(app)
        .get('/airtribe/v1/transactions')
        .set('Authorization', token);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('amount', testTransaction.amount);
    });
  });
});
