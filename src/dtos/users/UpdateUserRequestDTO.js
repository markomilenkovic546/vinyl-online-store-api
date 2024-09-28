export class UpdateUserRequestDTO {
    constructor(id, payload) {
        this.id = id
        this.firstName = payload.firstName;
        this.lastName = payload.lastName;
        this.birthday = payload.birthday;
    }
}
