/**
 * ShippingAddressForm Component - Created by miguelcanobbio on 15/05/18.
 */
import * as React from 'react'
import Dropdown from 'antd/lib/dropdown'
import Icon from 'antd/lib/icon'
import Menu from 'antd/lib/menu'
import messages from './messages'
import {
  ShippingFormContainer,
  Row,
  Column,
  StyledInput,
  RequiredSpan,
  Label,
  InputTitleContainer,
  DropDownPlaceHolder,
  ErrorMsg,
  ShipTopPoAPO
} from './styledComponents'
import { ClickParam } from '../../types/common'

interface Props {
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
  formatMessage: (messageDescriptor: any) => string
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
}

class ShippingAddressForm extends React.Component<Props, {}> {
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
      formatMessage
    } = this.props
    const dropdownCountries = (
      <Menu onClick={this.selectedDropDown}>
        <Menu.Item id="country" class="country" key="usa">
          {'USA'}
        </Menu.Item>
        <Menu.Item id="country" key="canada">
          {'CANADA'}
        </Menu.Item>
        <Menu.Item id="country" key="france">
          {'FRANCE'}
        </Menu.Item>
      </Menu>
    )
    const dropdownStates = (
      <Menu onClick={this.selectedDropDown}>
        <Menu.Item id="stateProvince" key="california">
          {'California'}
        </Menu.Item>
        <Menu.Item id="stateProvince" key="quebec">
          {'Quebec'}
        </Menu.Item>
        <Menu.Item id="stateProvince" key="arizona">
          {'Arizona'}
        </Menu.Item>
      </Menu>
    )
    const dropdownCities = (
      <Menu id="cities" onClick={this.selectedDropDown}>
        <Menu.Item id="city" key="los angeles">
          {'Los Angeles'}
        </Menu.Item>
        <Menu.Item id="city" key="san francisco">
          {'San Francisco'}
        </Menu.Item>
        <Menu.Item id="city" key="detroit">
          {'Detroit'}
        </Menu.Item>
      </Menu>
    )
    return (
      <ShippingFormContainer>
        <Row>
          <Column inputhWidth={'49%'}>
            <InputTitleContainer>
              <Label>{formatMessage(messages.firstNameLabel)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="firstName"
              value={firstName}
              onChange={this.handleInputChange}
              maxLength="50"
            />
            {!firstName &&
              hasError && (
                <ErrorMsg>{formatMessage(messages.requiredLabel)}</ErrorMsg>
              )}
          </Column>
          <Column inputhWidth={'49%'}>
            <InputTitleContainer>
              <Label>{formatMessage(messages.lastNameLabel)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="lastName"
              value={lastName}
              onChange={this.handleInputChange}
              maxLength="50"
            />
            {!lastName &&
              hasError && (
                <ErrorMsg>{formatMessage(messages.requiredLabel)}</ErrorMsg>
              )}
          </Column>
        </Row>
        <Row>
          <Column inputhWidth={'100%'}>
            <InputTitleContainer>
              <Label>{formatMessage(messages.addressNameLabel)}</Label>
              <RequiredSpan>*</RequiredSpan>
              <ShipTopPoAPO>
                {formatMessage(messages.shipTopPoApoLabel)}
              </ShipTopPoAPO>
            </InputTitleContainer>
            <StyledInput
              id="street"
              placeholder={formatMessage(messages.streetAddressLabel)}
              value={street}
              onChange={this.handleInputChange}
            />
            {!street &&
              hasError && (
                <ErrorMsg>{formatMessage(messages.requiredLabel)}</ErrorMsg>
              )}
            <StyledInput
              id="apartment"
              placeholder={formatMessage(messages.apartmentSuiteLabel)}
              value={apartment}
              onChange={this.handleInputChange}
            />
          </Column>
        </Row>
        <Row>
          <Column inputhWidth={'32%'}>
            <InputTitleContainer>
              <Label>{formatMessage(messages.countryLabel)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <Dropdown overlay={dropdownCountries}>
              <DropDownPlaceHolder>
                {country ? country : formatMessage(messages.selectCountryLabel)}
                <Icon type="down" />
              </DropDownPlaceHolder>
            </Dropdown>
            {!country &&
              hasError && (
                <ErrorMsg>{formatMessage(messages.requiredLabel)}</ErrorMsg>
              )}
          </Column>
          <Column inputhWidth={'32%'}>
            <InputTitleContainer>
              <Label>{formatMessage(messages.stateProvinceLabel)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <Dropdown overlay={dropdownStates}>
              <DropDownPlaceHolder>
                {stateProvince
                  ? stateProvince
                  : formatMessage(messages.selectStateProvinceLabel)}
                <Icon type="down" />
              </DropDownPlaceHolder>
            </Dropdown>
            {!stateProvince &&
              hasError && (
                <ErrorMsg>{formatMessage(messages.requiredLabel)}</ErrorMsg>
              )}
          </Column>
          <Column inputhWidth={'32%'}>
            <InputTitleContainer>
              <Label>{formatMessage(messages.cityLabel)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <Dropdown overlay={dropdownCities}>
              <DropDownPlaceHolder>
                {city ? city : formatMessage(messages.selectCityLabel)}
                <Icon type="down" />
              </DropDownPlaceHolder>
            </Dropdown>
            {!city &&
              hasError && (
                <ErrorMsg>{formatMessage(messages.requiredLabel)}</ErrorMsg>
              )}
          </Column>
        </Row>
        <Row>
          <Column inputhWidth={'49%'}>
            <InputTitleContainer>
              <Label>{formatMessage(messages.zipCodeLabel)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="zipCode"
              value={zipCode}
              onChange={this.handleInputChange}
              maxLength="20"
            />
            {!zipCode &&
              hasError && (
                <ErrorMsg>{formatMessage(messages.requiredLabel)}</ErrorMsg>
              )}
          </Column>
          <Column inputhWidth={'49%'}>
            <InputTitleContainer>
              <Label>{formatMessage(messages.phoneLabel)}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="phone"
              value={phone}
              onChange={this.handleInputChange}
              maxLength="20"
            />
            {!phone &&
              hasError && (
                <ErrorMsg>{formatMessage(messages.requiredLabel)}</ErrorMsg>
              )}
          </Column>
        </Row>
      </ShippingFormContainer>
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
}

export default ShippingAddressForm
