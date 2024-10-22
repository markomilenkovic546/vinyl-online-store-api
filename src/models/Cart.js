import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: { type: Number, required: true, default: 1 }
        }
    ]
});
cartSchema.path('products').schema.add({ _id: false });
const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
