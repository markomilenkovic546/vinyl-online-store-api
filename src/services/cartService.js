import User from '../models/User.js';
import Cart from '../models/Cart.js';

export const getCart = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate('products.productId').exec();

    if (!cart) {
        throw new Error('Cart not found.');
    }

    const formattedCart = {
        id: cart._id,
        userId: cart.userId,
        products: cart.products.map((product) => ({
            id: product.productId._id,
            title: product.productId.title,
            artist: product.productId.artist,
            price: product.productId.price,
            productImage: product.productId.productImage,
            quantity: product.quantity
        })),
        subtotal: cart.products.reduce((sum, product) => {
            return sum + product.price * product.quantity;
        }, 0)
    };

    return formattedCart;
};
