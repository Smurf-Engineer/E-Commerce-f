/**
 * CitySelect Component - Created by gustavomedina on 30/07/18.
 */
import * as React from 'react'
import Select from 'antd/lib/select'
import Spin from 'antd/lib/spin'
import { withApollo, graphql, compose } from 'react-apollo'
import messages from './messages'
import { Container, StyledSelect } from './styledComponents'
import { citiesQuery } from './data'
import { QueryProps, City } from '../../types/common'

const Option = Select.Option

interface Data extends QueryProps {
  cities: City[]
}

interface Props {
  data: Data
  country?: string
  region?: string
  disabled: boolean
  selectedCity: string
  handleCityChange: (value: any) => void
  formatMessage: (messageDescriptor: any) => string
}

export class CitySelect extends React.Component<Props, {}> {
  handleSelectChange = async (value: any) => {
    const { handleCityChange } = this.props
    handleCityChange(value)
  }

  handleFilter = (input: string, { props }: any) =>
    props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

  render() {
    const { data, disabled, selectedCity, formatMessage } = this.props
    let dropdownOptions: any = []
    if (!!data && data.cities && data.cities.length) {
      dropdownOptions = data.cities.map(({ city }, index) => (
        <Option value={city} key={index}>
          {city}
        </Option>
      ))
    }

    return (
      <Container>
        <StyledSelect
          {...{ disabled }}
          notFoundContent={data && data.loading ? <Spin size="small" /> : null}
          value={!selectedCity ? undefined : selectedCity}
          defaultActiveFirstOption={false}
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

interface OwnProps {
  country?: string
  region?: string
}

const CitySelectEnhance = compose(
  withApollo,
  graphql(citiesQuery, {
    options: ({ country, region }: OwnProps) => ({
      skip: country === '' || region === '',
      variables: { country, region }
    })
  })
)(CitySelect)

export default CitySelectEnhance
