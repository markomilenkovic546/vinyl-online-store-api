export class RegisterResponseDTO {
    constructor(savedUser) {
        this.message = 'User successfully registered.'
        this._id = savedUser._id
        this.firstName = savedUser.firstName;
        this.lastName = savedUser.lastName;
        this.email = savedUser.email;
    }
}