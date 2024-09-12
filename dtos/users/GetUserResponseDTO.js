export class GetUserResponseDTO {
    constructor(userObject) {
        this._id = userObject._id;
        this.firstName = userObject.firstName;
        this.lastName = userObject.lastName;
        this.email = userObject.email;
        this.profileImage = userObject.profileImage;
        this.birthday = userObject.birthday;
        this.recordsCollection = userObject.recordsCollection
        this.loyaltyPoints = userObject.loyaltyPoints
        this.createdAt = userObject.createdAt;
        this.updatedAt = userObject.updatedAt;
    }
}
