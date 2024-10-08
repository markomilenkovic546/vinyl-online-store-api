export class UpdateAddressResponseDTO {
    constructor(updatedAddress) {
        this.message = 'Address updated successfully';
        this.address = {
            _id: updatedAddress._id,
            country: updatedAddress.country,
            firstName: updatedAddress.firstName,
            lastName: updatedAddress.lastName,
            company: updatedAddress.company, 
            streetAddress: updatedAddress.streetAddress,
            apartment: updatedAddress.apartment, 
            city: updatedAddress.city,
            state: updatedAddress.state,
            postalCode: updatedAddress.postalCode,
            phone: updatedAddress.phone,
            isDefault: updatedAddress.isDefault 
        };
    }
}
