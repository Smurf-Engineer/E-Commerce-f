/**
 * Account-OrderDetails Queries
 */
import { graphql } from 'react-apollo'
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
      taxAmount: tax_amount
      shippingAmount: shipping_amount
      currency {
        shortName: short_name
      }
      lastDrop: last_drop
      orderDate: created_at
      estimatedDate: estimated_date
      netsuite: netsuit_order {
        orderStatus {
          internalId
          orderStatus
          fulfillments {
            packages
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
          mpn
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
          colors {
            id
            name
            image
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
          color {
            name
          }
          colorImage
          quantity
        }
        designId
        unitPrice
        productTotal
        designName
        designImage
        designCode
        teamStoreId
        teamStoreItem
        teamStoreName
      }
      status
      shippingAmount: shipping_amount
      proDesign: pro_design
      discount: discount_amount
      total: total_amount
      taxFee: tax
      taxPst: tax_pst
      taxGst: tax_gst
      taxVat: tax_vat
      teamStoreId: teamstore_id
      teamStoreName: teamstore_name
    }
  }
`

export const deleteOrderMutation = graphql(
  gql`
    mutation cancelOrder($orderId: String!) {
      cancelOrder(orderId: $orderId) {
        message
      }
    }
  `,
  {
    name: 'deleteOrder'
  }
)
