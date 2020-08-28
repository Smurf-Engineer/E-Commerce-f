/**
 * CartListItemTable Component - Created by gustavomedina on 04/05/18.
 */
import * as React from 'react'
import find from 'lodash/find'
import dropRight from 'lodash/dropRight'
import get from 'lodash/get'
import Select from 'antd/lib/select'
import ColorPicker from './ColorPicker'
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
  StyledInputNumber,
  ProductColor,
  QuestionSpan,
  CellContainer
} from './styledComponents'
import Modal from 'antd/lib/modal'
import {
  ItemDetailType,
  FitStyle,
  Filter,
  SizeFilter,
  CartItems,
  ProductColors
} from '../../types/common'

const Option = Select.Option

const MAX_INDIVIDUAL_ITEMS = 249

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
  setDetailColor: (
    index: number,
    detailIndex: number,
    color: ProductColors
  ) => void
  setDetailSize: (
    index: number,
    detailIndex: number,
    size: ItemDetailType
  ) => void
  cartItem: CartItems
  itemIndex: number
  openFitInfo: boolean
  hideSizeHelp: boolean
  highlightFields?: boolean
  openFitInfoAction: (open: boolean, selectedIndex: number) => void
}

interface State {
  genderSelectWidth: string
  fitSelectWidth: string
}

interface Header {
  message: string
  width?: number
}

const headerTitles: Header[] = [
  { message: 'gender' },
  { message: 'color' },
  { message: 'size' },
  { message: 'fit' },
  { message: 'quantity' },
  { message: '', width: 10 }
]

const { info } = Modal

class CartListItemTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const { cartItem } = props
    const colors = get(cartItem, 'product.colors', [])
    const withColorColumn = !cartItem.designId && colors.length

    let genderSelectWidth = '100%'
    let fitSelectWidth = '100%'
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(max-width: 320px)').matches) {
        genderSelectWidth = withColorColumn ? '80px' : '90px'
        fitSelectWidth = withColorColumn ? '61px' : '71px'
      } else if (
        window.matchMedia('(max-width: 375px) and (min-width: 321px)').matches
      ) {
        genderSelectWidth = withColorColumn ? '78px' : '88px'
        fitSelectWidth = withColorColumn ? '75px' : '85px'
      } else if (
        window.matchMedia('(max-width: 425px) and (min-width: 376px)').matches
      ) {
        genderSelectWidth = withColorColumn ? '90px' : '100px'
        fitSelectWidth = withColorColumn ? '90px' : '100px'
      }
    }

    this.state = {
      genderSelectWidth,
      fitSelectWidth
    }
  }

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
    const { setDetailQuantity, itemIndex, formatMessage } = this.props

    if (value > MAX_INDIVIDUAL_ITEMS) {
      info({
        title: formatMessage(messages.maxQuantityAlert),
        content: formatMessage(messages.maxQuantity),
        okText: formatMessage(messages.gotIt),
        okType: 'default'
      })
    }

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

  handleRemove = (itemIndex: number, index: number) => (
    event: React.MouseEvent<EventTarget>
  ) => {
    const { handledeleteItemDetail, cartItem } = this.props

    if (cartItem.itemDetails.length > 1) {
      handledeleteItemDetail(event, itemIndex, index)
    }
  }
  handleColorChange = (color: ProductColors, detail: number) => {
    const { setDetailColor, itemIndex } = this.props
    setDetailColor(itemIndex, detail, color)
  }
  handleOpenFitInfo = () => {
    const { openFitInfoAction, itemIndex } = this.props
    openFitInfoAction(true, itemIndex)
  }

  render() {
    const {
      formatMessage,
      cartItem,
      itemIndex,
      onlyRead,
      hideSizeHelp,
      highlightFields
    } = this.props
    const { genderSelectWidth, fitSelectWidth } = this.state
    const headers = onlyRead ? dropRight(headerTitles) : headerTitles
    const isRetailProduct = !cartItem.designId

    const colors = get(cartItem, 'product.colors', [])
    const colorImg = get(cartItem, 'itemDetails[0].colorImage', '')
    const withColorColumn = (isRetailProduct && !!colors.length) || !!colorImg

    const header = headers.map(({ width, message }, index) => {
      // tslint:disable-next-line:curly
      if (index === 1 && !withColorColumn) return
      return (
        <HeaderCell key={index} {...{ width }}>
          <CellContainer>
            <Title
              titleWidth={index === 0 && !onlyRead ? genderSelectWidth : ''}
              align={
                index === headers.length - 1 && onlyRead ? 'center' : 'left'
              }
            >
              {message ? formatMessage(messages[message]) : ''}
            </Title>
            {message === 'size' && !hideSizeHelp && (
              <QuestionSpan key={index} onClick={this.handleOpenFitInfo} />
            )}
          </CellContainer>
        </HeaderCell>
      )
    })

    const fitStyles: FitStyle[] = get(cartItem, 'product.fitStyles', [])
    const fitOptions = fitStyles.map((fs) => {
      return (
        <Option key={fs.id} value={fs.name}>
          {fs.name}
        </Option>
      )
    })

    const fits = get(cartItem, 'product.fitStyles[0].id', null)

    const genders: Filter[] = get(cartItem, 'product.genders', [])
    const genderOptions = genders.map((gender) => {
      return (
        <Option key={gender.id} value={gender.name}>
          {gender.name}
        </Option>
      )
    })

    const sizes: SizeFilter[] = get(cartItem, 'product.sizeRange', [])
    const sizeOptions = sizes.map((size) => {
      return (
        <Option key={size.id} value={size.name}>
          {size.name}
        </Option>
      )
    })

    const renderList = cartItem
      ? cartItem.itemDetails.map((item, index) => {
        const { gender, size, fit, quantity, color, colorImage } = item
        const colorName = color && color.name
        const colorObject = find(colors, { name: colorName })
        return !onlyRead ? (
          <Row key={index} withColor={withColorColumn}>
            <Cell>
              <StyledSelect
                onChange={(e) => this.handleGenderChange(e, index)}
                showSearch={false}
                placeholder={formatMessage(messages.genderPlaceholder)}
                optionFilterProp="children"
                value={gender ? gender.name : undefined}
                selectWidth={genderSelectWidth}
                disabled={cartItem.fixedCart}
                highlightFields={
                  highlightFields && !gender && !!genders.length
                }
              >
                {genderOptions}
              </StyledSelect>
            </Cell>
            {((withColorColumn && !!colorObject) || colorImage) && (
              <Cell>
                <ColorPicker
                  selectedColor={colorObject.id}
                  onSelectColor={(e) => this.handleColorChange(e, index)}
                  productColors={colors}
                  disabled={cartItem.fixedCart}
                />
              </Cell>
            )}
            <Cell>
              <StyledSelect
                onChange={(e) => this.handleSizeChange(e, index)}
                showSearch={false}
                placeholder={formatMessage(messages.sizePlaceholder)}
                optionFilterProp="children"
                value={size ? size.name : undefined}
                selectWidth={fitSelectWidth}
                disabled={cartItem.fixedCart || !sizes.length}
                highlightFields={highlightFields && !size && !!sizes.length}
              >
                {sizeOptions}
              </StyledSelect>
            </Cell>
            <Cell>
              <StyledSelect
                onChange={(e) => this.handleFitChange(e, index)}
                showSearch={false}
                placeholder={formatMessage(messages.fitPlaceholder)}
                optionFilterProp="children"
                value={fit ? fit.name : undefined}
                selectWidth={fitSelectWidth}
                disabled={cartItem.fixedCart || !fits}
                highlightFields={highlightFields && !fit && fits}
              >
                {fitOptions}
              </StyledSelect>
            </Cell>
            {/* TODO: Delete after confirm label won't be necessary in table
              <Cell>
                <StyledInput
                  id={`input${index}`}
                  placeholder={formatMessage(messages.labelPlaceholder)}
                  value={label || ''}
                  onChange={e => this.handleLabelChange(e, index)}
                />
              </Cell> */}
            <Cell>
              <StyledInputNumber
                key={index}
                onChange={(e) => this.handleQuantityChange(e, index)}
                min={1}
                max={249}
                value={quantity || undefined}
                disabled={cartItem.fixedCart}
              />
              {!cartItem.fixedCart && (
                <DeleteItem onClick={this.handleRemove(itemIndex, index)}>
                  —
                </DeleteItem>
              )}
            </Cell>
          </Row>
        ) : (
            <Row key={index} withColor={withColorColumn} {...{ onlyRead }}>
              <InfoCell>{gender && gender.name ? gender.name : '-'}</InfoCell>
              {((withColorColumn && !!colorObject) || colorImage) && (
                <InfoCell>
                  <ProductColor src={colorImage || colorObject.image} />
                </InfoCell>
              )}
              <InfoCell>{size && size.name ? size.name : '-'}</InfoCell>
              <InfoCell>{fit && fit.name ? fit.name : '-'}</InfoCell>
              {/* TODO: Delete after confirm label won't be necessary in table
                <InfoCell>{label || '-'}</InfoCell> */}
              <InfoCell align={'center'}>{quantity || '-'}</InfoCell>
            </Row>
          )
      })
      : null

    return (
      <Table>
        <HeaderRow withColor={withColorColumn} {...{ onlyRead }}>
          {header}
        </HeaderRow>
        {renderList}
      </Table>
    )
  }
}

export default CartListItemTable
