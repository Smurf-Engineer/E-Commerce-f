/**
 * RegionSelect Component - Created by gustavomedina on 30/07/18.
 */
import * as React from 'react'
import Select from 'antd/lib/select'
import Spin from 'antd/lib/spin'
import { withApollo, graphql, compose } from 'react-apollo'
import messages from './messages'
import { Container, StyledSelect } from './styledComponents'
import { QueryProps, CountryRegion } from '../../types/common'
import { regionsQuery } from './data'

const Option = Select.Option

interface Data extends QueryProps {
  regions: CountryRegion[]
}

interface Props {
  data: Data
  country?: string
  region: string
  disabled: boolean
  reseller: boolean
  countryName?: string
  handleRegionChange: (value: any, regionCode: string) => void
  formatMessage: (messageDescriptor: any) => string
}

export class RegionSelect extends React.Component<Props, {}> {
  handleSelectChange = async (value: any) => {
    const { handleRegionChange } = this.props
    const valueArray = value ? value.split('-') : []
    const stateName = valueArray[0]
    const stateCode = valueArray[1]
    if (stateName && stateCode) {
      handleRegionChange(stateName, stateCode)
    }
  }

  handleFilter = (input: string, { props }: any) =>
    props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

  render() {
    const { data, region, reseller, formatMessage, disabled, countryName } = this.props
    let dropdownOptions: any = []
    if (data && data.regions) {
      dropdownOptions = data.regions.length ? (
        data.regions.map(({ region: regionItem, code }, index) => {
          return code ? (
            <Option value={`${regionItem}-${code.shortCode}`} key={index}>
              {regionItem}
            </Option>
          ) : (
            <Option value={`${regionItem}-${index}`} key={index}>
              {regionItem}
            </Option>
          )
        })
      ) : (
        <Option value={`${countryName}-${0}`}>{countryName}</Option>
      )
    }

    return (
      <Container>
        <StyledSelect
          {...{ disabled, reseller }}
          notFoundContent={
            !!data && data.loading ? <Spin size="small" /> : null
          }
          value={!region ? undefined : region}
          placeholder={formatMessage(messages.select)}
          onChange={this.handleSelectChange}
          showSearch={true}
          autoComplete="jv2"
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
}

const RegionSelectEnhance = compose(
  withApollo,
  graphql(regionsQuery, {
    options: ({ country }: OwnProps) => ({
      skip: country === '',
      variables: { country },
      fetchPolicy: 'network-only'
    })
  })
)(RegionSelect)

export default RegionSelectEnhance
