export class GetCartResponseDTO {
    constructor(formattedCart) {
        this.userId = formattedCart.userId;
        this.cart = {
            id: formattedCart.id,
            products: formattedCart.products,
            subtotal: formattedCart.subtotal
        };
    }
}
