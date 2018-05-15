/**
 * Shippping Test - Created by cazarez on 07/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Shippping } from './index'

describe('<Shippping />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const firstName = ''
    const lastName = ''
    const street = ''
    const apartment = ''
    const country = ''
    const state = ''
    const city = ''
    const zipCode = ''
    const phone = ''
    const hasError = false
    const showForm = false
    const data = {
      userAddresses: [],
      fetchMore: () => {}
    }
    const format = (message: any) => ''
    const selectDropdownAction = (id: string, value: string) => {}
    const inputChangeAction = (id: string, value: string) => {}
    const smsCheckAction = (checked: boolean) => {}
    const emailCheckAction = (checked: boolean) => {}
    const showAddressFormAction = (show: boolean) => {}
    void ReactDOM.render(
      <Shippping
        formatMessage={format}
        {...{
          firstName,
          lastName,
          street,
          apartment,
          country,
          state,
          city,
          zipCode,
          phone,
          hasError,
          showForm,
          selectDropdownAction,
          inputChangeAction,
          smsCheckAction,
          emailCheckAction,
          showAddressFormAction,
          data
        }}
      />,
      div
    )
  })
})
