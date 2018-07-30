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
  handleRegionChange: (value: any) => void
  formatMessage: (messageDescriptor: any) => string
}

export class RegionSelect extends React.Component<Props, {}> {
  handleSelectChange = async (value: any) => {
    const { handleRegionChange } = this.props
    handleRegionChange(value)
  }

  render() {
    const { data, country, region, formatMessage } = this.props
    let dropdownOptions: any = []
    if (data && data.regions && data.regions.length) {
      dropdownOptions = data.regions.map(({ region: regionItem }, index) => (
        <Option value={regionItem} key={index}>
          {regionItem}
        </Option>
      ))
    }

    return (
      <Container>
        <StyledSelect
          disabled={!country || country === ''}
          notFoundContent={data && data.loading ? <Spin size="small" /> : null}
          value={!region || region === '' ? undefined : region}
          placeholder={formatMessage(messages.select)}
          onChange={this.handleSelectChange}
          showSearch={true}
          optionFilterProp="children"
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
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
      variables: { country }
    })
  })
)(RegionSelect)

export default RegionSelectEnhance
