import {
    seedCountries,
    getCountries,
    getSingleCountry
} from '../services/countriesService.js';

export const seedCountriesHandler = async (req, res) => {
    try {
        const payload = req.body;
        await seedCountries(payload);
        res.status(201).json({ message: 'Countries seeded successfully' });
    } catch (error) {
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error.message);
    }
};

export const getCountriesHandler = async (req, res) => {
    try {
        const countries = await getCountries();
        res.status(200).json({ countries: countries });
    } catch (error) {
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error.message);
    }
};

export const getSingleCountryHandler = async (req, res) => {
    const countryName = req.params.name;
    try {
        const country = await getSingleCountry(countryName);
        res.status(200).json(country);
    } catch (error) {
        if (error.message === 'countryName param is missing.') {
            return res.status(400).json({ error: 'countryName param is missing.' });
        }

        if (error.message === 'Country is not found.') {
            return res.status(404).json({ error: 'Country is not found.' });
        }

        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error.message);
    }
};
