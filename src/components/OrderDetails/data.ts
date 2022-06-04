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
      userId: user_id
      deliveredDate: delivered_date
      referenceNumber: reference_number
      resellerComission:reseller_comission
      resellerInline: reseller_inline
      resellerMargin: reseller_margin
      cutoffDate: cutoff_date
      paymentMethod: payment_method
      invoiceTerms: invoice_terms
      fixedPriceStore: fixed_price_store
      shippingFirstName: shipping_address_first_name
      shippingPhone: shipping_address_phone
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
      invoiceLink: invoice_link
      shippingAmount: shipping_amount
      currency {
        shortName: short_name
      }
      lastDrop: last_drop
      orderDate: created_at
      estimatedDate: estimated_date
      placedAuthor: placed_author {
        firstName: first_name
        lastName: last_name
      }
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
          active
          onlyProDesign: only_pro_design
          type: name
          shortDescription: short_description
          collections
          isTopProduct
          weight
          mpn
          hideFitStyles: hide_fit_styles
          youthCombined: youth_combined
          twoPieces: two_pieces
          upgradeOne: upgrade_one {
            id
            shortId: short_id
            enabled
            name
            url
            defaultOption: default_option
            modalImage: modal_image
            mobileImage: mobile_image
            options {
              aud
              id
              cad
              shortId: short_id
              gbp
              name
              usd
              eur
            }
          }
          upgradeTwo: upgrade_two {
            id
            shortId: short_id
            enabled
            name
            url
            defaultOption: default_option
            modalImage: modal_image
            mobileImage: mobile_image
            options {
              aud
              id
              cad
              shortId: short_id
              gbp
              name
              usd
              eur
            }
          }
          upgradeThree: upgrade_three {
            id
            shortId: short_id
            enabled
            name
            url
            defaultOption: default_option
            modalImage: modal_image
            mobileImage: mobile_image
            options {
              aud
              id
              cad
              shortId: short_id
              gbp
              name
              usd
              eur
            }
          }
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
          variableOneValue
          variableTwoValue
          upgradeOne
          upgradeTwo
          upgradeThree
          upgradeOnePrice
          upgradeTwoPrice
          upgradeThreePrice
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
          topSize {
            name
          }
          bottomSize {
            name
          }
          colorImage
          quantity
        }
        designId
        designOwner
        unitPrice
        variableOne
        oneLength
        variableOneCaps
        variableTwo
        twoLength
        variableTwoCaps
        productTotal
        designName
        designImage
        proCertified
        proDesign
        designCode
        teamStoreId
        teamStoreItem
        isReseller
        teamStoreName
        teamPrice {
          abbreviation
          shortName: short_name
          quantity
          price
        }
      }
      status
      owner
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
      canUpdatePayment
      onDemand: on_demand_mode
      email
      coupon: coupon_code
      couponType: coupon_type
      freeShipping: free_shipping
    }
  }
`

export const deleteOrderMutation = graphql(
  gql`
    mutation cancelOrder($orderId: String!, $adminUser: String) {
      cancelOrder(orderId: $orderId, adminUser: $adminUser) {
        message
      }
    }
  `,
  {
    name: 'deleteOrder'
  }
)

export const saveDeliveryMutation = graphql(
  gql`
    mutation saveDeliveryOrder($orderId: String!, $isDeliver: Boolean, $date: String) {
      saveDeliveryOrder(orderId: $orderId, isDeliver: $isDeliver, date: $date) {
        message
      }
    }
  `,
  {
    name: 'saveDeliverDate'
  }
)
