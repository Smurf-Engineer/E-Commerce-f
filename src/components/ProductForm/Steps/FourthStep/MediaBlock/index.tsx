/**
 * AddressData Component - Created by miguelcanobbio on 18/07/18.
 */
import * as React from 'react'
import {
  Container,
  ImageBox,
  MediaFooter,
  FileName,
  FileExtension,
  DeleteFile
} from './styledComponents'
import { compose } from 'react-apollo'
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource
} from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import videoPlaceHolder from '../../../../../assets/video-placeholder.jpg'
import { ProductFile } from '../../../../../types/common'

interface Props {
  mediaFile: ProductFile
  index: number
  section: string
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
  openMedia: (file: ProductFile) => () => void
  onDropRow: (dragIndex: number, dropIndex: number) => void
  removeMediaFile: (index: number) => () => void
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

class MediaBlockDrag extends React.PureComponent<Props> {
  render() {
    const {
      openMedia,
      mediaFile,
      removeMediaFile,
      index,
      connectDragSource,
      connectDropTarget
    } = this.props
    const renderView = (
      <Container>
        <ImageBox
          onClick={openMedia(mediaFile)}
          clickable={!mediaFile.toUpload}
          src={
            mediaFile.extension === '.mp4' ? videoPlaceHolder : mediaFile.url
          }
          alt="avatar"
        />
        <MediaFooter>
          <div>
            <FileName>{mediaFile.name}</FileName>
            <FileExtension>{mediaFile.extension}</FileExtension>
          </div>
          <DeleteFile onClick={removeMediaFile(index)}>
            <FormattedMessage {...messages.delete} />
          </DeleteFile>
        </MediaFooter>
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
const MediaBlock = compose(
  DragSourceHOC,
  DropTargetHOC
)(MediaBlockDrag)

export default MediaBlock
