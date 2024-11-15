export class CreateReviewResponseDTO {
    constructor(review) {
        this.message = 'Success';
        this.review = {
            userName: review.user.firstName,
            userImage: review.user.profileImage,
            comment: review.comment,
            rating: review.rating,
            createdAt: review.createdAt
        };
    }
}
