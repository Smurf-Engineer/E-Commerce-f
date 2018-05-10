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
import { CartItemDetail, Product } from '../../types/common'

const Option = Select.Option

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  handledeleteItemDetail: (
    event: React.MouseEvent<EventTarget>,
    index: number,
    detailIndex: number
  ) => void
  cartItem: CartItems
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
    const { formatMessage, cartItem, handledeleteItemDetail } = this.props
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

    const fitOptions = cartItem.product.fitStyles.map((fs, key) => {
      return (
        <Option key={fs.id} value={fs.name}>
          {fs.name}
        </Option>
      )
    })

    const genderOptions = cartItem.product.genders.map((gender, genderKey) => {
      return (
        <Option key={gender.id} value={gender.name}>
          {gender.name}
        </Option>
      )
    })

    const renderList = cartItem
      ? cartItem.itemDetails.map((item, index) => {
          return (
            <Row key={index}>
              <Cell>
                <Select
                  style={{ width: '100%' }}
                  showSearch={false}
                  placeholder="Select gender"
                  optionFilterProp="children"
                >
                  {genderOptions}
                </Select>
              </Cell>
              <Cell>
                <Select
                  style={{ width: '100%' }}
                  showSearch={false}
                  placeholder="Select size"
                  optionFilterProp="children"
                  disabled={true}
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
                  {fitOptions}
                </Select>
              </Cell>
              <Cell>
                <Input style={{ width: '100%' }} placeholder="Label" />
              </Cell>
              <Cell>
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={1}
                  value={item.quantity}
                />
              </Cell>
              <Cell width={10}>
                <DeleteItem onClick={e => handledeleteItemDetail(e, 0, index)}>
                  —
                </DeleteItem>
              </Cell>
            </Row>
          )
        })
      : null

    return (
      <Table>
        <HeaderRow>{header}</HeaderRow>
        {renderList}
      </Table>
    )
  }
}

export default CartListItemTable
