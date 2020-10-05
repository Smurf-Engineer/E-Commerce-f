/**
 * ProductRow Component - Created by david on 12/04/18.
 */
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { compose } from 'react-apollo'
import { DragSource, DropTarget } from 'react-dnd'
import screenMessage from 'antd/lib/message'
import ItemTypes from '../dndTypes'
import { isNumber } from '../../../utils/utilsFiles'
import {
  Row,
  Cell,
  DeleteButton,
  Center,
  Name,
  Description,
  Title,
  Price,
  MoreIcon,
  MobileLocker,
  DesktopLocker,
  DragCell
} from '../styledComponents'
import { Align, StyledInput } from './styledComponents'
import Checkbox from 'antd/lib/checkbox'
import Thumbnail from '../ProductImage'
import messages from '../messages'

interface Props {
  index: number
  productId: number
  image: string
  name: string
  description: string
  visible: boolean
  yotpoId: string
  totalOrders: number
  id?: number
  text?: string
  regularPrice?: string
  hideQuickView?: boolean
  isReseller?: boolean
  currencyIndex?: number
  resellerComission?: number
  resellerPrice?: number
  fixedPrice?: number
  isDragging?: () => boolean
  connectDragSource?: any
  connectDropTarget?: any
  handleOnSetPrice: (value: number, currency: number, itemIndex: number) => void
  moveRow: (dragIndex: number, hoverIndex: number) => void
  onPressDelete: (index: number) => void
  onPressQuickView: (
    id: number,
    yotpoId: string,
    hideSliderButtons?: boolean
  ) => void
  onPressVisible: (index: number, checked: boolean) => void
  formatMessage: (messageDescriptor: any) => string
}

const rowSource = {
  beginDrag(props: Props) {
    return {
      id: props.productId,
      index: props.index
    }
  }
}

const rowTarget = {
  hover(props: Props, monitor: any, component: any) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.moveRow(dragIndex, hoverIndex)

    monitor.getItem().index = hoverIndex
  }
}

interface Header {
  message: string
  width?: number
}

const headerTitles: Header[] = [
  { message: 'regularPrice', width: 30 },
  { message: 'fixedPrice', width: 30 },
  { message: 'visible', width: 40 }
]

class ProductRow extends React.PureComponent<Props, {}> {
  onSetPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const { index, handleOnSetPrice, currencyIndex } = this.props
    if (!isNumber(value) && value !== '') {
      return
    }
    handleOnSetPrice(Number(value), currencyIndex, index)
  }
  validateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { fixedPrice = 0, currencyIndex, index, handleOnSetPrice } = this.props
    const { target: { value } } = event
    if (value < fixedPrice) {
      handleOnSetPrice(Number(fixedPrice), currencyIndex, index)
    }
  }
  render() {
    const {
      index,
      productId,
      image,
      name,
      isReseller,
      resellerComission = 0,
      resellerPrice = 0,
      description,
      visible,
      yotpoId,
      totalOrders,
      onPressDelete,
      onPressQuickView,
      onPressVisible,
      connectDragSource,
      connectDropTarget,
      formatMessage,
      regularPrice,
      fixedPrice = 0,
      hideQuickView
    } = this.props

    const handleOnClick = () => {
      if (totalOrders) {
        screenMessage.error(formatMessage(messages.cannotDelete))
        return
      }
      onPressDelete(index)
    }
    const handleOnClickView = () => onPressQuickView(productId, yotpoId, true)
    const handleOnClickVisible = (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked
      onPressVisible(index, checked)
    }

    const mobileTitles = headerTitles.map(({ width = 100, message }, key) => (
      <Cell {...{ key, width }}>
        <Title>{message ? formatMessage(messages[message]) : ''}</Title>
      </Cell>
    ))
    const purchasePrice = (fixedPrice * (1 - (resellerComission / 100))).toFixed(2)
    const profit = ((resellerPrice || fixedPrice) - Number(purchasePrice)).toFixed(2)
    const badInput = resellerPrice < fixedPrice
    const renderView = (
      <>
        <MobileLocker>
          <Row>
            <Cell width={45}>
              <Thumbnail
                {...{ image, hideQuickView }}
                onPressQuickView={handleOnClickView}
              />
            </Cell>
            <Cell width={45}>
              <Name>{name}</Name>
              <Description>{description}</Description>
            </Cell>
          </Row>
          <Row>{mobileTitles}</Row>
          <Row noBorder={true} rowPadding={'0'}>
            <Cell width={33}>
              <Price>{`$${regularPrice}`}</Price>
            </Cell>
            <Cell width={40}>
              <Price>{`$${fixedPrice}`}</Price>
            </Cell>
            {isReseller &&
              <Cell width={40}>
                <Price>{`$${fixedPrice}`}</Price>
              </Cell>
            }
            <Cell width={40}>
              <Checkbox checked={visible} onChange={handleOnClickVisible} />
            </Cell>
          </Row>
          <Row rowPadding={'0'}>
            <Align align="right" componentWidth={'100%'}>
              <DeleteButton onClick={handleOnClick}>DELETE</DeleteButton>
            </Align>
          </Row>
        </MobileLocker>
        <DesktopLocker>
          <Row>
            <Cell width={5} tabletWidth={5}>
              <DragCell>
                <MoreIcon type="ellipsis" />
                <MoreIcon type="ellipsis" />
              </DragCell>
            </Cell>
            <Cell width={20} tabletWidth={20}>
              <Thumbnail
                {...{ image, hideQuickView }}
                onPressQuickView={handleOnClickView}
              />
            </Cell>
            <Cell width={10} tabletWidth={10}>
              <Name>{name}</Name>
            </Cell>
            <Cell width={10} tabletWidth={10}>
              <Description>{description}</Description>
            </Cell>
            <Cell width={10} tabletWidth={10}>
              <Price>{`$${isReseller ? fixedPrice : regularPrice}`}</Price>
            </Cell>
            <Cell width={10} tabletWidth={10}>
              <Price>{`$${isReseller ? purchasePrice : fixedPrice}`}</Price>
            </Cell>
            {isReseller &&
              <Cell width={10} tabletWidth={10}>
                <StyledInput
                  {...{ badInput }}
                  id={index}
                  onBlur={this.validateInput}
                  defaultValue={fixedPrice}
                  onChange={this.onSetPrice}
                  value={resellerPrice}
                />
              </Cell>
            }
            <Cell width={10} tabletWidth={10}>
              <Price>{isReseller ? `$${profit}` : totalOrders}</Price>
            </Cell>
            <Cell width={10} tabletWidth={10}>
              <Center>
                <Checkbox checked={visible} onChange={handleOnClickVisible} />
              </Center>
            </Cell>
            <Cell width={14} tabletWidth={15}>
              <DeleteButton onClick={handleOnClick}>DELETE</DeleteButton>
            </Cell>
          </Row>
        </DesktopLocker>
      </>
    )
    return connectDragSource(connectDropTarget(<div>{renderView}</div>))
  }
}

const DragSourceHOC = DragSource(
  ItemTypes.ROW,
  rowSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)
const DropTargetHOC = DropTarget(ItemTypes.ROW, rowTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))

const ProductRowEnhance = compose(DragSourceHOC, DropTargetHOC)(ProductRow)
export default ProductRowEnhance
