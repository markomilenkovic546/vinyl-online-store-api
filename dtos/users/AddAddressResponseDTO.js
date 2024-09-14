export class AddAddressResponseDTO {
    constructor(addedAddress) {
        this.message = 'Address added successfully';
        this.address = {
            country: addedAddress.country,
            firstName: addedAddress.firstName,
            lastName: addedAddress.lastName,
            streetAddress: addedAddress.streetAddress,
            city: addedAddress.city,
            state: addedAddress.state,
            postalCode: addedAddress.postalCode
        };
    }
}
