export class RegisterRequestDTO {
    constructor(payload) {
        this.firstName = payload.firstName;
        this.lastName = payload.lastName;
        this.email = payload.email;
        this.password = payload.password;
    }
}
