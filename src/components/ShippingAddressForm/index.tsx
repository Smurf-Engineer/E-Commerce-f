/**
 * ShippingAddressForm Component - Created by miguelcanobbio on 15/05/18.
 */
import * as React from 'react'
import messages from './messages'
import { isNumber, isPoBox } from '../../utils/utilsAddressVaidation'
import {
  ShippingFormContainer,
  Row,
  Column,
  StyledInput,
  RequiredSpan,
  Label,
  InputTitleContainer,
  ErrorMsg,
  ShipTopPoAPO,
  StyledCityInput
} from './styledComponents'
import { ClickParam } from '../../types/common'
import CountrySelect from '../CountrySelect'
import RegionSelect from '../RegionSelect'

const COUNTRY_VALUE_ID = 'country'
const STATE_VALUE_ID = 'stateProvince'
const STATE_CODE_VALUE_ID = 'stateProvinceCode'
const CITY_VALUE_ID = 'city'

interface StateProps {
  selectedCountry: string | undefined
  selectedCountryId: string | undefined
  selectedRegion: string | undefined
  selectedCity: string | undefined
  selectedRegionCode: string | undefined
}

interface Props {
  firstName: string
  lastName: string
  street: string
  apartment: string
  country: string
  stateProvince: string
  stateProvinceCode: string
  city: string
  zipCode: string
  phone: string
  hasError: boolean
  formatMessage: (messageDescriptor: any) => string
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
}

class ShippingAddressForm extends React.Component<Props, StateProps> {
  state = {
    selectedCountry: '',
    selectedCountryId: '',
    selectedRegion: '',
    selectedCity: '',
    selectedRegionCode: ''
  }

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

    const {
      selectedCountry,
      selectedRegion,
      selectedCountryId,
      selectedRegionCode
    } = this.state

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
            {(!street || this.hasAddressError(street)) &&
              hasError && (
                <ErrorMsg>{formatMessage(messages.requiredAddressLabel)}</ErrorMsg>
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
            <CountrySelect
              {...{ formatMessage }}
              selectedCountry={
                selectedCountry
                  ? `${selectedCountry}-${selectedCountryId}`
                  : undefined
              }
              handleCountryChange={this.handleCountryChange}
            />
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
            <RegionSelect
              {...{ formatMessage }}
              disabled={!country}
              country={selectedCountryId}
              region={
                selectedRegion
                  ? `${selectedRegion}-${selectedRegionCode}`
                  : undefined
              }
              handleRegionChange={this.handleRegionChange}
            />
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
            <StyledCityInput
              id="city"
              value={city}
              onChange={this.handleInputChange}
              maxLength="100"
            />
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

  hasAddressError = (street: string) => {
    return isPoBox(street)
  }
  handleCountryChange = (value: any, countryId: string) => {
    const { inputChangeAction } = this.props
    this.setState({
      selectedCountry: value,
      selectedCountryId: countryId,
      selectedRegion: '',
      selectedCity: ''
    })
    inputChangeAction(COUNTRY_VALUE_ID, value)
  }

  handleRegionChange = (value: any, regionCode: string) => {
    const { inputChangeAction } = this.props
    this.setState({
      selectedRegion: value,
      selectedRegionCode: regionCode,
      selectedCity: ''
    })
    inputChangeAction(STATE_VALUE_ID, value)
    inputChangeAction(STATE_CODE_VALUE_ID, regionCode)
  }

  handleCityChange = async (value: any) => {
    const { inputChangeAction } = this.props
    this.setState({
      selectedCity: value
    })
    inputChangeAction(CITY_VALUE_ID, value)
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { inputChangeAction } = this.props
    const {
      currentTarget: { id, value }
    } = evt

    if (value && id === 'phone') {
      if (!isNumber(value)) {
        return
      }
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
