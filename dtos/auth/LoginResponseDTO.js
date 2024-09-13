export class LoginResponseDTO {
    constructor(loggedInUser) {
        this._id = loggedInUser.user?._id
        this.firstName = loggedInUser.user?.firstName;
        this.lastName = loggedInUser.user?.lastName;
        this.email = loggedInUser.user?.email;
    }
}