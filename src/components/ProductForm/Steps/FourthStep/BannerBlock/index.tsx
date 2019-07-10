/**
 * AddressData Component - Created by miguelcanobbio on 18/07/18.
 */
import * as React from 'react'
import {
  Container,
  MaterialButton,
  MaterialButtons,
  MaterialImage
} from './styledComponents'
import { compose } from 'react-apollo'
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource
} from 'react-dnd'
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { findDOMNode } from 'react-dom'

interface Props {
  id: number
  url: string
  selected: boolean
  index: number
  section: string
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
  handleRemoveMaterial: (index: number) => () => void
  handleCheckMaterial: (event: CheckboxChangeEvent) => void
  onDropRow: (dragIndex: number, dropIndex: number) => void
}
const rowSource = {
  beginDrag({ id, index, section }: Props) {
    return {
      id,
      index,
      section
    }
  }
}

const rowTarget = {
  hover(props: Props, monitor: any, component: any) {
    const dragIndex = monitor.getItem().index
    const dragSection = monitor.getItem().section
    const hoverIndex = props.index
    const hoverSection = props.section

    if (dragIndex === hoverIndex || hoverSection !== dragSection) {
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
  },
  drop(props: Props, monitor: any, component: any) {
    const dragIndex = monitor.getItem().index
    const dragSection = monitor.getItem().section
    const dropIndex = props.index
    const hoverSection = props.section

    if (dragIndex === dropIndex || hoverSection !== dragSection) {
      return
    }

    props.onDropRow(dragIndex, dropIndex)
  }
}

class BannerBlockDrag extends React.PureComponent<Props> {
  render() {
    const {
      id,
      url,
      selected,
      handleCheckMaterial,
      handleRemoveMaterial,
      index,
      connectDragSource,
      connectDropTarget
    } = this.props
    const renderView = (
      <Container>
        <MaterialButtons>
          <MaterialButton onClick={handleRemoveMaterial(index)} type="close" />
          <Checkbox
            name={id}
            onChange={handleCheckMaterial}
            checked={selected}
          />
        </MaterialButtons>
        <MaterialImage src={url} alt="avatar" />
      </Container>
    )
    return connectDragSource(connectDropTarget(<div>{renderView}</div>))
  }
}

const DragSourceHOC = DragSource('item', rowSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

const DropTargetHOC = DropTarget('item', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
const BannerBlock = compose(
  DragSourceHOC,
  DropTargetHOC
)(BannerBlockDrag)

export default BannerBlock
