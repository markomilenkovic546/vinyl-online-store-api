import Country from '../models/Country.js';

export const seedCountries = async (payload) => {
    // Clear existing countries
    await Country.deleteMany({});

    // Insert the sample countries
    return await Country.insertMany(payload);
};

export const getCountries = async () => {
    const countries = await Country.find();
    return countries.map((country) => {
       return {
        value: country.name.toLowerCase(),
        label: country.name
       }
    })
};
