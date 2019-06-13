/**
 * ProductsModal Component - Created by eduardoquintero on 30/05/19.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'antd/lib/modal'
import find from 'lodash/find'
import Pagination from 'antd/lib/pagination'
import messages from './messages'
import ProductThumbnail from '../../components/ProductThumbnailStore'
import { QueryProps, DesignResultType, Product } from '../../types/common'
import { Title, List, modalStyle, PaginationRow } from './styledComponents'

interface Data extends QueryProps {
  pagination: DesignResultType
}

interface Props {
  data: Data
  visible: boolean
  selectedItems: any
  tableItems: any
  client: any
  offset: number
  currentPage: number
  limit: number
  fullCount: string
  products: Product[]
  formatMessage: (messageDescriptor: any) => string
  onSelectItem: (item: any, checked: boolean) => void
  onRequestClose: () => void
  onAddItems: () => void
  setDesignsData: (data: DesignResultType, offset: number, page: number) => void
  changePage: (offset: number) => void
}

export class ProductsModal extends React.PureComponent<Props, {}> {
  private listRef: any
  handleOnItemSelect = (index: number, checked: boolean) => {
    const { onSelectItem, products } = this.props
    const selectedItem = Object.assign(
      {},
      { visible: true },
      { product: products[index] }
    )
    onSelectItem(selectedItem, checked)
  }
  onChangePage = (page: number) => {
    const { changePage } = this.props
    const node = ReactDOM.findDOMNode(this.listRef) as HTMLElement
    node.scrollTop = 0
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
      products = [],
      formatMessage
    } = this.props

    const list = products.map(
      ({ id, name, images, description, type }: Product, index) => {
        const foundItemTableId = find(
          tableItems,
          tableItem => tableItem.product.id === id
        )
        return (
          <ProductThumbnail
            key={id}
            checked={
              find(
                selectedItems,
                selectedItem => selectedItem.product.id === id
              ) || foundItemTableId
            }
            disabled={foundItemTableId}
            id={index}
            onSelectItem={this.handleOnItemSelect}
            {...{ name, image: images[0].front, description, type }}
          />
        )
      }
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
        <Title>{formatMessage(messages.title)}</Title>
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

export default ProductsModal
