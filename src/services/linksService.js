import Product from '../models/Product.js';

export const getArtists = async (query) => {
    const { featured } = query;
    if (featured) {
        const featuredArtists = await Product.distinct('artist', { featured: true });
        return featuredArtists.sort().slice(0, 35);
    }
    const allArtists = await Product.distinct('artist');

    const groupedArtists = { '#': [] };
    allArtists.forEach((artist) => {
        // Get the first character of the artist's name
        const firstChar = artist.charAt(0).toUpperCase();

        // Check if the first character is a letter
        if (/^[A-Z]$/.test(firstChar)) {
            // If the letter doesn't exist as a property, initialize it as an array
            if (!groupedArtists[firstChar]) {
                groupedArtists[firstChar] = [];
            }
            // Push the artist to the corresponding array
            groupedArtists[firstChar].push(artist);
        } else {
            groupedArtists['#'].push(artist);
        }
    });

    return groupedArtists;
};

export const getCategories = async () => {
    const genres = await Product.distinct('genre');
    const decades = await Product.distinct('decade');
    const formats = await Product.distinct('format');

    return { genres: genres.sort(), decades: decades.sort(), formats: formats.sort() };
};
