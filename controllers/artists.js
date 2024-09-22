import { getArtists } from "../services/artistsService.js";

export const getArtistsHandler = async(req , res) => {
    try {
        const artists = await getArtists()
        res.status(200).json(artists)
    } catch (error) {
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error);
    } 
    }