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

export const addToCart = async (addToCartRequestDTO) => {
    const { userId, productId, quantity } = addToCartRequestDTO;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({
            userId,
            products: [{ productId, quantity }]
        });
        return await cart.save();
    }

    const productIndex = cart.products.findIndex((product) =>
        product.productId.equals(productId)
    );
    if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
        return await cart.save();
    } else {
        cart.products.push({ productId: productId, quantity: quantity });
        return await cart.save();
    }
};
