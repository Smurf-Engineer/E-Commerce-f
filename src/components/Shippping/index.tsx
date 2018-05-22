/**
 * Shippping Component - Created by cazarez on 07/05/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import AnimateHeight from 'react-animate-height'
import messages from './messages'
import { GetAddressListQuery } from './data'
import {
  Container,
  Title,
  ShippingMethodContainer,
  ShippinPriorityText,
  StyledCheckbox
} from './styledComponents'

import MyAddresses from '../MyAddressesList'
import ShippingAddressForm from '../ShippingAddressForm'

import { QueryProps, AddressType } from '../../types/common'
import { ClickParam } from 'antd/lib/menu'

interface Data extends QueryProps {
  userAddresses: AddressType[]
}

interface Props {
  data: Data
  firstName: string
  lastName: string
  street: string
  apartment: string
  country: string
  stateProvince: string
  city: string
  zipCode: string
  phone: string
  hasError: boolean
  showForm: boolean
  indexAddressSelected: number
  formatMessage: (messageDescriptor: any) => string
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
  smsCheckAction: (checked: boolean) => void
  emailCheckAction: (checked: boolean) => void
  showAddressFormAction: (show: boolean) => void
  setSelectedAddress: (address: AddressType, indexAddress: number) => void
}

export class Shippping extends React.PureComponent<Props, {}> {
  render() {
    const {
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
      formatMessage,
      showAddressFormAction,
      showForm,
      selectDropdownAction,
      inputChangeAction,
      data: { loading, userAddresses },
      indexAddressSelected
    } = this.props

    if (loading) {
      return null
    }

    const shippingMethod = (
      <ShippingMethodContainer>
        <Title>{'Shipping Method'}</Title>
        <ShippinPriorityText>
          {
            '$27.94 - FedEx International Priority® *All orders are shipped within 2 weeks'
          }
        </ShippinPriorityText>
        <div>
          <StyledCheckbox onChange={this.handleEmailCheck}>
            {'Send me Shipment updates via email'}
          </StyledCheckbox>
        </div>
        <div>
          <StyledCheckbox onChange={this.handleSmsCheck}>
            {'Send me Shipment updates via SMS'}
          </StyledCheckbox>
        </div>
      </ShippingMethodContainer>
    )

    return (
      <Container>
        <MyAddresses
          formatMessage={formatMessage}
          items={userAddresses}
          selectAddressAction={this.handleOnSelectAddress}
          {...{ showAddressFormAction, showForm, indexAddressSelected }}
        />
        <AnimateHeight
          duration={500}
          height={
            (userAddresses && userAddresses.length === 0) || showForm
              ? 'auto'
              : 0
          }
        >
          <Title>{formatMessage(messages.title)}</Title>
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
              selectDropdownAction,
              inputChangeAction
            }}
          />
        </AnimateHeight>
        {shippingMethod}
      </Container>
    )
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { inputChangeAction } = this.props
    const {
      currentTarget: { id, value }
    } = evt

    const regex = /^[0-9]+$/
    const isNumber = regex.test(value)

    if (value && (id === 'zipCode' || id === 'phone') && !isNumber) {
      return
    }
    inputChangeAction(id, value)
  }

  selectedDropDown = (param: ClickParam) => {
    const { selectDropdownAction } = this.props
    const {
      key,
      item: {
        props: { id }
      }
    } = param
    selectDropdownAction(id, key)
  }

  handleSmsCheck = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { smsCheckAction } = this.props
    const {
      target: { checked }
    } = evt

    smsCheckAction(checked)
  }

  handleEmailCheck = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { emailCheckAction } = this.props
    const {
      target: { checked }
    } = evt

    emailCheckAction(checked)
  }

  handleOnSelectAddress = (index: number) => {
    const {
      setSelectedAddress,
      data: { userAddresses }
    } = this.props
    const address = userAddresses[index]
    setSelectedAddress(address, index)
  }
}

const ShippingEnhaced = compose(
  graphql(GetAddressListQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  })
)(Shippping)
export default ShippingEnhaced
