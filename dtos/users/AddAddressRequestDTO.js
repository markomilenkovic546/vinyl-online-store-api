export class AddAddressRequestDTO {
    constructor(
        country,
        firstName,
        lastName,
        company,
        streetAddress,
        apartment,
        city,
        state,
        postalCode,
        phone,
        isDefault
    ) {
        this.country = country;
        this.firstName = firstName;
        this.lastName = lastName;
        this.company = company || '' ;
        this.streetAddress = streetAddress;
        this.apartment = apartment || '' ;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.phone = phone || '' ;
        this.isDefault = isDefault
    }
}
