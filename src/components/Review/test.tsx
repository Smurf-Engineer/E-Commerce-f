/**
 * Review Test - Created by miguelcanobbio on 18/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Review from './index'
import { AddressType } from '../../types/common'

describe('<Review />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: any) => 'string'
    const address: AddressType = {
      firstName: '',
      lastName: '',
      street: '',
      apartment: '',
      country: '',
      stateProvince: '',
      city: '',
      zipCode: '',
      phone: ''
    }
    ReactDOM.render(
      <Review
        formatMessage={format}
        billingAddress={address}
        shippingAddress={address}
      />,
      div
    )
  })
})
