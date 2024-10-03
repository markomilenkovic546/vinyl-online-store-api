import { faker } from '@faker-js/faker';

export const createRandomUserData = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = `${firstName.toLowerCase()}@mailsac.com`;
    const password = faker.internet.password();
    const birthday = new Date(
        faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
    ).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    return {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        birthday: birthday
    };
};
