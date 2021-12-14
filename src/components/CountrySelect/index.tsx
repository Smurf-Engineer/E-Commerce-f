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
            <CountryIcon
              src={`https://flagcdn.com/w20/${(code || 'US').toLowerCase()}.png`}
              // tslint:disable-next-line: max-line-length
              onerror="this.src='data:image/png;base64,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'"
            />
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
          autoComplete="jv2"
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
