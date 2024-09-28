export class LoginRequestDTO {
    constructor(payload) {
        this.email = payload.email;
        this.password = payload.password;
    }
}
