import gql from 'graphql-tag'

export const getOrderQuery = gql`
  query getOrderById($orderId: String!) {
    orderData: getOrder(orderId: $orderId) {
      id
      orderDate: created_at
      paymentMethod: payment_method
      firstName: shipping_address_first_name
      lastName: shipping_address_last_name
      apartment: shipping_address_apartment
      street: shipping_address_street
      city: shipping_address_city
      stateProvince: shipping_address_state_province
      zipCode: shipping_address_zip_code
      country: shipping_address_country
      billingFirstName: billing_address_first_name
      billingLastName: billing_address_last_name
      billingApartment: billing_address_apartment
      billingStreet: billing_address_street
      billingCity: billing_address_city
      billingStateProvince: billing_address_state_province
      billingZipCode: billing_address_zip_code
      billingCountry: billing_address_country
      payment: payment_object {
        cardData: source {
          name
          last4
          brand
          exp_month
          exp_year
        }
      }
      cart {
        product {
          name
          shortDescription: short_description
          images: pictures {
            front: front_image
          }
        }
        itemDetails {
          label
          quantity
          gender {
            name
          }
          size {
            name
          }
          fit {
            name
          }
        }
        designId
        designName
        designImage
        unitPrice
        productTotal
      }
    }
  }
`
