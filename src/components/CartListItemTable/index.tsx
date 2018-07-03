/**
 * CartListItemTable Component - Created by gustavomedina on 04/05/18.
 */
import * as React from 'react'
import MediaQuery from 'react-responsive'
import find from 'lodash/find'
import dropRight from 'lodash/dropRight'
import get from 'lodash/get'
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
import {
  CartItemDetail,
  Product,
  ItemDetailType,
  FitStyle,
  Filter,
  SizeFilter
} from '../../types/common'

const Option = Select.Option

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
  storeDesignId?: string
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
    const { setDetailSize, itemIndex, cartItem } = this.props
    const selectedSize = find(cartItem.product.sizeRange, {
      name: value
    }) as ItemDetailType
    setDetailSize(itemIndex, detail, selectedSize)
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

    const fitStyles: FitStyle[] = get(cartItem, 'product.fitStyles', [])
    const fitOptions = fitStyles.map(fs => {
      return (
        <Option key={fs.id} value={fs.name}>
          {fs.name}
        </Option>
      )
    })

    const fits = cartItem.product.fitStyles && cartItem.product.fitStyles[0].id

    const genders: Filter[] = get(cartItem, 'product.genders', [])
    const genderOptions = genders.map(gender => {
      return (
        <Option key={gender.id} value={gender.name}>
          {gender.name}
        </Option>
      )
    })

    const sizes: SizeFilter[] = get(cartItem, 'product.sizeRange', [])
    const sizeOptions = sizes.map(size => {
      return (
        <Option key={size.id} value={size.name}>
          {size.name}
        </Option>
      )
    })

    const renderList = cartItem
      ? cartItem.itemDetails.map((item, index) => {
          const { gender, size, fit, label, quantity } = item
          return !onlyRead ? (
            <Row key={index}>
              <Cell>
                <StyledSelect
                  onChange={e => this.handleGenderChange(e, index)}
                  showSearch={false}
                  placeholder={formatMessage(messages.genderPlaceholder)}
                  optionFilterProp="children"
                  value={gender ? gender.name : undefined}
                >
                  {genderOptions}
                </StyledSelect>
              </Cell>
              <Cell>
                <StyledSelect
                  onChange={e => this.handleSizeChange(e, index)}
                  showSearch={false}
                  placeholder={formatMessage(messages.sizePlaceholder)}
                  optionFilterProp="children"
                  value={size ? size.name : undefined}
                  disabled={!sizes.length}
                >
                  {sizeOptions}
                </StyledSelect>
              </Cell>
              <Cell>
                <StyledSelect
                  onChange={e => this.handleFitChange(e, index)}
                  showSearch={false}
                  placeholder={formatMessage(messages.fitPlaceholder)}
                  optionFilterProp="children"
                  disabled={!fits}
                  value={fit ? fit.name : undefined}
                >
                  {fitOptions}
                </StyledSelect>
              </Cell>
              <Cell>
                <StyledInput
                  id={`input${index}`}
                  placeholder={formatMessage(messages.labelPlaceholder)}
                  value={label || ''}
                  onChange={e => this.handleLabelChange(e, index)}
                />
              </Cell>
              <Cell>
                <InputNumber
                  key={index}
                  onChange={e => this.handleQuantityChange(e, index)}
                  min={1}
                  max={99}
                  value={quantity || undefined}
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
              <InfoCell>{gender && gender.name ? gender.name : '-'}</InfoCell>
              <InfoCell>{size && size.name ? size.name : '-'}</InfoCell>
              <InfoCell>{fit && fit.name ? fit.name : '-'}</InfoCell>
              <InfoCell>{label || '-'}</InfoCell>
              <InfoCell>{quantity || '-'}</InfoCell>
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
