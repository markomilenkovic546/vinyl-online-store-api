import { createProduct } from '../services/productService.js';
import { CreateProductRequestDTO } from '../dtos/product/CreateProductRequestDTO.js';
import { CreateProductResponseDTO } from '../dtos/product/CreateProductResponseDTO.js';
import { getProductById } from '../services/productService.js';

export const createProductHandler = async (req, res) => {
    const fileName = req.file?.filename;
    let productImage;
    if (fileName) {
        productImage = `/assets/productImages/${req.file.filename}`;
    } else {
        return res.status(400).json({ error: 'productImage is not provided' });
    }
    const {
        title,
        artist,
        genre,
        decade,
        format,
        description,
        price,
        featured,
        tracks: tracksString,
        inStock
    } = req.body;

    let tracks;
    try {
        tracks = JSON.parse(tracksString);
    } catch (error) {
        return res
            .status(400)
            .json({ error: 'Tracks must be a valid JSON array.' });
    }
    // Input validation: check required fields
    if (
        !title ||
        !artist ||
        !genre ||
        !decade ||
        !format ||
        !description ||
        !price
    ) {
        return res
            .status(400)
            .json({ error: 'All required inputs must be provided.' });
    }

    if (typeof price <= 0) {
        return res
            .status(400)
            .json({ error: 'Price must be a positive number.' });
    }

    if (!Array.isArray(tracks) || tracks.length === 0) {
        return res.status(400).json({
            error: 'Tracks must be an array with at least one track.'
        });
    }

    // Validate each track object
    for (const track of tracks) {
        if (!track.title || !track.length) {
            return res
                .status(400)
                .json({ error: 'Each track must have a title and length.' });
        }
    }

    try {
        const createProductDTO = new CreateProductRequestDTO(
            title,
            artist,
            genre,
            decade,
            format,
            description,
            price,
            featured,
            tracks,
            inStock,
            productImage
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
