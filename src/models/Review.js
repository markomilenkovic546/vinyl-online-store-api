import { string } from 'joi';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comment: {
        type: string,
        required: true
    },
    rating: {
        type: number,
        required: true
    }

});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
