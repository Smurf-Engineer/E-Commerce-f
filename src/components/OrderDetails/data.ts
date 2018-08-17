/**
 * Account-OrderDetails Queries
 */

import gql from 'graphql-tag'

export const getOrderQuery = gql`
  query GetOrder($orderId: String!) {
    orderQuery: getOrder(orderId: $orderId) {
      id
      shortId: short_id
      charge_id
      netsuit_order_id
      paymentMethod: payment_method
      shippingFirstName: shipping_address_first_name
      shippingLastName: shipping_address_last_name
      shippingStreet: shipping_address_street
      shippingApartment: shipping_address_apartment
      shippingCountry: shipping_address_country
      shippingStateProvince: shipping_address_state_province
      shippingCity: shipping_address_city
      shippingZipCode: shipping_address_zip_code
      billingFirstName: billing_address_first_name
      billingLastName: billing_address_last_name
      billingStreet: billing_address_street
      billingApartment: billing_address_apartment
      billingCountry: billing_address_country
      billingStateProvince: billing_address_state_province
      billingCity: billing_address_city
      billingZipCode: billing_address_zip_code
      shippingTax: shipping_tax
      currency {
        shortName: short_name
      }
      orderDate: created_at
      netsuit: netsuit_order {
        orderStatus {
          internalId
          deliveryDate: orderDate
          orderStatus
          fulfillments {
            date
            status
            packages
            items {
              itemId
              designNumber
              quantity
            }
          }
        }
      }
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
        product {
          id
          code
          yotpoId: yotpo_id
          name
          type: name
          shortDescription: short_description
          collections
          isTopProduct
          weight
          priceRange {
            quantity
            price
            abbreviation
            shortName: short_name
          }
          genders {
            id
            name: gender
          }
          fitStyles {
            id
            name: description
          }
          sizeRange: size_range {
            id
            name
          }
          images: pictures {
            front: front_image
            back: back_image
            left: left_image
            right: right_image
          }
        }
        itemDetails {
          label
          gender {
            name
          }
          size {
            name
          }
          fit {
            name
          }
          quantity
        }
        designId
        unitPrice
        productTotal
        designName
        designImage
      }
      status
    }
  }
`
