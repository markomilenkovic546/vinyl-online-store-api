import Product from '../models/Product.js';

export const createProduct = async ( createProductRequestDTO) => {
    const newProduct = new Product(createProductRequestDTO);
    // Save the product to the database
    const savedProduct = await newProduct.save();
    return savedProduct
}