import { getArtists, getCategories } from "../services/linksService.js";

export const getArtistsHandler = async (req, res) => {
    try {
        const artists = await getArtists(req.query);
        res.status(200).json({ artists: artists });
    } catch (error) {
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error);
    }
};

export const getCategoriesHandler = async (req, res) => {
    try {
        const categories = await getCategories();
        res.status(200).json({ categories: categories });
    } catch (error) {
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error);
    }
};