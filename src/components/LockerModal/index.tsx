/**
 * LockerModal Component - Created by david on 10/04/18.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'antd/lib/modal'
import { desginsQuery } from './data'
import { graphql, compose } from 'react-apollo'
import zenscroll from 'zenscroll'
import get from 'lodash/get'
import Pagination from 'antd/lib/pagination'
import Spin from 'antd/lib/spin'
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
  bodyStyle
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
  onSelectItem: (item: SelectedDesignType, checked: boolean) => void
  onUnselectItem: (keyName: string) => void
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
      onUnselectItem(`${designId}`)
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
      currentPage,
      limit,
      data
    } = this.props
    let screen
    if (!data.loading) {
      const { designs = [] } = data.designsResult

      screen = designs.map(
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
            {...{ name, image, productId, description, type }}
            date={createdAt}
          />
        )
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
        <Title>My Locker</Title>
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
}

const LockerModalDesignsEnhance = compose(
  graphql<Data>(desginsQuery, {
    options: ({ currentPage, offset, limit }: OwnProps) => {
      return {
        variables: { limit, currentPage, offset }
      }
    }
  })
)(LockerModal)

export default LockerModalDesignsEnhance
