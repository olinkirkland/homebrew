import assert from 'assert';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { describe, it } from 'mocha';
import request from 'supertest';
import { makeReadableToken } from '../../src/utils/helpers';

describe('Auth API', () => {
    dotenv.config();
    const server = process.env.TEST_SERVER_URL || 'http://localhost:3000/api';

    const user = getNewRandomUser();
    let refreshToken: string;
    let accessToken: string;

    console.table(user);

    // See if the server is running (any response on root route)
    it('should return an OK status and a message', async () => {
        const response = await request(server).get('/');
        assert.strictEqual(response.status, StatusCodes.OK);
    });

    // Test for user login
    if (false)
        it(`should login to the account with the username '${user.username}'`, async () => {
            const response = await request(server)
                .post('/auth/login')
                .send({ username: user.username, password: user.password });

            assert.strictEqual(response.status, StatusCodes.OK);
            assert.strictEqual(typeof response.body, 'object');
            assert.ok(response.body.token);

            refreshToken = response.body.token
        });

    // Test for logging in with a new guest account
    it('should login to a new guest account', async () => {
        const response = await request(server).post('/auth/guest');

        assert.strictEqual(response.status, StatusCodes.CREATED);
        assert.strictEqual(typeof response.body, 'object');
        assert.ok(response.body.token);

        refreshToken = response.body.token;
    });

    // Test for fetching a new token
    it('should fetch a new access token', async () => {
        if (!refreshToken) assert.fail('No refresh token found');

        const response = await request(server)
            .get('/auth/token')
            .send({ refreshToken: refreshToken });

        assert.strictEqual(response.status, StatusCodes.OK);
        assert.strictEqual(typeof response.body, 'object');
        assert.ok(response.body.token);
        assert.ok(response.body.token !== refreshToken);

        accessToken = response.body.token;
    });

    // Test for user registration
    it(`should register the logged-in user with the email '${user.email}'`, async () => {
        if (!accessToken) assert.fail('No access token found');

        const response = await request(server)
            .post('/auth/register')
            .set('Authorization', `Bearer ${accessToken}`) // Set the token in the header
            .send({ email: user.email, password: user.password });

        assert.strictEqual(
            response.status,
            StatusCodes.OK,
            response.body.message
        );
        assert.strictEqual(typeof response.body, 'object');
        assert.ok(response.body.message.includes('registered'));
    });
});

function getNewRandomUser() {
    const n = Math.floor(Math.random() * 100);
    const user = {
        username: 'testuser_' + n,
        email: `testuser${n}@test.com`,
        password: makeReadableToken()
    };

    return user;
}
