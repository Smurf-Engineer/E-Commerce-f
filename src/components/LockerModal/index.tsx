/**
 * LockerModal Component - Created by david on 10/04/18.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'antd/lib/modal'
import zenscroll from 'zenscroll'
import find from 'lodash/find'
import Pagination from 'antd/lib/pagination'
import ProductThumbnail from '../../components/ProductThumbnailStore'
import {
  QueryProps,
  DesignResultType,
  DesignType,
  SelectedItem,
  SelectedDesignType
} from '../../types/common'
import { Title, List, modalStyle, PaginationRow } from './styledComponents'

interface Data extends QueryProps {
  pagination: DesignResultType
}

interface Props {
  data: Data
  visible: boolean
  selectedItems: SelectedDesignType
  tableItems: SelectedItem
  client: any
  offset: number
  currentPage: number
  limit: number
  fullCount: string
  designs: DesignType[]
  onSelectItem: (item: SelectedDesignType, checked: boolean) => void
  onUnselectItem: (index: number) => void
  onRequestClose: () => void
  onAddItems: () => void
  setDesignsData: (data: DesignResultType, offset: number, page: number) => void
  changePage: (offset: number) => void
}

export class LockerModal extends React.PureComponent<Props, {}> {
  private listRef: any
  handleOnItemSelect = (index: number, checked: boolean) => {
    const { onSelectItem, designs } = this.props
    const selectedItem = Object.assign(
      {},
      { visible: true, design: designs[index] }
    )
    onSelectItem(selectedItem, checked)
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
      fullCount,
      designs = []
    } = this.props

    const list = designs.map(
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
          checked={
            find(
              selectedItems,
              selectedItem => selectedItem.design.id === id
            ) || tableItems[id]
          }
          disabled={tableItems[id]}
          id={index}
          product={product}
          onSelectItem={this.handleOnItemSelect}
          {...{ name, image, productId, description, type }}
          date={createdAt}
        />
      )
    )

    return (
      <Modal
        {...{ visible }}
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
          {list}
        </List>
        <PaginationRow>
          {Number(fullCount) > limit && (
            <Pagination
              size="small"
              current={currentPage}
              onChange={this.onChangePage}
              total={Number(fullCount)}
              pageSize={limit}
            />
          )}
        </PaginationRow>
      </Modal>
    )
  }
}

export default LockerModal
