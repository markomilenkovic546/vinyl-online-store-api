export class ChangePasswordRequestDTO {
    constructor(id, currentPassword, newPassword) {
        this.userId = id;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
}