export class CreateProductRequestDTO {
    constructor(
        title,
        artist,
        genre,
        decade,
        format,
        description,
        price,
        featured,
        tracks,
        inStock,
        productImage
    ) {
        this.title = title;
        this.artist = artist;
        this.genre = genre;
        this.decade = decade;
        this.format = format;
        this.description = description;
        this.price = price;
        this.featured = featured;
        this.tracks = tracks;
        this.inStock = inStock;
        this.productImage = productImage;
    }
}
