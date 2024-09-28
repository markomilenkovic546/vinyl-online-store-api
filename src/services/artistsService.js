import Product from '../models/Product.js';

export const getArtists = async () => {
    return await Product.distinct("artist");
   
}