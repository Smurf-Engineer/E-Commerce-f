/**
 * Shippping Component - Created by cazarez on 07/05/18.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import Input from 'antd/lib/input'
import Dropdown from 'antd/lib/dropdown'
import Checkbox from 'antd/lib/checkbox'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import Menu, { ClickParam } from 'antd/lib/menu'
import messages from './messages'
import {
  Container,
  Title,
  ShippingFormContainer,
  Row,
  Column,
  StyledInput,
  RequiredSpan,
  Label,
  InputTitleContainer,
  ShippingMethodContainer,
  ShippinPriorityText,
  StyledCheckbox,
  DropDownPlaceHolder,
  ErrorMsg
} from './styledComponents'

import MyAddresses from '../MyAddressesList'

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
  formatMessage: (messageDescriptor: any) => string
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
  smsCheckAction: (checked: boolean) => void
  emailCheckAction: (checked: boolean) => void
}

class Shippping extends React.PureComponent<Props, {}> {
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
      hasError,
      formatMessage
    } = this.props

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

    const form = (
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
            />
            {!phone &&
              hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
          </Column>
        </Row>
      </ShippingFormContainer>
    )

    return (
      <Container>
        <MyAddresses formatMessage={formatMessage} />
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        {form}
        {shippingMethod}
      </Container>
    )
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { inputChangeAction } = this.props
    const {
      currentTarget: { id, value }
    } = evt
    if (id === 'zipCode' || id === 'phone') {
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
    console.log('check ', evt.target)
  }

  handleEmailCheck = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { emailCheckAction } = this.props
    const {
      target: { checked }
    } = evt

    emailCheckAction(checked)
    console.log('check ', evt.target)
  }
}

export default Shippping
