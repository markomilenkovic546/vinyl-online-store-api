import { test, expect } from '@playwright/test';
import { createRandomUserData } from '../../../data-factory/user.js';
import { createRandomAddressData } from '../../../data-factory/address.js';
import { registerUser, login, getUser, logout, deleteUser } from '../../../utils.js';

test.describe('POST /api/v1/user/addresses', () => {
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
        'should create address successfully and set it as a default',
        { tag: ['@smoke', '@positive', '@address'] },
        async ({ request }) => {
            // Prepare address payload
            const createAddressPayload = createRandomAddressData();
            createAddressPayload.isDefault = true;

            // Send a request to create an address
            const createAddressResponse = await request.post('/api/v1/user/addresses', {
                data: createAddressPayload
            });
            expect(createAddressResponse.ok()).toBeTruthy();
            const createAddressResponseBody = await createAddressResponse.json();
            // Verify response body of the 'Create address' request
            expect(createAddressResponseBody).toMatchObject({
                message: 'Address added successfully',
                address: {
                    _id: expect.any(String),
                    country: createAddressPayload.country,
                    firstName: createAddressPayload.firstName,
                    lastName: createAddressPayload.lastName,
                    company: createAddressPayload.company,
                    streetAddress: createAddressPayload.streetAddress,
                    apartment: createAddressPayload.apartment,
                    city: createAddressPayload.city,
                    state: '',
                    postalCode: createAddressPayload.postalCode,
                    phone: createAddressPayload.phone,
                    isDefault: true
                }
            });

            // Get user from db to verify that address is created and other address correctly updated
            const getUserResponse = await getUser(request);
            expect(getUserResponse.ok()).toBeTruthy();
            const getUserResponseBody = await getUserResponse.json();

            // Verify that address i recorded correctly in db
            expect(getUserResponseBody.addresses[1]).toMatchObject({
                _id: expect.any(String),
                country: createAddressPayload.country,
                firstName: createAddressPayload.firstName,
                lastName: createAddressPayload.lastName,
                company: createAddressPayload.company,
                streetAddress: createAddressPayload.streetAddress,
                apartment: createAddressPayload.apartment,
                city: createAddressPayload.city,
                state: '',
                postalCode: createAddressPayload.postalCode,
                phone: createAddressPayload.phone,
                isDefault: true
            });
            // Verify that other address 'isDefault' property is updated to false
            expect(getUserResponseBody.addresses[0].isDefault).toBe(false);
        }
    );

    test(
        'should create address successfully and set it as a non-default',
        { tag: ['@positive', '@address'] },
        async ({ request }) => {
            // Prepare address payload
            const createAddressPayload = createRandomAddressData();
            createAddressPayload.isDefault = false;

            // Send a request to create an address
            const createAddressResponse = await request.post('/api/v1/user/addresses', {
                data: createAddressPayload
            });
            expect(createAddressResponse.ok()).toBeTruthy();
            const createAddressResponseBody = await createAddressResponse.json();
            // Verify response body of the 'Create address' request
            expect(createAddressResponseBody).toMatchObject({
                message: 'Address added successfully',
                address: {
                    _id: expect.any(String),
                    country: createAddressPayload.country,
                    firstName: createAddressPayload.firstName,
                    lastName: createAddressPayload.lastName,
                    company: createAddressPayload.company,
                    streetAddress: createAddressPayload.streetAddress,
                    apartment: createAddressPayload.apartment,
                    city: createAddressPayload.city,
                    state: '',
                    postalCode: createAddressPayload.postalCode,
                    phone: createAddressPayload.phone,
                    isDefault: false
                }
            });

            // Get user from db to verify that address is created and other address correctly updated
            const getUserResponse = await getUser(request);
            expect(getUserResponse.ok()).toBeTruthy();
            const getUserResponseBody = await getUserResponse.json();

            // Verify that address i recorded correctly in db
            expect(getUserResponseBody.addresses[1]).toMatchObject({
                _id: expect.any(String),
                country: createAddressPayload.country,
                firstName: createAddressPayload.firstName,
                lastName: createAddressPayload.lastName,
                company: createAddressPayload.company,
                streetAddress: createAddressPayload.streetAddress,
                apartment: createAddressPayload.apartment,
                city: createAddressPayload.city,
                state: '',
                postalCode: createAddressPayload.postalCode,
                phone: createAddressPayload.phone,
                isDefault: false
            });
            // Verify that other address 'isDefault' property is still true
            expect(getUserResponseBody.addresses[0].isDefault).toBe(true);
        }
    );

    test(
        'should not create an address without access token',
        { tag: ['@negative', '@address'] },
        async ({ request }) => {
            // Logout to be unauthorized
            await logout(request, payload);

            // Prepare address payload
            const createAddressPayload = createRandomAddressData();
            createAddressPayload.isDefault = false;
            const createAddressResponse = await request.post('/api/v1/user/addresses', {
                data: createAddressPayload
            });
            expect(createAddressResponse.status()).toBe(401);
            const createAddressResponseBody = await createAddressResponse.json();
            expect(createAddressResponseBody).toMatchObject({
                error: 'Unauthorized'
            });
            // Login again to be authorized to delete user in the afterEach hook
            await login(request, payload);
        }
    );

    test(
        'should not create an address when firstName input is missing',
        { tag: ['@negative', '@address'] },
        async ({ request }) => {
            // Prepare address payload
            const createAddressPayload = createRandomAddressData();
            createAddressPayload.isDefault = false;
            delete createAddressPayload.firstName;
            const createAddressResponse = await request.post('/api/v1/user/addresses', {
                data: createAddressPayload
            });
            expect(createAddressResponse.status()).toBe(400);
            const createAddressResponseBody = await createAddressResponse.json();
            expect(createAddressResponseBody).toMatchObject({
                errors: ['First name is required']
            });
        }
    );

    test(
        'should not create an address when lastName input is missing',
        { tag: ['@negative', '@address'] },
        async ({ request }) => {
            // Prepare address payload
            const createAddressPayload = createRandomAddressData();
            createAddressPayload.isDefault = false;
            delete createAddressPayload.lastName;
            const createAddressResponse = await request.post('/api/v1/user/addresses', {
                data: createAddressPayload
            });
            expect(createAddressResponse.status()).toBe(400);
            const createAddressResponseBody = await createAddressResponse.json();
            expect(createAddressResponseBody).toMatchObject({
                errors: ['Last name is required']
            });
        }
    );
});
