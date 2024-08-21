import { describe, it } from 'mocha';
import request from 'supertest';
import assert from 'assert';

describe('Auth API', () => {
    const server = 'http://localhost:3000/api';
    const testUser = {
        username: 'testuser6',
        password: 'testpassword'
    };

    // Test for user registration
    it('should register a new account', async () => {
        const response = await request(server)
            .post('/auth/register') // Adjust this endpoint if your API uses a different one
            .send(testUser);

        assert.strictEqual(response.status, 201); // Assuming 201 is returned for successful registration
        assert.strictEqual(typeof response.body, 'object');
        assert.ok(response.body.message.includes('registered')); // Ensure response has a message that includes "registered"
    });

    // Test for user login
    it('should login to the account', async () => {
        const response = await request(server)
            .post('/auth/login') // Adjust this endpoint if necessary
            .send(testUser);

        assert.strictEqual(response.status, 200); // Assuming 200 is returned for successful login
        assert.strictEqual(typeof response.body, 'object');
        assert.ok(response.body.token); // Ensure response contains a token
    });
});
