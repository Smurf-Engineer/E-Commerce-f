/**
 * CartListItemTable Component - Created by gustavomedina on 04/05/18.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import Select from 'antd/lib/select'
import Input from 'antd/lib/input'
import { InputNumber } from 'antd'
import messages from './messages'
import {
  Table,
  HeaderRow,
  Cell,
  Title,
  Row,
  HeaderCell,
  DeleteItem
} from './styledComponents'

const Option = Select.Option

interface Props {
  formatMessage: (messageDescriptor: any) => string
}

interface Header {
  message: string
  width?: number
}

const headerTitles: Header[] = [
  { message: 'gender' },
  { message: 'size' },
  { message: 'fit' },
  { message: 'label' },
  { message: 'quantity' },
  { message: '', width: 10 }
]

class CartListItemTable extends React.Component<Props, {}> {
  render() {
    const { formatMessage } = this.props
    const header = (
      <MediaQuery minDeviceWidth={480}>
        {matches => {
          if (matches) {
            const head = headerTitles.map(({ width, message }, key) => (
              <HeaderCell {...{ key, width }}>
                <Title>{message ? formatMessage(messages[message]) : ''}</Title>
              </HeaderCell>
            ))
            return head
          } else {
            return null
          }
        }}
      </MediaQuery>
    )
    return (
      <Table>
        <HeaderRow>{header}</HeaderRow>
        <Row>
          <Cell>
            <Select
              style={{ width: '100%' }}
              showSearch={false}
              placeholder="Select gender"
              optionFilterProp="children"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Cell>
          <Cell>
            <Select
              style={{ width: '100%' }}
              showSearch={false}
              placeholder="Select size"
              optionFilterProp="children"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Cell>
          <Cell>
            <Select
              style={{ width: '100%' }}
              showSearch={false}
              placeholder="Select fit"
              optionFilterProp="children"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Cell>
          <Cell>
            <Input style={{ width: '100%' }} placeholder="Label" />
          </Cell>
          <Cell>
            <InputNumber min={1} max={10} defaultValue={1} />
          </Cell>
          <Cell width={10}>
            <DeleteItem>—</DeleteItem>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Select
              style={{ width: '100%' }}
              showSearch={false}
              placeholder="Select gender"
              optionFilterProp="children"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Cell>
          <Cell>
            <Select
              style={{ width: '100%' }}
              showSearch={false}
              placeholder="Select size"
              optionFilterProp="children"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Cell>
          <Cell>
            <Select
              style={{ width: '100%' }}
              showSearch={false}
              placeholder="Select fit"
              optionFilterProp="children"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Cell>
          <Cell>
            <Input style={{ width: '100%' }} placeholder="Label" />
          </Cell>
          <Cell>
            <InputNumber min={1} max={10} defaultValue={1} />
          </Cell>
          <Cell width={10}>
            <DeleteItem>—</DeleteItem>
          </Cell>
        </Row>
      </Table>
    )
  }
}

export default CartListItemTable
