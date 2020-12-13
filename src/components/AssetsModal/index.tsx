import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'antd/lib/modal'
import { FormattedMessage } from 'react-intl'
import { userfilesQuery } from './data'
import { graphql, compose } from 'react-apollo'
import zenscroll from 'zenscroll'
import Spin from 'antd/lib/spin'
import find from 'lodash/find'
import messages from './messages'
import {
  QueryProps,
  DesignResultType,
  Message,
  ImageFile
} from '../../types/common'
import {
  Title,
  List,
  modalStyle,
  bodyStyle,
  NotFound,
  ImageContainer,
  Images,
  Image
} from './styledComponents'

interface Data extends QueryProps {
  images: ImageFile[]
}

interface Props {
  data: Data
  visible: boolean
  selectedFiles: ImageFile[]
  client: any
  lockerSelectedFiles: ImageFile[]
  onSelectItem: (item: ImageFile) => void
  onUnselectItem: (elementId: number) => void
  onRequestClose: () => void
  onAddItems: () => void
  setDesignsData: (data: DesignResultType, offset: number, page: number) => void
  changePage: (offset: number) => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

export class AssetsModal extends React.PureComponent<Props, {}> {
  private listRef: any
  onChangePage = (page: number) => {
    const { changePage } = this.props
    const node = ReactDOM.findDOMNode(this.listRef) as HTMLElement
    const modalScroller = zenscroll.createScroller(node, 0)
    modalScroller.toY(0, 0)
    changePage(page)
  }

  render() {
    const {
      visible,
      onRequestClose,
      formatMessage,
      onSelectItem,
      onAddItems,
      onUnselectItem,
      data,
      lockerSelectedFiles,
      selectedFiles
    } = this.props
    let screen
    if (!data.loading) {
      const { images = [] } = data
      screen = images.length ? (
        <Images>
          {images.map(
            (file) => {
              const { id, fileUrl } = file
              const selected = find(lockerSelectedFiles, ['id', id])
              const hidden = find(selectedFiles, ['id', id])
              const handleSelectItem = () => !selected ? onSelectItem(file) : onUnselectItem(id)
              return !hidden && (
                <ImageContainer key={id} onClick={handleSelectItem}>
                  <Image src={fileUrl} selected={!!selected} />
                </ImageContainer>
              )}
          )}
        </Images>
      ) : (
          <NotFound>
            <FormattedMessage {...messages.noAssets} />
          </NotFound>
        )
    } else {
      screen = <Spin />
    }

    return (
      <Modal
        {...{ visible, bodyStyle }}
        closable={false}
        onOk={onAddItems}
        onCancel={onRequestClose}
        style={modalStyle}
        maskStyle={{ backgroundColor: 'rgba(241,244,245,0.5)' }}
        destroyOnClose={true}
        okText={formatMessage(messages.import)}
      >
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <List
          ref={(listObject: any) => {
            this.listRef = listObject
          }}
        >
          {screen}
        </List>
      </Modal>
    )
  }
}

const AssetsModalEnhance = compose(
  graphql<Data>(userfilesQuery)
)(AssetsModal)

export default AssetsModalEnhance
