export class CreateReviewRequestDTO {
    constructor(payload, userId) {
        this.userId = userId;
        this.productId = payload.productId;
        this.comment = payload.comment;
        this.rating = payload.rating;
    }
}
