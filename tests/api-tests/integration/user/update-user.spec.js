import { test, expect } from '@playwright/test';
import { createRandomUserData } from '../../../data-factory/user.js';
import {
    registerUser,
    login,
    getUser,
    deleteUser,
    logout
} from '../../../utils.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'test-assets/profileImg.jpg'
);

test.describe('PATCH /api/v1/user', () => {
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
        'should update user by providing all inputs',
        { tag: ['@smoke', '@positive', '@user'] },
        async ({ request }) => {
            const imageBuffer = fs.readFileSync(imagePath);
            const { firstName, lastName, birthday } = createRandomUserData();

            // Update user
            const updateUserResponse = await request.patch(`/api/v1/user`, {
                multipart: {
                    profileImage: {
                        name: 'profileImg.jpg',
                        mimeType: 'image/jpeg',
                        buffer: imageBuffer
                    },
                    firstName: firstName,
                    lastName: lastName,
                    birthday: birthday
                }
            });
            expect(updateUserResponse.ok()).toBeTruthy();
            // Verify update user response body
            const updateUserResponseBody = await updateUserResponse.json();
            expect(updateUserResponseBody).toMatchObject({
                message: 'Profile updated successfully',
                user: {
                    firstName: firstName,
                    lastName: lastName,
                    email: payload.email,
                    profileImage: expect.stringContaining('profileImg.jpg'),
                    birthday: birthday
                }
            });
            // Get user data from db and verify that data is correctly updated in db
            const getUserResponse = await getUser(request);
            expect(getUserResponse.ok()).toBeTruthy();
            const getUserResponseBody = await getUserResponse.json();
            expect(getUserResponseBody.firstName).toBe(firstName);
            expect(getUserResponseBody.lastName).toBe(lastName);
            expect(getUserResponseBody.birthday).toBe(birthday);
            expect(getUserResponseBody.profileImage).toContain(
                'profileImg.jpg'
            );
        }
    );

    test(
        'should return status unauthorized when requesting without access token',
        { tag: ['@smoke', '@negative', '@user'] },
        async ({ request }) => {
            const imageBuffer = fs.readFileSync(imagePath);
            const { firstName, lastName, birthday } = createRandomUserData();
            // Logout
            await logout(request, payload);
            const updateUserResponse = await request.patch(`/api/v1/user`, {
                multipart: {
                    profileImage: {
                        name: 'profileImg.jpg',
                        mimeType: 'image/jpeg',
                        buffer: imageBuffer
                    },
                    firstName: firstName,
                    lastName: lastName,
                    birthday: birthday
                }
            });
            expect(updateUserResponse.status()).toBe(401);
            const updateUserResponseBody = await updateUserResponse.json();
            expect(updateUserResponseBody).toMatchObject({
                error: 'Unauthorized'
            });
            // Login to be authorized to delete test account in afterEach hook
            await login(request, payload);
        }
    );
});
