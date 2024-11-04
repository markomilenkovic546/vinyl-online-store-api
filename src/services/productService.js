import Product from '../models/Product.js';
import { getUserById } from './userService.js';

export const createProduct = async (createProductRequestDTO) => {
    const newProduct = new Product(createProductRequestDTO);
    // Save the product to the database
    const savedProduct = await newProduct.save();
    return savedProduct;
};

export const getProductById = async (id) => {
    // Fetch the product from the database by ID
    const product = await Product.findById(id).exec();
    if (!product) {
        throw new Error('Product not found.');
    }

    return product;
};

export const getProducts = async (req, res) => {
    const { artist, genre, decade, featured, inStock, sortBy, order, format } =
        req.query;

    // Build filter object
    const filter = {};
    if (artist) filter.artist = artist;
    if (decade) filter.decade = decade;
    if (genre) filter.genre = genre;
    if (format) filter.format = format;
    if (featured) filter.featured = featured === 'true';
    if (inStock) filter.inStock = inStock === 'true';
    // Build sort object
    const sort = {};
    if (sortBy) {
        sort[sortBy] = order === 'desc' ? -1 : 1;
    }
    // Fetch products from the database
    return await Product.find(filter).sort(sort);
};

