import { test, expect } from '@playwright/test';
import { createRandomUserData } from '../../../data-factory/user.js';
import { registerUser, login, logout, deleteUser } from '../../../utils.js';

test.describe('GET /api/v1/auth/check-auth', () => {
    let payload;
    test.beforeEach(async ({ request }) => {
        const { firstName, lastName, email, password } = createRandomUserData();
        payload = { firstName, lastName, email, password };
        // Register user
        await registerUser(request, payload);
        // Login
        await login(request, payload);
    });

    test.afterEach(async ({ request }) => {
        // Delete user from db
        await deleteUser(request, payload);
    });

    test(
        'should return that user is authenticated if the user is logged in',
        { tag: ['@smoke', '@positive', '@auth'] },
        async ({ request }) => {
            const checkAuthResponse = await request.get('/api/v1/auth/check-auth');
            expect(checkAuthResponse.ok()).toBeTruthy();
            const checkAuthResponseBody = await checkAuthResponse.json();
            expect(checkAuthResponseBody.authenticated).toBe(true);
        }
    );

    test(
        'should return that user is not authenticated if the user is not logged in',
        { tag: ['@smoke', '@negative', '@auth'] },
        async ({ request }) => {
            await logout(request, payload);
            const checkAuthResponse = await request.get('/api/v1/auth/check-auth');
            expect(checkAuthResponse.ok()).toBeTruthy();
            const checkAuthResponseBody = await checkAuthResponse.json();
            expect(checkAuthResponseBody.authenticated).toBe(false);
            await login(request, payload);
        }
    );
});
