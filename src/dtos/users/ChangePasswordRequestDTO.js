export class ChangePasswordRequestDTO {
    constructor(id, payload) {
        this.userId = id;
        this.currentPassword = payload.currentPassword;
        this.newPassword = payload.newPassword;
    }
}