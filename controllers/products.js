import { createProduct } from '../services/productService.js';
import { CreateProductRequestDTO } from '../dtos/product/CreateProductRequestDTO.js';
import { CreateProductResponseDTO } from '../dtos/product/CreateProductResponseDTO.js';
import { getProductById } from '../services/productService.js';

export const createProductHandler = async (req, res) => {
    const file = req.file?.filename;
    let productImage;

    if (file) {
        productImage = `/assets/productImages/${req.file.filename}`;
    } else {
        return res.status(400).json({ error: 'productImage is not provided' });
    }
    console.log(productImage);
    const payload = req.body;

    try {
        const createProductDTO = new CreateProductRequestDTO(
            productImage,
            payload
        );

        const createdProduct = await createProduct(createProductDTO);
        const createProductResponseDTO = new CreateProductResponseDTO(
            createdProduct
        );
        res.status(201).json(createProductResponseDTO);
    } catch (error) {
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error.message);
    }
};

export const getProductByIdHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        if (error.message === 'Product not found.') {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error);
    }
};
