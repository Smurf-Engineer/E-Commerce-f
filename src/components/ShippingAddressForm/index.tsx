/**
 * ShippingAddressForm Component - Created by miguelcanobbio on 15/05/18.
 */
import * as React from 'react'
import messages from './messages'
import { getAddressPredictions, getAddressDetails } from './api'
import {
  isNumberValue,
  isPoBox,
  isApoCity
} from '../../utils/utilsAddressValidation'
import { PHONE_FIELD } from '../../constants'
import {
  ShippingFormContainer,
  Row,
  Column,
  StyledInput,
  StreetInput,
  StreetInputContainer,
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
import { AutoComplete } from 'antd'
import debounce from 'lodash/debounce'
import { withApollo, graphql, compose } from 'react-apollo'
import { countriesQuery } from './data'
import { QueryProps, Country } from '../../types/common'

const { Option } = AutoComplete

const COUNTRY_VALUE_ID = 'country'
const STATE_VALUE_ID = 'stateProvince'
const STATE_CODE_VALUE_ID = 'stateProvinceCode'
const CITY_VALUE_ID = 'city'

interface Data extends QueryProps {
  countries: Country[]
}

interface AddressPrediction {
  description: string
  placeId: string
}

interface StateProps {
  selectedCountry: string | undefined
  selectedCountryId: string | undefined
  selectedRegion: string | undefined
  selectedCity: string | undefined
  selectedRegionCode: string | undefined
  addressDataSource: any
}

interface Props {
  data: Data
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
    selectedRegionCode: '',
    addressDataSource: []
  }

  constructor(props: Props) {
    super(props)
    this.getAddressPredictionsDebounced = debounce(this.fetchAddressPredictions, 500)
  }

  render() {
    const {
      data,
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

    const { addressDataSource } = this.state
    const addressDataSourceMap = addressDataSource.map((address: AddressPrediction) => (
      <Option key={address.placeId} value={address.placeId}>
        {address.description}
      </Option>
    ))

    const {
      selectedCountry,
      selectedRegion,
      selectedCountryId,
      selectedCountryName
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
              maxLength={50}
            />
            {!firstName && hasError && (
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
              maxLength={50}
            />
            {!lastName && hasError && (
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
            <StreetInputContainer
              dataSource={addressDataSourceMap}
              onSelect={this.handleAddressSelect}
              onSearch={this.handleAddressLookup}
              value={street}
            >
              <StreetInput
                placeholder={formatMessage(messages.streetAddressLabel)}
              />
            </StreetInputContainer>
            {!street && hasError && (
              <ErrorMsg>{formatMessage(messages.requiredLabel)}</ErrorMsg>
            )}
            {this.hasAddressError(street, city) && hasError && (
              <ErrorMsg>
                {formatMessage(messages.requiredAddressLabel)}
              </ErrorMsg>
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
              countries={data.countries}
            />
            {!country && hasError && (
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
              countryName={selectedCountryName}
              region={
                selectedRegion
                  ? `${selectedRegion}`
                  : undefined
              }
              handleRegionChange={this.handleRegionChange}
            />
            {!stateProvince && hasError && (
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
              maxLength={100}
            />
            {!city && hasError && (
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
              maxLength={20}
            />
            {!zipCode && hasError && (
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
              maxLength={20}
            />
            {!phone && hasError && (
              <ErrorMsg>{formatMessage(messages.requiredLabel)}</ErrorMsg>
            )}
          </Column>
        </Row>
      </ShippingFormContainer>
    )
  }

  hasAddressError = (street: string, city: string) => {
    return isPoBox(street) || isApoCity(city)
  }

  handleCountryChange = (
    value: any,
    countryId: string,
    countryName: string
  ) => {
    const { inputChangeAction } = this.props
    this.setState({
      selectedCountry: value,
      selectedCountryId: countryId,
      selectedCountryName: countryName,
      selectedRegion: '',
      selectedCity: ''
    })
    inputChangeAction(COUNTRY_VALUE_ID, value)
  }

  handleAddressSelect = async (placeId: string) => {
    const addressDetails = await getAddressDetails(placeId)
    const { inputChangeAction, data } = this.props

    if (addressDetails) {
      let city = '', zipCode = ''

      for (const component of addressDetails) {
        switch (component.types[0]) {
          case 'route':
            inputChangeAction('street', component.long_name)
            break
          case 'country':
            for (const country of data.countries) {
              if (country.code === component.short_name) {
                this.setState({
                  selectedCountry: country.code,
                  selectedCountryId: country.geonameId,
                  selectedCountryName: country.name
                })
                inputChangeAction(COUNTRY_VALUE_ID, component.short_name)
                break
              }
            }
            break
          case 'administrative_area_level_1':
            this.setState({
              selectedRegion: component.long_name,
              selectedRegionCode: component.short_name
            })
            inputChangeAction(STATE_VALUE_ID, component.long_name)
            inputChangeAction(STATE_CODE_VALUE_ID, component.short_name)
            break
          case 'locality':
            city = component.long_name
            inputChangeAction(CITY_VALUE_ID, component.long_name)
            break
          case 'postal_code':
            zipCode = component.long_name
            inputChangeAction('zipCode', component.long_name)
            break
          default:
            break
        }
      }

      if (!city) {
        inputChangeAction(CITY_VALUE_ID, '')
      }
      if (!zipCode) {
        inputChangeAction('zipCode', '')
      }
    }
  }

  handleAddressLookup = async (value: string) => {
    const { inputChangeAction } = this.props
    inputChangeAction('street', value)

    this.getAddressPredictionsDebounced(value)
  }

  fetchAddressPredictions = async (value: string) => {
    const predictions = await getAddressPredictions(value)

    const dataSource: AddressPrediction[] = []
    for (const prediction of predictions) {
      dataSource.push({
        description: prediction.description,
        placeId: prediction.place_id
      })
    }

    this.setState({
      addressDataSource: dataSource
    })
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

    if (value && id === PHONE_FIELD && !isNumberValue(value)) {
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

const ShippingAddressFormEnhance = compose(
  withApollo,
  graphql(countriesQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  })
)(ShippingAddressForm)

export default ShippingAddressFormEnhance
