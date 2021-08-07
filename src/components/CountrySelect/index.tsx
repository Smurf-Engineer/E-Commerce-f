/**
 * CountrySelect Component - Created by gustavomedina on 30/07/18.
 */
import * as React from 'react'
import Spin from 'antd/lib/spin'
import messages from './messages'
import { Container, StyledSelect, StyledOption, CountryIcon } from './styledComponents'
import { QueryProps, Country } from '../../types/common'
import get from 'lodash/get'

interface Props {
  data: QueryProps
  countries: Country[]
  loading: boolean
  selectedCountry: string
  handleCountryChange: (
    value: string,
    countryId: string,
    countryName: string
  ) => void
  formatMessage: (messageDescriptor: any) => string
}

export class CountrySelect extends React.Component<Props, {}> {
  handleSelectChange = async (value: string, label: React.ReactPortal) => {
    const { handleCountryChange } = this.props
    const countryName = get(label, 'props.name', '')
    handleCountryChange(
      value.substr(0, value.indexOf('-')),
      value.substr(value.indexOf('-') + 1, value.length),
      countryName
    )
  }

  render() {
    const { data, countries, selectedCountry, formatMessage, loading } = this.props
    let dropdownOptions: any = []
    if (countries && countries.length) {
      dropdownOptions = countries.map(
        ({ name, code, geonameId }, index) => (
          <StyledOption name={name} value={`${code}-${geonameId}`} key={index}>
            <CountryIcon src={`https://www.countryflags.io/${code}/flat/24.png`} />
            {name}
          </StyledOption>
        )
      )
    }
    return (
      <Container>
        <StyledSelect
          notFoundContent={
            !!data && data.loading ? <Spin size="small" /> : null
          }
          value={!selectedCountry ? undefined : selectedCountry}
          placeholder={formatMessage(messages.select)}
          onChange={this.handleSelectChange}
          showSearch={true}
          loading={loading}
          optionFilterProp="name"
          filterOption={true}
        >
          {dropdownOptions}
        </StyledSelect>
      </Container>
    )
  }
}

export default CountrySelect
