import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const trackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    }
});

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        decade: {
            type: String,
            required: true
        },
        format: {
            type: String,
            required: true
        },
        productImage: {
            type: String,
            required: true,
            default: ''
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        featured: { type: Boolean, default: true },
        tracks: [trackSchema], // Array of tracks
        inStock: {
            type: Boolean,
            default: true
        },
        orderedCount: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review' // Refers to reviews from the Review collection
            }
        ]
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
