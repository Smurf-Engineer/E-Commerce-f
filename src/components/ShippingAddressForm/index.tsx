/**
 * ShippingAddressForm Component - Created by miguelcanobbio on 15/05/18.
 */
import * as React from 'react'
import Select from 'antd/lib/select'
import { withApollo, graphql, compose } from 'react-apollo'
import messages from './messages'
import {
  ShippingFormContainer,
  Row,
  Column,
  StyledInput,
  RequiredSpan,
  Label,
  InputTitleContainer,
  ErrorMsg,
  ShipTopPoAPO
} from './styledComponents'
import { ClickParam } from '../../types/common'
import { countriesQuery, regionsQuery, citiesQuery } from './data'
import { QueryProps, Country, CountryRegion, City } from '../../types/common'

const Option = Select.Option

interface Data extends QueryProps {
  countries: Country[]
}

interface StateProps {
  regions: [CountryRegion] | null
  cities: [City] | null
  selectedCountry: string | undefined
  selectedRegion: string | undefined
  selectedCity: string | undefined
}

interface Props {
  data: Data
  client: any
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

export class ShippingAddressForm extends React.Component<Props, StateProps> {
  state: StateProps = {
    regions: null,
    cities: null,
    selectedCountry: undefined,
    selectedRegion: undefined,
    selectedCity: undefined
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
      city: citi,
      zipCode,
      phone,
      hasError,
      formatMessage
    } = this.props

    const { regions, cities } = this.state
    const { countries } = data

    let dropdownCountries: any = []
    let dropdownRegions: any = []
    let dropdownCities: any = []

    if (countries && countries.length) {
      dropdownCountries = countries.map(({ name, code }, index) => (
        <Option value={code} key={index}>
          {name}
        </Option>
      ))
    }

    if (regions && regions.length) {
      dropdownRegions = regions.map(({ region }, index) => (
        <Option value={region} key={index}>
          {region}
        </Option>
      ))
    }

    if (cities && cities.length) {
      dropdownCities = cities.map(({ city }, index) => (
        <Option value={city} key={index}>
          {city}
        </Option>
      ))
    }

    const countriesDrop = (
      <Select
        placeholder={`Select Country`}
        style={{ width: '100%' }}
        onChange={this.handleCountryChange}
        showSearch={true}
        optionFilterProp="children"
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {dropdownCountries}
      </Select>
    )

    const regionsDrop = (
      <Select
        placeholder={`Select State/Province`}
        style={{ width: '100%' }}
        onChange={this.handleRegionChange}
        showSearch={true}
        optionFilterProp="children"
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {dropdownRegions}
      </Select>
    )

    const citiesDrop = (
      <Select
        placeholder={`Select City`}
        style={{ width: '100%' }}
        onChange={this.handleCityChange}
        showSearch={true}
        optionFilterProp="children"
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {dropdownCities}
      </Select>
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
            {countriesDrop}
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
            {regionsDrop}
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
            {citiesDrop}
            {!citi &&
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

  handleCountryChange = async (value: any) => {
    const {
      client: { query }
    } = this.props

    try {
      const { data } = await query({
        query: regionsQuery,
        variables: { country: value },
        fetchPolicy: 'network-only'
      })

      this.setState({
        regions: data.states,
        selectedCountry: value,
        selectedRegion: undefined,
        selectedCity: undefined,
        cities: null
      })
    } catch (e) {
      throw e
    }
  }

  handleRegionChange = async (value: any) => {
    const {
      client: { query }
    } = this.props

    const { selectedCountry } = this.state

    try {
      const { data } = await query({
        query: citiesQuery,
        variables: { country: selectedCountry, region: value },
        fetchPolicy: 'network-only'
      })

      this.setState({
        selectedRegion: value,
        selectedCity: undefined,
        cities: data.getCities
      })
    } catch (e) {
      throw e
    }
  }

  handleCityChange = async (value: any) => {
    this.setState({
      selectedCity: value
    })
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { inputChangeAction } = this.props
    const {
      currentTarget: { id, value }
    } = evt

    const regex = /^[0-9]+$/
    const isNumber = regex.test(value)

    if (value && id === 'phone' && !isNumber) {
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
