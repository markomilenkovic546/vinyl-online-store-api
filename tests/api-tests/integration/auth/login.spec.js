import { test, expect } from '@playwright/test';
import { createRandomUserData } from '../../../data-factory/user.js';
import { registerUser, deleteUser } from '../../../utils.js';

test.describe('POST /api/v1/auth/login', () => {
    let payload;
    test.beforeEach(async ({ request }) => {
        payload = createRandomUserData();
        // Register user
        await registerUser(request, payload);
    });

    test.afterEach(async ({ request }) => {
        // Delete user from db
        await deleteUser(request);
    });

    test(
        'should successfully login',
        { tag: ['@smoke', '@login'] },
        async ({ request }) => {
            // Login to registered account
            const response = await request.post(`/api/v1/auth/login`, {
                data: { email: payload.email, password: payload.password }
            });
            const responseBody = await response.json();
            const accessToken = response.headers()['set-cookie'];
            // Verify response
            expect(response.ok()).toBeTruthy();
            expect(accessToken).toBeTruthy();
            expect(responseBody._id).toBeTruthy();
            expect(responseBody.email).toBe(payload.email);
            expect(responseBody.firstName).toBe(payload.firstName);
            expect(responseBody.lastName).toBe(payload.lastName);
        }
    );
});
