import { test, expect } from '@playwright/test';
import { createRandomUserData } from '../../../data-factory/user.js';
import { createRandomAddressData } from '../../../data-factory/address.js';
import {
    registerUser,
    login,
    getUser,
    logout,
    deleteUser,
    createAddress
} from '../../../utils.js';

test.describe('PATCH /api/v1/user/addresses/:id', () => {
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
        'should update address',
        { tag: ['@smoke', '@positive', '@address'] },
        async ({ request }) => {
            // Create address
            const createAddressPayload = createRandomAddressData();
            createAddressPayload.isDefault = false;

            const createAddressResponse = await createAddress(
                request,
                createAddressPayload
            );
            const createAddressResponseBody = await createAddressResponse.json();
            const addressId = createAddressResponseBody.address._id;

            // Update address
            const updateAddressPayload = createRandomAddressData();
            updateAddressPayload.isDefault = true;
            const updateAddressResponse = await request.patch(
                `/api/v1/user/addresses/${addressId}`,
                {
                    data: updateAddressPayload
                }
            );

            expect(updateAddressResponse.ok()).toBeTruthy();
            const updateAddressResponseBody = await updateAddressResponse.json();
            expect(updateAddressResponseBody).toMatchObject({
                message: 'Address updated successfully',
                address: {
                    _id: expect.any(String),
                    country: updateAddressPayload.country,
                    firstName: updateAddressPayload.firstName,
                    lastName: updateAddressPayload.lastName,
                    company: updateAddressPayload.company,
                    streetAddress: updateAddressPayload.streetAddress,
                    apartment: updateAddressPayload.apartment,
                    city: updateAddressPayload.city,
                    state: '',
                    postalCode: updateAddressPayload.postalCode,
                    phone: updateAddressPayload.phone,
                    isDefault: true
                }
            });

            // Get user from db
            const getUserResponse = await getUser(request);
            expect(getUserResponse.ok()).toBeTruthy();
            const getUserResponseBody = await getUserResponse.json();

            // Verify that address is correctly recorded in db
            expect(getUserResponseBody.addresses[1]).toMatchObject({
                _id: expect.any(String),
                country: updateAddressPayload.country,
                firstName: updateAddressPayload.firstName,
                lastName: updateAddressPayload.lastName,
                company: updateAddressPayload.company,
                streetAddress: updateAddressPayload.streetAddress,
                apartment: updateAddressPayload.apartment,
                city: updateAddressPayload.city,
                state: '',
                postalCode: updateAddressPayload.postalCode,
                phone: updateAddressPayload.phone,
                isDefault: true
            });
            // Verify that other address 'isDefault' property updated to false
            expect(getUserResponseBody.addresses[0].isDefault).toBe(false);
        }
    );
});
