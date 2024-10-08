import { faker } from '@faker-js/faker';

export const createRandomAddressData = () => {
    const country = faker.location.country();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const company = faker.company.name();
    const streetAddress = faker.location.streetAddress();
    const apartment = `Apt ${faker.string.numeric(2)}`;
    const city = faker.location.city();
    const postalCode = faker.location.zipCode();
    const phone = faker.phone.number();

    return {
        country,
        firstName,
        lastName,
        company,
        streetAddress,
        apartment,
        city,
        postalCode,
        phone
    };
};
