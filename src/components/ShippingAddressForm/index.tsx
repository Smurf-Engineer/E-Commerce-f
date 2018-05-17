/**
 * ShippingAddressForm Component - Created by miguelcanobbio on 15/05/18.
 */
import * as React from 'react'
import Dropdown from 'antd/lib/dropdown'
import Icon from 'antd/lib/icon'
import Menu, { ClickParam } from 'antd/lib/menu'
import {
  ShippingFormContainer,
  Row,
  Column,
  StyledInput,
  RequiredSpan,
  Label,
  InputTitleContainer,
  DropDownPlaceHolder,
  ErrorMsg
} from './styledComponents'

interface Props {
  firstName: string
  lastName: string
  street: string
  apartment: string
  country: string
  state: string
  city: string
  zipCode: string
  phone: string
  hasError: boolean
  formatMessage?: (messageDescriptor: any) => string
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
      state,
      city,
      zipCode,
      phone,
      hasError
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
        <Menu.Item id="state" key="california">
          {'California'}
        </Menu.Item>
        <Menu.Item id="state" key="quebec">
          {'Quebec'}
        </Menu.Item>
        <Menu.Item id="state" key="arizona">
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
              <Label>{'First Name'}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="firstName"
              value={firstName}
              onChange={this.handleInputChange}
              maxLength="50"
            />
            {!firstName &&
              hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
          </Column>
          <Column inputhWidth={'49%'}>
            <InputTitleContainer>
              <Label>{'Last Name'}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="lastName"
              value={lastName}
              onChange={this.handleInputChange}
              maxLength="50"
            />
            {!lastName &&
              hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
          </Column>
        </Row>
        <Row>
          <Column inputhWidth={'100%'}>
            <InputTitleContainer>
              <Label>{'Address'}</Label>
              <RequiredSpan>*</RequiredSpan>
              <Label>{'We do not ship to APO and PO Boxes'}</Label>
            </InputTitleContainer>
            <StyledInput
              id="street"
              placeholder={'Street address'}
              value={street}
              onChange={this.handleInputChange}
            />
            {!street &&
              hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
            <StyledInput
              id="apartment"
              placeholder={'Apartment, suite, floor, etc.'}
              value={apartment}
              onChange={this.handleInputChange}
            />
          </Column>
        </Row>
        <Row>
          <Column inputhWidth={'32%'}>
            <InputTitleContainer>
              <Label>{'Country'}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <Dropdown overlay={dropdownCountries}>
              <DropDownPlaceHolder>
                {country ? country : 'Select Country'}
                <Icon type="down" />
              </DropDownPlaceHolder>
            </Dropdown>
            {!country &&
              hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
          </Column>
          <Column inputhWidth={'32%'}>
            <InputTitleContainer>
              <Label>{'State/Province'}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <Dropdown overlay={dropdownStates}>
              <DropDownPlaceHolder>
                {state ? state : 'Select State/Providence'}
                <Icon type="down" />
              </DropDownPlaceHolder>
            </Dropdown>
            {!state &&
              hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
          </Column>
          <Column inputhWidth={'32%'}>
            <InputTitleContainer>
              <Label>{'City'}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <Dropdown overlay={dropdownCities}>
              <DropDownPlaceHolder>
                {city ? city : 'Select City'}
                <Icon type="down" />
              </DropDownPlaceHolder>
            </Dropdown>
            {!city &&
              hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
          </Column>
        </Row>
        <Row>
          <Column inputhWidth={'49%'}>
            <InputTitleContainer>
              <Label>{'ZIP / Postal Code'}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="zipCode"
              value={zipCode}
              onChange={this.handleInputChange}
              maxLength="20"
            />
            {!zipCode &&
              hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
          </Column>
          <Column inputhWidth={'49%'}>
            <InputTitleContainer>
              <Label>{'Phone'}</Label>
              <RequiredSpan>*</RequiredSpan>
            </InputTitleContainer>
            <StyledInput
              id="phone"
              value={phone}
              onChange={this.handleInputChange}
              maxLength="20"
            />
            {!phone &&
              hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
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
