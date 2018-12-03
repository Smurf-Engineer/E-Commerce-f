/**
 * DesignItem Component - Created by david on 13/07/18.
 */
import * as React from 'react'
import Checkbox from 'antd/lib/checkbox'
import Button from 'antd/lib/button'
import { compose } from 'react-apollo'
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource
} from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { Container, Name, Row, Buttons, EditButton } from './styledComponents'

interface Props {
  id: number
  index: number
  name: string
  selected: boolean
  editable?: boolean
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
  onEditItem?: (id: number) => void
  onSelectItem: (id: number) => void
  onDeleteItem: (id: number) => void
  onMoveRow: (dragIndex: number, hoverIndex: number) => void
}

const rowSource = {
  beginDrag({ id, index }: Props) {
    return {
      id,
      index
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

    props.onMoveRow(dragIndex, hoverIndex)

    monitor.getItem().index = hoverIndex
  }
}

class DesignItem extends React.PureComponent<Props> {
  render() {
    const {
      name,
      selected,
      editable = false,
      connectDragSource,
      connectDropTarget
    } = this.props
    const renderView = (
      <Container>
        <Row>
          <Checkbox checked={selected} onChange={this.handleOnChange} />
          <Name>{name}</Name>
        </Row>
        <Buttons>
          <Button type="ghost" onClick={this.handleOnDelete}>
            Delete
          </Button>
          {editable && (
            <EditButton type="primary" onClick={this.handleOnEdit}>
              Edit
            </EditButton>
          )}
        </Buttons>
      </Container>
    )
    return connectDragSource(connectDropTarget(<div>{renderView}</div>))
  }

  handleOnChange = () => {
    const { onSelectItem, id } = this.props
    onSelectItem(id)
  }
  handleOnDelete = () => {
    const { onDeleteItem, id } = this.props
    onDeleteItem(id)
  }
  handleOnEdit = () => {
    const { onEditItem, index } = this.props
    onEditItem!(index)
  }
}

const DragSourceHOC = DragSource('item', rowSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
const DropTargetHOC = DropTarget('item', rowTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))

const DesignItemDraggable = compose(
  DragSourceHOC,
  DropTargetHOC
)(DesignItem)

export default DesignItemDraggable
