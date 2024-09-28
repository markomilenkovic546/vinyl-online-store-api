export class CreateProductRequestDTO {
    constructor(productImage, payload) {
        this.productImage = productImage;
        this.title = payload.title;
        this.artist = payload.artist;
        this.genre = payload.genre;
        this.decade = payload.decade;
        this.format = payload.format;
        this.description = payload.description;
        this.price = payload.price;
        this.featured = payload.featured;
        this.tracks = payload.tracks;
        this.inStock = payload.inStock;
    }
}
