export class CreateProductResponseDTO {
    constructor(createdProduct) {
        this.title = createdProduct.title;
        this.artist = createdProduct.artist;
        this.genre = createdProduct.genre;
        this.decade = createdProduct.decade;
        this.format = createdProduct.format;
        this.description = createdProduct.description;
        this.productImage = createdProduct.productImage;
        this.price = Number(createdProduct.price);
        this.featured = createdProduct.featured;
        this.tracks = createdProduct.tracks;
        this.inStock = createdProduct.inStock;
        this.createdAt = createdProduct.createdAt
        this.updatedAt = createdProduct.updatedAt
        
    }
}
