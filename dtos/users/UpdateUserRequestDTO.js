export class UpdateUserRequestDTO {
    constructor(userId, firstName, lastName, email) {
        this.userId = userId
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
