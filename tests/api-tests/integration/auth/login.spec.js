import { test, expect } from '@playwright/test';
import { createRandomUserData } from '../../../data-factory/user.js';
import { registerUser } from '../../../utils.js';

test.describe('POST /api/v1/auth/login', () => {
    let payload;
    test.beforeEach(async ({ request }) => {
        payload = createRandomUserData();
        // Register user
        await registerUser(request, payload);
    });
    test('should successfully login', async ({ request }) => {
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
    });

});
