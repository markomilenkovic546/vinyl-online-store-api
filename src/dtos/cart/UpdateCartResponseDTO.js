export class UpdateCartResponseDTO {
    constructor(cartData) {
        this.status = 'success';
        this.message = 'Cart updated successfully.';
        this.cart = {
            id: cartData._id,
            products: cartData.products.map((product) => {
                return {
                    productId: product.productId,
                    quantity: product.quantity
                };
            })
        };
    }
}
