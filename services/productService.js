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
