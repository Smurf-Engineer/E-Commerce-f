/**
 * Item - Created by eduardoquintero on 09/12/19.
 */
import * as React from 'react'
import RadioButton from 'antd/lib/radio/radio'
import { compose } from 'react-apollo'
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource
} from 'react-dnd'
import { findDOMNode } from 'react-dom'
import messages from './messages'
import {
  Container,
  Name,
  Row,
  Buttons,
  EditButton,
  DragIcon,
  DeleteButton
} from './styledComponents'
import { Message } from '../../../types/common'

interface Props {
  id: number
  index: number
  name: string
  selected: boolean
  editable?: boolean
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
  isOver: boolean
  section: string
  onEditItem?: (id: number) => void
  onSelectItem: (id: number) => void
  onDeleteItem: (id: number) => void
  onDropRow: (dragIndex: number, dropIndex: number) => void
  formatMessage: (messageDescriptor: Message) => string
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

class DesignItem extends React.PureComponent<Props> {
  render() {
    const {
      name,
      id,
      editable = false,
      connectDragSource,
      connectDropTarget,
      isOver,
      formatMessage
    } = this.props
    const renderView = (
      <Container className={isOver ? 'over' : ''}>
        <Row>
          <DragIcon type="ellipsis" />
          <DragIcon type="ellipsis" />
          <RadioButton value={id} />
          <Name>{name}</Name>
        </Row>
        <Buttons>
          {editable && (
            <EditButton type="ghost" onClick={this.handleOnEdit}>
              {formatMessage(messages.edit)}
            </EditButton>
          )}
          <DeleteButton onClick={this.handleOnDelete}>
            {formatMessage(messages.delete)}
          </DeleteButton>
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

const DropTargetHOC = DropTarget('item', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))

const DesignItemDraggable = compose(DragSourceHOC, DropTargetHOC)(DesignItem)

export default DesignItemDraggable
