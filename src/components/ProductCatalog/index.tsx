/**
 * ProductCatalog Component - Created by Jesús Apodaca on 09/05/19.
 */
import * as React from 'react'
import { Route } from 'react-router-dom'
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
import { sorts, UserPermissions } from '../../types/common'
import ProductDetailsAdmin from '../ProductDetailsAdmin'
import ProductForm from '../ProductForm'
import { PRODUCT_CATALOG, ADMIN_ROUTE } from '../AdminLayout/constants'
interface Props {
  history: any
  currentPage: number
  orderBy: string
  screen: string
  sort: sorts
  productId: string
  searchText: string
  permissions: UserPermissions
  formatMessage: (messageDescriptor: any) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setSearchTextAction: (searchText: string) => void
}

class ProductCatalog extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }
  addNewProduct = () => {
    const { history } = this.props
    history.push('/admin/products/form')
  }

  handleOnSortClick = (label: string, sort: sorts) => {
    const { setOrderByAction } = this.props
    setOrderByAction(label, sort)
  }

  handleOnProductClick = (productId: string, screen = 'details') => {
    const { history } = this.props
    if (screen === 'details') {
      history.push(`/admin/product?id=${productId}`)
    } else {
      history.push('/admin/products')
    }
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
    const { productId, history } = this.props
    history.push(`/admin/products/form/${productId}`)
  }
  render() {
    const {
      currentPage,
      orderBy,
      sort,
      history,
      permissions,
      formatMessage,
      searchText
    } = this.props
    const access = permissions[PRODUCT_CATALOG] || {}
    if (!access.view) {
      history.replace(ADMIN_ROUTE)
    }
    return (
      <div>
        <Route
          path="/admin/products"
          exact={true}
          render={() => (
            <Container>
              <ScreenTitle>
                <FormattedMessage {...messages.title} />
              </ScreenTitle>
              {access.edit && (
                <AddProductButton onClick={this.addNewProduct}>
                  {formatMessage(messages.addProductLabel)}
                </AddProductButton>
              )}
              <SearchInput
                value={searchText}
                onChange={this.handleInputChange}
                placeholder={formatMessage(messages.search)}
              />
              <List
                {...{ formatMessage, currentPage, orderBy, sort, searchText }}
                onSortClick={this.handleOnSortClick}
                canEdit={access.edit}
                onProductClick={this.handleOnProductClick}
                onChangePage={this.handleOnChangePage}
                interactiveHeaders={true}
              />
            </Container>
          )}
        />
        <Route
          path="/admin/product"
          render={() => (
            <div>
              <ProductDetailsAdmin
                {...{ formatMessage, history }}
                canEdit={access.edit}
              />
            </div>
          )}
        />
        <Route
          path="/admin/products/form/:id?"
          render={() => (
            <div>
              <ProductForm
                {...{ formatMessage, history }}
                canEdit={access.edit}
              />
            </div>
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => state.get('productCatalogAdmin').toJS()

const ProductCatalogEnhance = compose(
  connect(mapStateToProps, { ...OrderHistoryAdminActions })
)(ProductCatalog)

export default ProductCatalogEnhance
