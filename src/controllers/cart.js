import { getCart } from '../services/cartService.js';
import { GetCartResponseDTO } from '../dtos/cart/GetCartResponseDTO.js';

export const getCartHandler = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await getCart(userId);
        const getCartResponseDTO = new GetCartResponseDTO(cart);
        res.status(200).json(getCartResponseDTO);
    } catch (error) {
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error)
    }
};
