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
        };
    });
};

export const getSingleCountry = async (countryName) => {
    if (!countryName) {
        throw new Error('countryName param is missing.');
    }
    const country = await Country.findOne({ name: countryName });

    if (!country) {
        throw new Error('Country is not found.');
    }
    return {
        country: country.name,
        states: country.states.map((state) => {
            return {
                value: state.toLowerCase(),
                label: state
            };
        })
    };
};
