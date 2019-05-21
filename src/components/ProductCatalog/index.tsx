/**
 * ProductCatalog Component - Created by Jesús Apodaca on 09/05/19.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as OrderHistoryAdminActions from './actions'
import {
  Container,
  ScreenTitle,
  SearchInput,
  AddProductButton
} from './styledComponents'
import List from './OrdersList'
import messages from './messages'
import { sorts } from '../../types/common'
import { LIST_SCREEN, DETAILS_SCREEN, FORM_SCREEN } from './constants'
import ProductDetailsAdmin from '../ProductDetailsAdmin'
import ProductForm from '../ProductForm'
interface Props {
  history: any
  currentPage: number
  orderBy: string
  screen: string
  sort: sorts
  productId: string
  searchText: string
  formatMessage: (messageDescriptor: any) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setProductIdAction: (productId: string, screen: string) => void
  setSearchTextAction: (searchText: string) => void
}

class ProductCatalog extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }
  addNewProduct = () => {
    const { setProductIdAction } = this.props
    setProductIdAction('', 'form')
  }

  handleOnSortClick = (label: string, sort: sorts) => {
    const { setOrderByAction } = this.props
    setOrderByAction(label, sort)
  }

  handleOnProductClick = (productId: string, screen = 'details') => {
    const { setProductIdAction } = this.props
    setProductIdAction(productId, screen)
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { setSearchTextAction } = this.props
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    setSearchTextAction(value)
  }
  handleEditProduct = () => {
    const { setProductIdAction, productId } = this.props
    setProductIdAction(productId, 'form')
  }
  render() {
    const {
      currentPage,
      orderBy,
      sort,
      screen,
      formatMessage,
      productId,
      searchText
    } = this.props

    switch (screen) {
      case LIST_SCREEN:
        return (
          <Container>
            <ScreenTitle>
              <FormattedMessage {...messages.title} />
            </ScreenTitle>
            <AddProductButton onClick={this.addNewProduct}>
              {formatMessage(messages.addProductLabel)}
            </AddProductButton>
            <SearchInput
              value={searchText}
              onChange={this.handleInputChange}
              placeholder={formatMessage(messages.search)}
            />
            <List
              {...{ formatMessage, currentPage, orderBy, sort, searchText }}
              onSortClick={this.handleOnSortClick}
              onProductClick={this.handleOnProductClick}
              onChangePage={this.handleOnChangePage}
              interactiveHeaders={true}
            />
          </Container>
        )
      case DETAILS_SCREEN:
        return (
          <ProductDetailsAdmin
            {...{ productId, formatMessage }}
            goBack={this.handleOnProductClick}
          />
        )
      case FORM_SCREEN:
        return (
          <ProductForm
            {...{ productId, formatMessage }}
            goBack={this.handleOnProductClick}
          />
        )
      default:
        return <div>Screen not found</div>
    }
  }
}

const mapStateToProps = (state: any) => state.get('productCatalogAdmin').toJS()

const ProductCatalogEnhance = compose(
  connect(
    mapStateToProps,
    { ...OrderHistoryAdminActions }
  )
)(ProductCatalog)

export default ProductCatalogEnhance
