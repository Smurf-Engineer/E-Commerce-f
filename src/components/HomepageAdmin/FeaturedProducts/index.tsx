/**
 * FeaturedProducts Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import { Container, ScreenTitle, AddProductButton } from './styledComponents'
import ProductsModal from '../../ProductsModal'
import ProductTable from '../../ProductTable'
import messages from './messages'
import { Product } from '../../../types/common'

interface Props {
  products: Product[]
  currentPage: number
  fullCount: string
  limit: number
  selectedItems: any
  productsModalOpen: boolean
  items: any
  changePage: (offset: number) => void
  formatMessage: (messageDescriptor: any) => string
  onSelectItem: (item: any, checked: boolean) => void
  openModal: (open: boolean) => void
  setItemsAdd: () => void
  onPressDelete: (index: number, id: number) => void
}

class FeaturedProducts extends React.Component<Props, {}> {
  handleOnCloseModal = () => {
    const { openModal } = this.props
    openModal(false)
  }
  handleOnOpenModal = () => {
    const { openModal } = this.props
    openModal(true)
  }
  render() {
    const {
      formatMessage,
      products,
      currentPage,
      fullCount,
      limit,
      changePage,
      selectedItems,
      onSelectItem,
      productsModalOpen,
      items,
      setItemsAdd,
      onPressDelete
    } = this.props

    return (
      <Container>
        <ScreenTitle>{formatMessage(messages.title)}</ScreenTitle>
        <AddProductButton onClick={this.handleOnOpenModal}>
          {formatMessage(messages.addProduct)}
        </AddProductButton>
        <ProductTable
          {...{ formatMessage, items }}
          onPressDelete={onPressDelete}
        />
        <ProductsModal
          {...{
            selectedItems,
            tableItems: items,
            formatMessage,
            products,
            currentPage,
            fullCount,
            limit,
            changePage,
            onSelectItem
          }}
          visible={productsModalOpen}
          onRequestClose={this.handleOnCloseModal}
          onAddItems={setItemsAdd}
        />
      </Container>
    )
  }
}

export default FeaturedProducts
