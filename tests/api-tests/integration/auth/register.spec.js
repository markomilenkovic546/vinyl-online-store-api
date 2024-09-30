import { test, expect } from '@playwright/test';
import { createRandomUserData } from '../../../data-factory/user.js';
import { login, deleteUser } from '../../../utils.js';

test.describe('POST /api/v1/auth/register', () => {
    let payload;

    test.beforeEach(async () => {
        payload = createRandomUserData();
    });

    test(
        'should register new user',
        { tag: ['@smoke', '@positive', '@register'] },
        async ({ request }) => {
            const response = await request.post(`/api/v1/auth/register`, {
                data: payload
            });
            expect(response.ok()).toBeTruthy();
            const responseBody = await response.json();
            expect(responseBody.message).toBe('User successfully registered.');
            expect(responseBody.email).toBe(payload.email);
            expect(responseBody.firstName).toBe(payload.firstName);
            expect(responseBody.lastName).toBe(payload.lastName);

            // Login to registered account
            await login(request, payload);
            // Delete user from db
            await deleteUser(request, payload);
        }
    );

    test(
        'should not register user with already registered email',
        { tag: ['@register', '@negative'] },
        async ({ request }) => {
            // Register user
            await request.post(`/api/v1/auth/register`, {
                data: payload
            });
            // Try to register user with already registered email
            const response = await request.post(`/api/v1/auth/register`, {
                data: payload
            });
            expect(response.status()).toBe(400);
            const responseBody = await response.json();
            expect(responseBody.error).toBe('Email already exists');
        }
    );

    test(
        'should not register user with no provided email input',
        { tag: ['@register', '@negative'] },
        async ({ request }) => {
            delete payload.email;
            // Register user
            const response = await request.post(`/api/v1/auth/register`, {
                data: payload
            });
            expect(response.status()).toBe(400);
            const responseBody = await response.json();
            expect(responseBody.errors[0]).toBe('Email is required');
        }
    );

    test(
        'should not register user with no provided password input',
        { tag: ['@register', '@negative'] },
        async ({ request }) => {
            delete payload.password;
            // Register user
            const response = await request.post(`/api/v1/auth/register`, {
                data: payload
            });
            expect(response.status()).toBe(400);
            const responseBody = await response.json();
            expect(responseBody.errors[0]).toBe('Password is required');
        }
    );

    test(
        'should not register user with no provided first name input',
        { tag: ['@register', '@negative'] },
        async ({ request }) => {
            delete payload.firstName;
            // Register user
            const response = await request.post(`/api/v1/auth/register`, {
                data: payload
            });
            expect(response.status()).toBe(400);
            const responseBody = await response.json();
            expect(responseBody.errors[0]).toBe('First name is required');
        }
    );

    test(
        'should not register user with no provided last name input',
        { tag: ['@register', '@negative'] },
        async ({ request }) => {
            delete payload.lastName;
            // Register user
            const response = await request.post(`/api/v1/auth/register`, {
                data: payload
            });
            expect(response.status()).toBe(400);
            const responseBody = await response.json();
            expect(responseBody.errors[0]).toBe('Last name is required');
        }
    );
});
