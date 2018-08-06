/**
 * CountrySelect Component - Created by gustavomedina on 30/07/18.
 */
import * as React from 'react'
import Select from 'antd/lib/select'
import Spin from 'antd/lib/spin'
import { withApollo, graphql, compose } from 'react-apollo'
import messages from './messages'
import { Container, StyledSelect } from './styledComponents'
import { countriesQuery } from './data'
import { QueryProps, Country } from '../../types/common'

const Option = Select.Option

interface Data extends QueryProps {
  countries: Country[]
}

interface Props {
  data: Data
  selectedCountry: string
  handleCountryChange: (value: any, countryId: string) => void
  formatMessage: (messageDescriptor: any) => string
}

export class CountrySelect extends React.Component<Props, {}> {
  handleSelectChange = async (value: any) => {
    const { handleCountryChange } = this.props
    handleCountryChange(
      value.substr(0, value.indexOf('-')),
      value.substr(value.indexOf('-') + 1, value.length)
    )
  }

  handleFilter = (input: string, { props }: any) =>
    props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

  render() {
    const { data, selectedCountry, formatMessage } = this.props
    let dropdownOptions: any = []
    if (data && data.countries && data.countries.length) {
      dropdownOptions = data.countries.map(
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

const CountrySelectEnhance = compose(
  withApollo,
  graphql(countriesQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  })
)(CountrySelect)

export default CountrySelectEnhance
