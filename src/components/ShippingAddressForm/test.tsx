/**
 * ShippingAddressForm Test - Created by miguelcanobbio on 15/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ShippingAddressForm } from './index'

describe('<ShippingAddressForm />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const client = {}
    const firstName = ''
    const lastName = ''
    const street = ''
    const apartment = ''
    const country = ''
    const stateProvince = ''
    const city = ''
    const zipCode = ''
    const phone = ''
    const hasError = false
    const action = (id: string, value: string) => {}
    const format = (message: any) => 'string'
    const data: any = {
      myTeamstores: {
        fullCount: 0,
        teamStores: []
      },
      fetchMore: () => {}
    }
    ReactDOM.render(
      <ShippingAddressForm
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
          client,
          data
        }}
        formatMessage={format}
        selectDropdownAction={action}
        inputChangeAction={action}
      />,
      div
    )
  })
})
