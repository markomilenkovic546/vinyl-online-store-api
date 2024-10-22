import { getCart, addToCart, updateCart } from '../services/cartService.js';
import { GetCartResponseDTO } from '../dtos/cart/GetCartResponseDTO.js';
import { AddToCartRequestDTO } from '../dtos/cart/AddToCartRequestDTO.js';
import { AddToCartResponseDTO } from '../dtos/cart/AddToCartResponseDTO.js';
import { UpdateCartRequestDTO } from '../dtos/cart/UpdateCartRequestDTO.js';
import { UpdateCartResponseDTO } from '../dtos/cart/UpdateCartResponseDTO.js';

export const getCartHandler = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await getCart(userId);
        const getCartResponseDTO = new GetCartResponseDTO(cart);
        res.status(200).json(getCartResponseDTO);
    } catch (error) {
        if (error.message === 'Cart not found.') {
            return res.status(200).json({
                cart: {
                    id: null,
                    products: [],
                    subtotal: 0
                }
            });
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
        const addToCartResponseDTO = new AddToCartResponseDTO(cart);
        res.status(201).json(addToCartResponseDTO);
    } catch (error) {
        if (error.message === 'There is no product with provided id.') {
            return res
                .status(404)
                .json({ error: 'There is no product with provided id.' });
        }
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error);
    }
};

export const updateCartHandler = async (req, res) => {
    const updateCartRequestDTO = new UpdateCartRequestDTO(req.user.id, req.body);
    try {
        const updatedCart = await updateCart(updateCartRequestDTO);
        const updateCartResponseDTO = new UpdateCartResponseDTO(updatedCart);
        res.status(200).json(updateCartResponseDTO);
    } catch (error) {
        if (error.message === 'Cart not found.') {
            return res.status(404).json({ error: 'Cart not found.' });
        }
        if (error.message === 'There is no product in the cart with the provided id.') {
            return res.status(404).json({
                error: 'There is no product in the cart with the provided id.'
            });
        }
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error);
    }
};
