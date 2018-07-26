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
      payment_method
      shipping_address_first_name
      shipping_address_last_name
      shipping_address_street
      shipping_address_country
      shipping_address_state_province
      shipping_address_city
      shipping_address_zip_code
      billing_address_first_name
      billing_address_last_name
      billing_address_street
      billing_address_country
      billing_address_state_province
      billing_address_city
      billing_address_zip_code
      shippingTax: shipping_tax
      orderDate: created_at
      netsuit: netsuit_order {
        orderStatus {
          internalId
          orderDate
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
      cart {
        product {
          id
          name
          shortDescription: short_description
          images: pictures {
            front: front_image
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
