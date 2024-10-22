export class AddToCartResponseDTO {
    constructor(cartData) {
        this.status = 'success';
        this.message = 'Product added to cart successfully.';
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
