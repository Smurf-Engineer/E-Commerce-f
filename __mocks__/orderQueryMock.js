module.exports = {
  shortId: '',
  orderDate: '',
  estimatedDate: '',
  paymentMethod: '',
  shippingFirstName: '',
  shippingLastName: '',
  shippingStreet: '',
  shippingApartment: '',
  shippingCountry: '',
  shippingStateProvince: '',
  shippingCity: '',
  shippingZipCode: '',
  billingFirstName: '',
  billingLastName: '',
  billingStreet: '',
  billingApartment: '',
  billingCountry: '',
  billingStateProvince: '',
  billingCity: '',
  billingZipCode: '',
  shippingTax: 0,
  payment: {
    stripeCharge: {
      ibanData: {
        name: '',
        email: '',
        last4: ''
      },
      cardData: {
        name: '',
        last4: '',
        brand: '',
        expMonth: 0,
        expYear: 0
      }
    }
  },
  cart: [],
  status: '',
  currency: {
    id: 0,
    name: '',
    abbreviation: '',
    shortName: '',
    label: ''
  },
  taxAmount: 0,
  shippingAmount: 0,
  proDesign: true
}
