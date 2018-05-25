/**
 * CartListItemTable Component - Created by gustavomedina on 04/05/18.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import find from 'lodash/find'
import dropRight from 'lodash/dropRight'
import Select from 'antd/lib/select'

import InputNumber from 'antd/lib/input-number'
import messages from './messages'
import {
  Table,
  HeaderRow,
  Cell,
  InfoCell,
  Title,
  Row,
  HeaderCell,
  DeleteItem,
  StyledSelect,
  StyledInput
} from './styledComponents'
import { CartItemDetail, Product, ItemDetailType } from '../../types/common'

const Option = Select.Option

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  onlyRead?: boolean
  handledeleteItemDetail: (
    event: React.MouseEvent<EventTarget>,
    index: number,
    detailIndex: number
  ) => void
  setLabelItemDetail: (
    index: number,
    detailIndex: number,
    label: string
  ) => void
  setDetailQuantity: (
    index: number,
    detailIndex: number,
    quantity: number
  ) => void
  setDetailFit: (
    index: number,
    detailIndex: number,
    fit: ItemDetailType
  ) => void
  setDetailGender: (
    index: number,
    detailIndex: number,
    gender: ItemDetailType
  ) => void
  setDetailSize: (
    index: number,
    detailIndex: number,
    size: ItemDetailType
  ) => void
  cartItem: CartItems
  itemIndex: number
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
  handleLabelChange = (
    evt: React.FormEvent<HTMLInputElement>,
    detail: number
  ) => {
    const { setLabelItemDetail, itemIndex } = this.props

    const {
      currentTarget: { value }
    } = evt

    setLabelItemDetail(itemIndex, detail, value)
  }

  handleQuantityChange = (value: any, detail: number) => {
    const { setDetailQuantity, itemIndex } = this.props

    setDetailQuantity(itemIndex, detail, value)
  }

  handleGenderChange = (value: any, detail: number) => {
    const { setDetailGender, itemIndex, cartItem } = this.props

    const selectedGender = find(cartItem.product.genders, {
      name: value
    }) as ItemDetailType

    setDetailGender(itemIndex, detail, selectedGender)
  }

  handleSizeChange = (value: any, detail: number) => {
    // TODO: implement when sizes added
    // const { setDetailGender, itemIndex, cartItem } = this.props
    // const selectedGender = find(cartItem.product.genders, {
    //   name: value
    // }) as ItemDetailType
    // setDetailGender(itemIndex, detail, selectedGender)
  }

  handleFitChange = (value: any, detail: number) => {
    const { setDetailFit, itemIndex, cartItem } = this.props

    const selectedfit = find(cartItem.product.fitStyles, {
      name: value
    }) as ItemDetailType

    setDetailFit(itemIndex, detail, selectedfit)
  }

  handleRemove = (
    event: React.MouseEvent<EventTarget>,
    itemIndex: number,
    index: number
  ) => {
    const { handledeleteItemDetail, cartItem } = this.props

    if (cartItem.itemDetails.length > 1) {
      handledeleteItemDetail(event, itemIndex, index)
    }
  }

  render() {
    const { formatMessage, cartItem, itemIndex, onlyRead } = this.props
    const headers = onlyRead ? dropRight(headerTitles) : headerTitles
    const header = (
      <MediaQuery minDeviceWidth={480}>
        {matches => {
          if (matches) {
            const head = headers.map(({ width, message }, key) => (
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
    const fits = cartItem.product.fitStyles && cartItem.product.fitStyles[0].id

    const genderOptions = cartItem.product.genders.map((gender, genderKey) => {
      return (
        <Option key={gender.id} value={gender.name}>
          {gender.name}
        </Option>
      )
    })

    const renderList = cartItem
      ? cartItem.itemDetails.map((item, index) => {
          return !onlyRead ? (
            <Row key={index}>
              <Cell>
                <StyledSelect
                  onChange={e => this.handleGenderChange(e, index)}
                  showSearch={false}
                  placeholder={formatMessage(messages.genderPlaceholder)}
                  optionFilterProp="children"
                  value={item.gender ? item.gender.name : undefined}
                >
                  {genderOptions}
                </StyledSelect>
              </Cell>
              <Cell>
                <StyledSelect
                  showSearch={false}
                  placeholder={formatMessage(messages.sizePlaceholder)}
                  optionFilterProp="children"
                  disabled={true}
                />
              </Cell>
              <Cell>
                <StyledSelect
                  onChange={e => this.handleFitChange(e, index)}
                  showSearch={false}
                  placeholder={formatMessage(messages.fitPlaceholder)}
                  optionFilterProp="children"
                  disabled={!fits}
                  value={item.fit ? item.fit.name : undefined}
                >
                  {fitOptions}
                </StyledSelect>
              </Cell>
              <Cell>
                <StyledInput
                  id={`input${index}`}
                  placeholder={formatMessage(messages.labelPlaceholder)}
                  value={item.label || ''}
                  onChange={e => this.handleLabelChange(e, index)}
                />
              </Cell>
              <Cell>
                <InputNumber
                  key={index}
                  onChange={e => this.handleQuantityChange(e, index)}
                  min={1}
                  max={100}
                  value={item.quantity || undefined}
                />
              </Cell>
              <Cell width={10}>
                <DeleteItem
                  onClick={e => this.handleRemove(e, itemIndex, index)}
                >
                  —
                </DeleteItem>
              </Cell>
            </Row>
          ) : (
            <Row key={index}>
              <InfoCell>{item.gender ? item.gender.name : '-'}</InfoCell>
              <InfoCell>{item.size ? item.size.name : '-'}</InfoCell>
              <InfoCell>{item.fit ? item.fit.name : '-'}</InfoCell>
              <InfoCell>{item.label || '-'}</InfoCell>
              <InfoCell>{item.quantity || '1'}</InfoCell>
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
