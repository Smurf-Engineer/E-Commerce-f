/**
 * LockerModal Component - Created by david on 10/04/18.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'antd/lib/modal'
import { FormattedMessage } from 'react-intl'
import { desginsQuery } from './data'
import { graphql, compose } from 'react-apollo'
import zenscroll from 'zenscroll'
import get from 'lodash/get'
import Pagination from 'antd/lib/pagination'
import Spin from 'antd/lib/spin'
import messages from './messages'
import ProductThumbnail from '../../components/ProductThumbnailStore'
import {
  QueryProps,
  DesignResultType,
  DesignType,
  SelectedItem,
  SelectedDesignType,
  SelectedDesignObjectType
} from '../../types/common'
import {
  Title,
  List,
  modalStyle,
  PaginationRow,
  bodyStyle,
  NotFound
} from './styledComponents'

interface Data extends QueryProps {
  designsResult: DesignResultType
}

interface Props {
  data: Data
  visible: boolean
  selectedItems: SelectedDesignObjectType
  tableItems: SelectedItem
  client: any
  offset: number
  currentPage: number
  limit: number
  proDesign?: boolean
  title?: string
  userId?: string
  onSelectItem: (item: SelectedDesignType, checked: boolean) => void
  onUnselectItem: (id: number) => void
  onRequestClose: () => void
  onAddItems: () => void
  setDesignsData: (data: DesignResultType, offset: number, page: number) => void
  changePage: (offset: number) => void
}

export class LockerModal extends React.PureComponent<Props, {}> {
  private listRef: any
  handleOnItemSelect = (index: number, checked: boolean) => {
    const {
      onSelectItem,
      selectedItems,
      onUnselectItem,
      data: {
        designsResult: { designs }
      }
    } = this.props
    const selectedItem = Object.assign(
      {},
      { visible: true, design: designs[index] }
    )
    const designId = get(designs[index], 'id', -1)
    if (selectedItems[designId]) {
      onUnselectItem(designId)
    } else {
      onSelectItem(selectedItem, checked)
    }
  }
  onChangePage = (page: number) => {
    const { changePage } = this.props
    const node = ReactDOM.findDOMNode(this.listRef) as HTMLElement
    const modalScroller = zenscroll.createScroller(node, 0)
    modalScroller.toY(0, 0)
    changePage(page)
  }

  handleOnAddItems = () => {
    const { onAddItems } = this.props
    onAddItems()
  }

  render() {
    const {
      visible,
      onRequestClose,
      selectedItems,
      tableItems,
      proDesign,
      currentPage,
      limit,
      title,
      data
    } = this.props
    let screen
    if (!data.loading) {
      const { designs = [] } = data.designsResult
      screen = designs.length ? (
        designs.map(
          (
            {
              id,
              name,
              image,
              createdAt,
              product: { id: productId, description, type },
              product
            }: DesignType,
            index
          ) => (
            <ProductThumbnail
              key={id}
              checked={selectedItems[id] || tableItems[id]}
              disabled={tableItems[id]}
              id={index}
              product={product}
              onSelectItem={this.handleOnItemSelect}
              {...{ name, image, productId, description, type, proDesign }}
              date={createdAt}
            />
          )
        )
      ) : (
        <NotFound>
          <FormattedMessage {...messages.noDesigns} />
        </NotFound>
      )
    } else {
      screen = <Spin />
    }

    return (
      <Modal
        {...{ visible, bodyStyle }}
        closable={false}
        onOk={this.handleOnAddItems}
        onCancel={onRequestClose}
        style={modalStyle}
        maskStyle={{ backgroundColor: 'rgba(241,244,245,0.5)' }}
        destroyOnClose={true}
        okText="ADD"
        cancelText="Cancel"
      >
        <Title>
          {title ? (
            <FormattedMessage {...messages.locker} values={{ title }} />
          ) : (
            <FormattedMessage {...messages.myLocker} />
          )}
        </Title>
        <List
          ref={(listObject: any) => {
            this.listRef = listObject
          }}
        >
          {screen}
        </List>
        <PaginationRow>
          {!data.loading && Number(data.designsResult.fullCount) > limit && (
            <Pagination
              size="small"
              current={currentPage}
              onChange={this.onChangePage}
              total={Number(data.designsResult.fullCount)}
              pageSize={limit}
            />
          )}
        </PaginationRow>
      </Modal>
    )
  }
}

interface OwnProps {
  offset?: number
  currentPage?: number
  limit?: number
  userId?: string
  proDesign?: boolean
}

const LockerModalDesignsEnhance = compose(
  graphql<Data>(desginsQuery, {
    options: ({ currentPage, offset, limit, userId, proDesign }: OwnProps) => {
      return {
        variables: {
          limit,
          currentPage,
          offset,
          userId,
          proDesignOnly: proDesign
        }
      }
    }
  })
)(LockerModal)

export default LockerModalDesignsEnhance
