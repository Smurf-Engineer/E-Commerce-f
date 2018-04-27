/**
 * ProductRow Component - Created by david on 12/04/18.
 */
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { compose } from 'react-apollo'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../dndTypes'
import {
  Row,
  Cell,
  Price,
  DeleteButton,
  Center,
  Name,
  Description
} from '../styledComponents'
import Checkbox from 'antd/lib/checkbox'
import Thumbnail from '../ProductImage'

interface Props {
  index: number
  productId: number
  image: string
  name: string
  description: string
  startingPrice: number
  targetPrice: number
  currentOrders: number
  currentPrice: number
  visible: boolean
  yotpoId: string
  id?: number
  text?: string
  isDragging?: () => boolean
  connectDragSource?: any
  connectDropTarget?: any
  moveRow: (dragIndex: number, hoverIndex: number) => void
  onPressDelete: (index: number) => void
  onPressQuickView: (
    id: number,
    yotpoId: string,
    hideSliderButtons?: boolean
  ) => void
  onPressVisible: (index: number, checked: boolean) => void
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

class ProductRow extends React.PureComponent<Props, {}> {
  render() {
    const {
      index,
      productId,
      image,
      name,
      description,
      startingPrice,
      targetPrice,
      currentOrders,
      currentPrice,
      visible,
      yotpoId,
      onPressDelete,
      onPressQuickView,
      onPressVisible,
      connectDragSource,
      connectDropTarget
    } = this.props

    const handleOnClick = () => onPressDelete(index)
    const handleOnClickView = () => onPressQuickView(productId, yotpoId, true)
    const handleOnClickVisible = (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked
      onPressVisible(index, checked)
    }
    return connectDragSource(
      connectDropTarget(
        <div>
          <Row>
            <Cell width={15}>
              <Thumbnail {...{ image }} onPressQuickView={handleOnClickView} />
            </Cell>
            <Cell width={25}>
              <Name>{name}</Name>
              <Description>{description}</Description>
            </Cell>
            <Cell>
              <Price>{`$${startingPrice}`}</Price>
            </Cell>
            <Cell>
              <Price>{`$${targetPrice}`}</Price>
            </Cell>
            <Cell>
              <Price>{currentOrders}</Price>
            </Cell>
            <Cell>
              <Price>{`$${currentPrice}`}</Price>
            </Cell>
            <Cell>
              <Center>
                <Checkbox checked={visible} onChange={handleOnClickVisible} />
              </Center>
            </Cell>
            <Cell>
              <DeleteButton onClick={handleOnClick}>DELETE</DeleteButton>
            </Cell>
          </Row>
        </div>
      )
    )
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
