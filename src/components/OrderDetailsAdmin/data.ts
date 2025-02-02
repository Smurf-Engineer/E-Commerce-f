/**
 * Admin-OrderDetailsAdmin Queries
 */

import gql from 'graphql-tag'

export const getOrderQuery = gql`
  query GetOrder($orderId: String!, $global: Boolean!) {
    orderQuery: getOrder(orderId: $orderId, global: $global) {
      id
      shortId: short_id
      charge_id
      netsuit_order_id
      paymentMethod: payment_method
      shippingFirstName: shipping_address_first_name
      shippingLastName: shipping_address_last_name
      shippingStreet: shipping_address_street
      shippingApartment: shipping_address_apartment
      shippingPhone: shipping_address_phone
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
          hideFitStyles: hide_fit_styles
          youthCombined: youth_combined
          weight
          mpn
          twoPieces: two_pieces
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
            info
            name: description
          }
          sizeRange: size_range {
            id
            name
            isYouth: is_youth
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
        salesRepName
        teamStoreName
        managerName
        designCode
        bibBraceColor
        flatlock
        preflightCheck
        flatlockCode
        zipperColor
        bindingColor
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
      email
      userId: user_id
      coupon: coupon_code
      user
    }
  }
`
