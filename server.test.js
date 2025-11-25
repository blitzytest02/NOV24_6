// Comprehensive test suite for Express.js server
// Tests cover /hello and /evening endpoints with 13 test cases
// Uses Jest as test framework and Supertest for HTTP testing

const request = require('supertest');
const app = require('./server');

describe('Express Server Endpoints', () => {
  describe('GET /hello', () => {
    it('should return "Hello world" with status 200', async () => {
      const response = await request(app).get('/hello');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello world');
    });

    it('should have correct content-type header', async () => {
      const response = await request(app).get('/hello');
      expect(response.headers['content-type']).toMatch(/text\/html/);
    });
  });

  describe('GET /evening', () => {
    it('should return "Good evening" with status 200', async () => {
      const response = await request(app).get('/evening');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Good evening');
    });

    it('should have correct content-type header', async () => {
      const response = await request(app).get('/evening');
      expect(response.headers['content-type']).toMatch(/text\/html/);
    });
  });

  describe('GET /nonexistent', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.status).toBe(404);
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple requests to the same endpoint', async () => {
      const response1 = await request(app).get('/hello');
      const response2 = await request(app).get('/hello');
      const response3 = await request(app).get('/hello');
      
      expect(response1.status).toBe(200);
      expect(response2.status).toBe(200);
      expect(response3.status).toBe(200);
      expect(response1.text).toBe('Hello world');
      expect(response2.text).toBe('Hello world');
      expect(response3.text).toBe('Hello world');
    });

    it('should handle requests to different endpoints', async () => {
      const response1 = await request(app).get('/hello');
      const response2 = await request(app).get('/evening');
      const response3 = await request(app).get('/hello');
      
      expect(response1.text).toBe('Hello world');
      expect(response2.text).toBe('Good evening');
      expect(response3.text).toBe('Hello world');
    });

    it('should only accept GET method for /hello', async () => {
      const response = await request(app).post('/hello');
      expect(response.status).toBe(404);
    });

    it('should only accept GET method for /evening', async () => {
      const response = await request(app).post('/evening');
      expect(response.status).toBe(404);
    });

    it('should handle PUT requests with 404', async () => {
      const response = await request(app).put('/hello');
      expect(response.status).toBe(404);
    });

    it('should handle DELETE requests with 404', async () => {
      const response = await request(app).delete('/evening');
      expect(response.status).toBe(404);
    });
  });

  describe('Response Content Validation', () => {
    it('should return exact text "Hello world" without extra whitespace', async () => {
      const response = await request(app).get('/hello');
      expect(response.text).toBe('Hello world');
      expect(response.text.trim()).toBe(response.text);
      expect(response.text.length).toBe(11);
    });

    it('should return exact text "Good evening" without extra whitespace', async () => {
      const response = await request(app).get('/evening');
      expect(response.text).toBe('Good evening');
      expect(response.text.trim()).toBe(response.text);
      expect(response.text.length).toBe(12);
    });
  });
});
