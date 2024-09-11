export class UpdateUserResponseDTO {
    constructor(user) {
        this.message = 'Profile updated successfully';
        this.user = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileImage: user.profileImage
        };
    }
}