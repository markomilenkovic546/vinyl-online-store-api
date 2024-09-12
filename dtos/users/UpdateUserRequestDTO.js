export class UpdateUserRequestDTO {
    constructor(userId, firstName, lastName, birthday) {
        this.userId = userId
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
    }
}
