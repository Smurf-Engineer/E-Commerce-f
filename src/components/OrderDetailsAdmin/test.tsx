/**
 * OrderDetails Test - Created by jorge on 23/07/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { OrderDetailsAdmin } from './index'

describe('<OrderDetailsAdmin />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const data = {
      orderQuery: {
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
      },
      fetchMore: () => {}
    }
    ReactDOM.render(
      <IntlProvider locale="en">
        <OrderDetailsAdmin
          onReturn={() => {}}
          formatMessage={() => ''}
          orderId="rkB_7fgV7"
          {...{ data }}
          from={''}
          currentCurrency={''}
        />
      </IntlProvider>,
      div
    )
  })
})
