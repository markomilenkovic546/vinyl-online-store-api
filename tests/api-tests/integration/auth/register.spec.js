import { test, expect } from '@playwright/test';
import { createRandomUserData } from '../../../data-factory/user.js';

test.describe('POST /api/v1/auth/register', () => {
    test('should register new user', async ({ request }) => {
        const payload = createRandomUserData();
        const response = await request.post(`/api/v1/auth/register`, {
            data: payload
        });

        const responseBody = await response.json();
        expect(response.ok()).toBeTruthy();
        expect(responseBody.message).toBe('User successfully registered.');
        expect(responseBody.email).toBe(payload.email);
        expect(responseBody.firstName).toBe(payload.firstName);
        expect(responseBody.lastName).toBe(payload.lastName);
    });

    test('should not register user with already registered email', async ({
        request
    }) => {
        const payload = createRandomUserData();
        // Register user
        await request.post(`/api/v1/auth/register`, {
            data: payload
        });
        // Try to register user with already registered email
        const response = await request.post(`/api/v1/auth/register`, {
            data: payload
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(400);
        expect(responseBody.error).toBe('Email already exists');
    });

    test('should not register user with no provided email input', async ({
        request
    }) => {
        const payload = createRandomUserData();
        delete payload.email;
        // Register user
        const response = await request.post(`/api/v1/auth/register`, {
            data: payload
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0]).toBe('Email is required');
    });

    test('should not register user with no provided password input', async ({
        request
    }) => {
        const payload = createRandomUserData();
        delete payload.password;
        // Register user
        const response = await request.post(`/api/v1/auth/register`, {
            data: payload
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0]).toBe('Password is required');
    });

    test('should not register user with no provided first name input', async ({
        request
    }) => {
        const payload = createRandomUserData();
        delete payload.firstName;
        // Register user
        const response = await request.post(`/api/v1/auth/register`, {
            data: payload
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0]).toBe('First name is required');
    });

    test('should not register user with no provided last name input', async ({
        request
    }) => {
        const payload = createRandomUserData();
        delete payload.lastName;
        // Register user
        const response = await request.post(`/api/v1/auth/register`, {
            data: payload
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0]).toBe('Last name is required');
    });
});
