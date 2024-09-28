export class ChangePasswordResponseDTO {
    constructor(userObject) {
        this.message = 'Password successfully changed.'
        this._id = userObject._id;
        this.firstName = userObject.firstName;
        this.lastName = userObject.lastName;
        this.email = userObject.email;
        this.profileImage = userObject.profileImage;
        this.createdAt = userObject.createdAt;
        this.updatedAt = userObject.updatedAt;
    }
}
