import { getCart, addToCart } from '../services/cartService.js';
import { GetCartResponseDTO } from '../dtos/cart/GetCartResponseDTO.js';
import { AddToCartRequestDTO } from '../dtos/cart/AddToCartRequestDTO.js';
import { AddToCartResponseDTO } from '../dtos/cart/AddToCartResponseDTO.js';

export const getCartHandler = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await getCart(userId);
        const getCartResponseDTO = new GetCartResponseDTO(cart);
        res.status(200).json(getCartResponseDTO);
    } catch (error) {
        if (error.message === 'Cart not found.') {
            return res.status(200).json({ message: 'Cart not found.' });
        }
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error);
    }
};

export const addToCartHandler = async (req, res) => {
    const addToCartRequestDTO = new AddToCartRequestDTO(req.user.id, req.body);
    try {
        const cart = await addToCart(addToCartRequestDTO);
        const addToCartResponseDTO = new AddToCartResponseDTO(cart)
        res.status(201).json(addToCartResponseDTO);
    } catch (error) {
        res.status(500).json({
            error: error
        });
        console.error(error);
    }
};
