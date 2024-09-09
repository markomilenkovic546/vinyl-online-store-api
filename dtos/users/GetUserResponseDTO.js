export class GetUserResponseDTO {
    constructor(userObject) {
        this._id = userObject._id;
        this.firstName = userObject.firstName;
        this.lastName = userObject.lastName;
        this.email = userObject.email;
        this.profileImage = userObject.profileImage;
        this.favorites = userObject.favorites;
        this.orders = userObject.orders;
        this.cart = userObject.cart;
        this.createdAt = userObject.createdAt;
        this.updatedAt = userObject.updatedAt;
    }
}
