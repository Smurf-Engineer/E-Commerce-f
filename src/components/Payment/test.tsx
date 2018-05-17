/**
 * Payment Test - Created by miguelcanobbio on 16/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Payment from './index'

describe('<Payment />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const format = (message: any) => 'string'
    const firstName = ''
    const lastName = ''
    const street = ''
    const apartment = ''
    const country = ''
    const stateProvince = ''
    const city = ''
    const zipCode = ''
    const phone = ''
    const cardHolderName = ''
    const hasError = false
    const sameBillingAndShipping = false
    const action = (id: string, value: string) => {}
    const sameBillingAndAddressCheckedAction = () => {}
    const sameBillingAndAddressUncheckedAction = () => {}
    ReactDOM.render(
      <Payment
        {...{
          firstName,
          lastName,
          street,
          apartment,
          country,
          stateProvince,
          city,
          zipCode,
          phone,
          hasError,
          cardHolderName,
          sameBillingAndShipping,
          sameBillingAndAddressCheckedAction,
          sameBillingAndAddressUncheckedAction
        }}
        selectDropdownAction={action}
        inputChangeAction={action}
        formatMessage={format}
      />,
      div
    )
  })
})
