import { test, expect } from '@playwright/test';
import { createRandomUserData } from '../../../data-factory/user.js';
import { registerUser, login, logout, deleteUser } from '../../../utils.js';

test.describe('GET /api/v1/user', () => {
    let payload;
    test.beforeEach(async ({ request }) => {
        payload = createRandomUserData();
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
        'should successfully get user data',
        { tag: ['@smoke', '@positive', '@user'] },
        async ({ request }) => {
            // Get user data
            const userResponse = await request.get(`/api/v1/user`);
            expect(userResponse.ok()).toBeTruthy();
            const responseBody = await userResponse.json();
            // Verify response body
            expect(responseBody).toMatchObject({
                _id: expect.any(String),
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                profileImage: '',
                birthday: '',
                recordsCollection: [],
                loyaltyPoints: 0,
                addresses: [
                    {
                        country: '',
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        company: '',
                        streetAddress: '',
                        apartment: '',
                        city: '',
                        state: '',
                        postalCode: '',
                        phone: '',
                        isDefault: true,
                        _id: expect.any(String)
                    }
                ],
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        }
    );

    test(
        'should not get a user data without access token',
        { tag: ['@negative', '@user'] },
        async ({ request }) => {
            // Logout user
            await logout(request, payload);
            // Get user data
            const userResponse = await request.get(`/api/v1/user`);
            expect(userResponse.status()).toBe(401);
            const responseBody = await userResponse.json();
            expect(responseBody).toMatchObject({ error: 'Unauthorized' });
        }
    );
});
