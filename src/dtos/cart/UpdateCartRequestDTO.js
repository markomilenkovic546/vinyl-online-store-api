export class UpdateCartRequestDTO {
    constructor(userId, payload) {
        this.userId = userId;
        this.productId = payload.productId;
        this.quantity = payload.quantity;
    }
}