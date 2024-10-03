import { test, expect } from '@playwright/test';
import { createRandomUserData } from '../../../data-factory/user.js';
import { registerUser, login, deleteUser } from '../../../utils.js';

test.describe('POST /api/v1/auth/logout', () => {
    let payload;
    let accessToken;
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
        'should successfully logout',
        { tag: ['@smoke', '@positive', '@logout'] },
        async ({ request }) => {
            // Logout
            const logoutResponse = await request.post(`/api/v1/auth/logout`);
            expect(logoutResponse.ok()).toBeTruthy();
            const responseBody = await logoutResponse.json();
            // Verify response body
            expect(responseBody.message).toBe('Logged out successfully');

            // Attempt to access a protected resource after logout
            const getUserResponse = await request.get(`/api/v1/user`);
            const getUserResponseBody = await getUserResponse.json();
            expect(getUserResponse.status()).toBe(401);
            expect(getUserResponseBody.error).toBe('Unauthorized');
        }
    );
});
