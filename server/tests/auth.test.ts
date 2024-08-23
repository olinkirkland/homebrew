import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import { describe, it } from 'mocha';
import request from 'supertest';

describe('Auth API', () => {
    const server = 'http://localhost:3000/api';
    const user = {
        username: 'testuser99',
        email: 'testuser99@gmail.com',
        password: 'testpassword'
    };

    console.table(user);

    // See if the server is running ('hello world' on root route)
    it('should return an OK status and a message', async () => {
        const response = await request(server).get('/');
        assert.strictEqual(response.status, StatusCodes.OK);
    });

    // Test for user registration
    it(`should register a new account with the username '${user.username}'`, async () => {
        const response = await request(server)
            .post('/auth/register')
            .send({ username: user.username, password: user.password });

        assert.strictEqual(response.status, StatusCodes.OK, response.body.message);
        assert.strictEqual(typeof response.body, 'object');
        assert.ok(response.body.message.includes('registered'));
    });

    // Test for user login
    it(`should login to the account with the username '${user.username}'`, async () => {
        const response = await request(server)
            .post('/auth/login')
            .send({ username: user.username, password: user.password });

        assert.strictEqual(response.status, StatusCodes.OK);
        assert.strictEqual(typeof response.body, 'object');
        assert.ok(response.body.token);
    });
});
