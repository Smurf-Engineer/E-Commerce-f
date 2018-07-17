/**
 * Shippping Test - Created by cazarez on 07/05/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Shippping } from './index'
import { AddressType } from '../../types/common'

describe('<Shippping />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const shippingAddress: AddressType = {
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
    const hasError = false
    const showForm = false
    const indexAddressSelected = -1
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
    const setSelectedAddress = (address: AddressType, index: number) => {}
    const showContent = true
    const buttonToRender: React.ReactNode = <div />
    void ReactDOM.render(
      <Shippping
        formatMessage={format}
        {...{
          showContent,
          shippingAddress,
          hasError,
          showForm,
          selectDropdownAction,
          inputChangeAction,
          smsCheckAction,
          emailCheckAction,
          showAddressFormAction,
          setSelectedAddress,
          indexAddressSelected,
          data,
          buttonToRender
        }}
      />,
      div
    )
  })
})
