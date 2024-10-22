import Product from '../models/Product.js';
import Cart from '../models/Cart.js';

export const getCart = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate('products.productId').exec();

    if (!cart) {
        throw new Error('Cart not found.');
    }

    const formattedCart = {
        id: cart._id,
        products: cart.products.map((product) => ({
            id: product.productId._id,
            title: product.productId.title,
            artist: product.productId.artist,
            quantity: product.quantity,
            pricePerUnit: product.productId.price,
            totalPrice: product.quantity * product.productId.price,
            productImage: product.productId.productImage
        })),
        subtotal: cart.products.reduce((sum, product) => {
            return sum + product.productId.price * product.quantity;
        }, 0)
    };

    return formattedCart;
};

export const addToCart = async (addToCartRequestDTO) => {
    const { userId, productId, quantity } = addToCartRequestDTO;
    const product = await Product.findById(productId).exec();
    let cart = await Cart.findOne({ userId });

    // Throw an error if productId is invalid
    if (!product) {
        throw new Error('There is no product with provided id.');
    }
    // Create a cart if doesn't exist, and add a product
    if (!cart) {
        cart = new Cart({
            userId,
            products: [{ productId, quantity }]
        });
        return await cart.save();
    }

    // Find does provided productId exists in the cart
    const productIndex = cart.products.findIndex((product) =>
        product.productId.equals(productId)
    );
    // Id product exist in the cart, update a quantity
    if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
        return await cart.save();
        // If product doesn't exist in the cart, add it
    } else {
        cart.products.push({ productId: productId, quantity: quantity });
        return await cart.save();
    }
};

export const updateCart = async (updateCartRequestDTO) => {
    const { userId, productId, quantity } = updateCartRequestDTO;
    const cart = await Cart.findOne({ userId });
    let updatedCart;
    if (!cart) {
        throw new Error('Cart not found.');
    }

    const productIndex = cart.products.findIndex((p) => p.productId.equals(productId));
    if (productIndex === -1) {
        throw new Error('There is no product in the cart with the provided id.');
    }
    if (quantity === 0) {
        updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { products: { productId } } },
            { new: true }
        ).exec();
        return updatedCart;
    } else {
        cart.products[productIndex].quantity = quantity;
        updatedCart = await cart.save();
        return updatedCart;
    }
};
