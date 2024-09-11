export class GetUserResponseDTO {
    constructor(userObject) {
        this._id = userObject._id;
        this.firstName = userObject.firstName;
        this.lastName = userObject.lastName;
        this.email = userObject.email;
        this.profileImage = userObject.profileImage;
        this.favorites = userObject.favorites;
        this.createdAt = userObject.createdAt;
        this.updatedAt = userObject.updatedAt;
    }
}
