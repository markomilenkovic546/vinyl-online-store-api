export class AddToCartRequestDTO {
    constructor(userId, payload) {
        this.userId = userId;
        this.productId = payload.productId;
        this.quantity = payload.quantity;
    }
}
