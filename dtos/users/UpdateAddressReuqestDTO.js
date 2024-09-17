export class UpdateAddressRequestDTO {
    constructor(id, payload) {
        this.id = id;
        this.country = payload.country;
        this.firstName = payload.firstName;
        this.lastName = payload.lastName;
        this.company = payload.company || '' ;
        this.streetAddress = payload.streetAddress;
        this.apartment = payload.apartment || '' ;
        this.city = payload.city;
        this.state = payload.state || '';
        this.postalCode = payload.postalCode;
        this.phone = payload.phone || '' ;
        this.isDefault = payload.isDefault
    }
}