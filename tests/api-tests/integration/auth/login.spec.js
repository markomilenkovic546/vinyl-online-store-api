import { test, expect } from '@playwright/test';
import { createRandomUserData } from '../../../data-factory/user.js';
import { registerUser, login, deleteUser } from '../../../utils.js';

test.describe('POST /api/v1/auth/login', () => {
    let payload;
    test.beforeEach(async ({ request }) => {
        const { firstName, lastName, email, password } = createRandomUserData();
        payload = { firstName, lastName, email, password };
        // Register user
        await registerUser(request, payload);
    });

    test.afterEach(async ({ request }) => {
        // Delete user from db
        await deleteUser(request, payload);
    });

    test(
        'should successfully login',
        { tag: ['@smoke', '@positive', '@login'] },
        async ({ request }) => {
            // Login to registered account
            const response = await request.post(`/api/v1/auth/login`, {
                data: { email: payload.email, password: payload.password }
            });
            expect(response.ok()).toBeTruthy();
            const responseBody = await response.json();
            const accessToken = response.headers()['set-cookie'];
            // Verify response body
            expect(accessToken).toBeTruthy();
            expect(responseBody._id).toBeTruthy();
            expect(responseBody.email).toBe(payload.email);
            expect(responseBody.firstName).toBe(payload.firstName);
            expect(responseBody.lastName).toBe(payload.lastName);
        }
    );

    test(
        'should not login with incorrect password',
        { tag: ['@login', '@negative'] },
        async ({ request }) => {
            // Try to login to registered account with incorrect password
            const response = await request.post(`/api/v1/auth/login`, {
                data: { email: payload.email, password: payload.password + 'n' }
            });
            expect(response.status()).toBe(401);
            const accessToken = response.headers()['set-cookie'];
            const responseBody = await response.json();
            expect(accessToken).toBeFalsy();
            expect(responseBody.error).toBe('Password is incorrect.');
        }
    );

    test(
        'should not login without email input',
        { tag: ['@login', '@negative'] },
        async ({ request }) => {
            // Try to login to registered account with incorrect password
            const response = await request.post(`/api/v1/auth/login`, {
                data: { password: payload.password }
            });
            expect(response.status()).toBe(400);
            const accessToken = response.headers()['set-cookie'];
            const responseBody = await response.json();
            expect(accessToken).toBeFalsy();
            expect(responseBody.errors[0]).toBe('Email is required');
        }
    );

    test(
        'should not login without password input',
        { tag: ['@login', '@negative'] },
        async ({ request }) => {
            // Try to login to registered account with incorrect password
            const response = await request.post(`/api/v1/auth/login`, {
                data: { email: payload.email }
            });
            expect(response.status()).toBe(400);
            const accessToken = response.headers()['set-cookie'];
            const responseBody = await response.json();
            expect(accessToken).toBeFalsy();
            expect(responseBody.errors[0]).toBe('Password is required');
        }
    );
});
