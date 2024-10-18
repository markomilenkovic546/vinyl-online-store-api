import { seedCountries, getCountries } from '../services/countriesService.js';

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
