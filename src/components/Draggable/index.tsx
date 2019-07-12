/**
 * AddressData Component - Created by miguelcanobbio on 18/07/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource
} from 'react-dnd'
import { findDOMNode } from 'react-dom'

interface Props {
  index: number
  id: number
  children: React.ReactChildren
  section: string
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
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
class DraggableItem extends React.PureComponent<Props> {
  render() {
    const { children, connectDragSource, connectDropTarget } = this.props
    return connectDragSource(connectDropTarget(<div>{children}</div>))
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
const Draggable = compose(
  DragSourceHOC,
  DropTargetHOC
)(DraggableItem)

export default Draggable
