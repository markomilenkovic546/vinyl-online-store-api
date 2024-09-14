export class AddAddressRequestDTO {
    constructor({
        country,
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        postalCode
    }) {
        this.country = country;
        this.firstName = firstName;
        this.lastName = lastName;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
    }
}
