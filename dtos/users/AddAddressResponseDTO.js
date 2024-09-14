export class AddAddressResponseDTO {
    constructor(addedAddress) {
        this.message = 'Address added successfully';
        this.address = {
            country: addedAddress.country,
            firstName: addedAddress.firstName,
            lastName: addedAddress.lastName,
            company: addedAddress.company, 
            streetAddress: addedAddress.streetAddress,
            apartment: addedAddress.apartment, 
            city: addedAddress.city,
            state: addedAddress.state,
            postalCode: addedAddress.postalCode,
            phone: addedAddress.phone,
            isDefault: addedAddress.isDefault 
        };
    }
}
