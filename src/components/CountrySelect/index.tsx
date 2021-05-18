/**
 * CountrySelect Component - Created by gustavomedina on 30/07/18.
 */
import * as React from 'react'
import Select from 'antd/lib/select'
import Spin from 'antd/lib/spin'
import messages from './messages'
import { Container, StyledSelect } from './styledComponents'
import { QueryProps, Country } from '../../types/common'

const Option = Select.Option

interface Props {
  data: QueryProps
  countries: Country[]
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
    const countryName = label.props.children
    handleCountryChange(
      value.substr(0, value.indexOf('-')),
      value.substr(value.indexOf('-') + 1, value.length),
      countryName
    )
  }

  handleFilter = (input: string, { props }: any) =>
    props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

  render() {
    const { data, countries, selectedCountry, formatMessage } = this.props
    let dropdownOptions: any = []
    if (countries && countries.length) {
      dropdownOptions = countries.map(
        ({ name, code, geonameId }, index) => (
          <Option value={`${code}-${geonameId}`} key={index}>
            {name}
          </Option>
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
          optionFilterProp="children"
          filterOption={this.handleFilter}
        >
          {dropdownOptions}
        </StyledSelect>
      </Container>
    )
  }
}

export default CountrySelect
