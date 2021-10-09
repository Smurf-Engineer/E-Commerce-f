import gql from 'graphql-tag'

export const getOrderQuery = gql`
  query getOrderById($orderId: String!) {
    orderData: getOrder(orderId: $orderId) {
      id
      status
      orderDate: created_at
      estimatedDate: estimated_date
      paymentMethod: payment_method
      invoiceTerms: invoice_terms
      firstName: shipping_address_first_name
      lastName: shipping_address_last_name
      apartment: shipping_address_apartment
      street: shipping_address_street
      city: shipping_address_city
      phone: shipping_address_phone
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
      netsuite: netsuit_order {
        orderStatus {
          internalId
          orderStatus
          fulfillments {
            packages
          }
        }
      }
      shippingTax: shipping_tax
      currency {
        shortName: short_name
      }
      payment: payment_object {
        paypalCharge {
          id
        }
        stripeCharge {
          cardData: source {
            name
            last4
            brand
            expMonth: exp_month
            expYear: exp_year
          }
        }
      }
      cart {
        product {
          mpn
          name
          shortDescription: short_description
          twoPieces: two_pieces
          images: pictures {
            front: front_image
          }
          priceRange {
            quantity
            price
            abbreviation
            shortName: short_name
          }
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
        }
        itemDetails {
          label
          quantity
          variableOneValue
          variableTwoValue
          upgradeOne
          upgradeTwo
          upgradeOnePrice
          upgradeTwoPrice
          gender {
            name
          }
          size {
            name
          }
          fit {
            name
          }
          topSize {
            name
          }
          bottomSize {
            name
          }
          colorImage
        }
        designId
        designName
        designImage
        variableOne
        variableTwo
        designCode
        unitPrice
        isReseller
        teamStoreName
        productTotal
        teamStoreId
      }
      preorder
      shippingAmount: shipping_amount
      proDesign: pro_design
      discount: discount_amount
      total: total_amount
      taxFee: tax
      taxPst: tax_pst
      taxGst: tax_gst
      taxVat: tax_vat
      confirmed: payment_confirmed
      teamStoreId: teamstore_id
      lastDrop: last_drop
      teamStoreName: teamstore_name
      coupon: coupon_code
    }
  }
`
