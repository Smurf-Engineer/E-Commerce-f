/**
 * Admin-ServiceOrderDetailsAdmin Queries
 */

import gql from 'graphql-tag'

export const getOrderQuery = gql`
  query GetOrder($orderId: String!) {
    orderQuery: getServiceOrder(orderId: $orderId) {
      id
      shortId: short_id
      charge_id
      taxFee: tax_fee
      taxGst: tax_gst
      taxPst: tax_pst
      paymentMethod: payment_method
      billingFirstName: billing_address_first_name
      billingLastName: billing_address_last_name
      billingStreet: billing_address_street
      billingApartment: billing_address_apartment
      billingCountry: billing_address_country
      billingStateProvince: billing_address_state_province
      billingCity: billing_address_city
      billingZipCode: billing_address_zip_code
      currency {
        shortName: short_name
      }
      orderDate: created_at
      payment: payment_object {
        stripeCharge {
          cardData: source {
            name
            last4
            brand
            expMonth: exp_month
            expYear: exp_year
          }
        }
        paypalCharge {
          id
        }
      }
      cart {
        name
        price
        designImage: design_image
        designName: design_name
        designId: design_id
        designCode: design_code
      }
      status
      email
      user
      author {
        shortId: short_id
      }
    }
  }
`