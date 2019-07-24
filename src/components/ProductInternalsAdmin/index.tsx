/**
 * ProductInternalsAdmin Component - Created by eduardoquintero on 03/07/19.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import * as ApiActions from './api'
import Modal from 'antd/lib/modal'
import get from 'lodash/get'
import set from 'lodash/set'
import remove from 'lodash/remove'
import { getProductInternalsQuery } from './InternalsList/data'
import { isNumber } from '../../utils/utilsFiles'
import { FormattedMessage } from 'react-intl'
import message from 'antd/lib/message'
import InternalsModal from './InternalsModal'
import * as ProductInternalActions from './actions'
import {
  Container,
  ScreenTitle,
  SearchInput,
  AddInternalButton,
  DownloadButton,
  BottomContainer
} from './styledComponents'
import {
  getProductInternalsInfoQuery,
  updateProductInternal,
  addProductInternal,
  deleteProductInternal
} from './data'
import List from './InternalsList'
import messages from './messages'
import {
  sorts,
  ProductInternal,
  Message,
  QueryProps,
  BasicColor,
  ProductInternalInput,
  MessagePayload
} from '../../types/common'
import { INTERNALS_LIMIT } from './constants'

const { confirm } = Modal
interface Props {
  history: any
  currentPage: number
  orderBy: string
  sort: sorts
  client: any
  internalId: number
  searchText: string
  productCode: string
  data: Data
  gender: string
  size: string
  fitStyle: string
  color: string
  pocketZipper: string
  frontZipper: string
  binding: string
  bibBrace: string
  collection: string
  id: number
  modalOpen: boolean
  loading: boolean
  downloading: boolean
  formatMessage: (messageDescriptor: Message, params?: any) => string
  setOrderByAction: (orderBy: string, sort: sorts) => void
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
  setInternalIdAction: (internalId: string) => void
  setSearchTextAction: (searchText: string) => void
  setLoadingAction: (loading: boolean) => void
  setTextAction: (field: string, value: string) => void
  onSelectChangeAction: (value: string, id: string) => void
  openModalAction: (open: boolean) => void
  resetModalAction: () => void
  setInternalToUpdate: (internal: ProductInternal) => void
  updateProduct: (variables: {}) => Promise<ProductInternal>
  addProduct: (variables: {}) => Promise<ProductInternal>
  deleteProduct: (variables: {}) => Promise<MessagePayload>
  downloadCsv: () => void
}

interface Data extends QueryProps {
  productInternalsInfo: {
    basicColors: BasicColor[]
    products: String[]
  }
}

interface StateProps {
  searchValue: string
}
class ProductInternalsAdmin extends React.Component<Props, StateProps> {
  state = {
    searchValue: ''
  }
  raiseSearchWhenUserStopsTyping = debounce(
    () => this.props.setSearchTextAction(this.state.searchValue),
    600
  )

  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  render() {
    const {
      currentPage,
      orderBy,
      sort,
      formatMessage,
      searchText,
      internalId,
      productCode,
      onSelectChangeAction,
      data: { productInternalsInfo },
      gender,
      size,
      fitStyle,
      color,
      pocketZipper,
      frontZipper,
      binding,
      bibBrace,
      collection,
      modalOpen,
      loading,
      id,
      downloading
    } = this.props

    return (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <AddInternalButton onClick={this.handleOnAddInternal}>
          {formatMessage(messages.addInternalLabel)}
        </AddInternalButton>
        <SearchInput
          value={this.state.searchValue}
          onChange={this.handleInputChange}
          placeholder={formatMessage(messages.search)}
        />
        <List
          {...{ formatMessage, currentPage, orderBy, sort, searchText }}
          onSortClick={this.handleOnSortClick}
          onInternalClick={this.handleOnInternalClick}
          onChangePage={this.handleOnChangePage}
          interactiveHeaders={true}
        />
        <InternalsModal
          open={modalOpen}
          requestClose={this.handleOnCloseModal}
          handleOnInputChange={this.handleOnInputChange}
          handleOnSelectChange={onSelectChangeAction}
          onSave={this.handleOnSave}
          deleteProduct={this.handleOnDeleteProductInternal}
          handleOnProductChange={this.handleOnProductChange}
          {...{
            formatMessage,
            internalId,
            productCode,
            loading,
            productInternalsInfo,
            gender,
            size,
            fitStyle,
            color,
            pocketZipper,
            frontZipper,
            binding,
            bibBrace,
            collection,
            id
          }}
        />
        <BottomContainer>
          <DownloadButton
            loading={downloading}
            onClick={this.handleDownloadCsv}
          >
            {formatMessage(messages.download)}
          </DownloadButton>
        </BottomContainer>
      </Container>
    )
  }
  handleDownloadCsv = async () => {
    const { formatMessage, downloadCsv } = this.props
    try {
      const blobFile = await downloadCsv()
      const url = window.URL.createObjectURL(blobFile)
      const a = document.createElement('a')
      const today = new Date()
      const filename = `product_internals_${today.getDate()}-${today.getMonth() +
        1}-${today.getFullYear()}-${today.getTime()}.csv`
      a.href = url
      a.download = filename
      a.click()
    } catch (e) {
      message.error(formatMessage(messages.unexpectedError))
    }
  }
  handleOnSave = async () => {
    const {
      id,
      internalId,
      productCode,
      gender,
      size,
      fitStyle,
      color,
      pocketZipper,
      frontZipper,
      binding,
      bibBrace,
      collection,
      formatMessage,
      setLoadingAction
    } = this.props

    const isUpdating = id !== -1
    const productInternal = {
      id: isUpdating ? id : undefined,
      internal_id: internalId,
      product_code: productCode,
      gender,
      size,
      fit_style: fitStyle,
      color,
      pocket_zipper: pocketZipper,
      front_zipper: frontZipper,
      binding,
      bib_brace: bibBrace,
      collection
    }
    setLoadingAction(true)
    try {
      await this.upsertProduct(isUpdating, productInternal)
    } catch (error) {
      message.error(formatMessage(messages.unexpectedError))
    }
  }
  async upsertProduct(
    isUpdating: boolean,
    productInternal: ProductInternalInput
  ) {
    const {
      currentPage,
      updateProduct,
      orderBy,
      sort,
      searchText,
      formatMessage,
      setLoadingAction,
      resetModalAction,
      openModalAction,
      addProduct
    } = this.props
    let responseId: number
    if (isUpdating) {
      const offset = currentPage ? (currentPage - 1) * INTERNALS_LIMIT : 0
      await updateProduct({
        variables: { productInternal },
        update: (store: any, dataInternal: ProductInternal) => {
          const updatedInternal = get(
            dataInternal,
            'data.updateProductInternal'
          )
          responseId = updatedInternal.id
          if (!responseId) {
            return
          }
          const storedData = store.readQuery({
            query: getProductInternalsQuery,
            variables: {
              limit: INTERNALS_LIMIT,
              offset,
              order: orderBy,
              orderAs: sort,
              searchText
            }
          })
          store.writeQuery({
            query: getProductInternalsQuery,
            variables: {
              limit: INTERNALS_LIMIT,
              offset,
              order: orderBy,
              orderAs: sort,
              searchText
            },
            data: storedData
          })
        }
      })
    } else {
      await addProduct({
        variables: { productInternal },
        update: (store: any, dataInternal: ProductInternal) => {
          const newInternal = get(dataInternal, 'data.addProductInternal')
          responseId = newInternal.id
          if (!responseId) {
            return
          }
          const data = store.readQuery({
            query: getProductInternalsQuery,
            variables: {
              limit: INTERNALS_LIMIT,
              offset: 0,
              order: orderBy,
              orderAs: sort,
              searchText: ''
            }
          })
          const productList = get(data, 'productInternalsQuery.internals')
          productList.unshift(newInternal)
          store.writeQuery({
            query: getProductInternalsQuery,
            variables: {
              limit: INTERNALS_LIMIT,
              offset: 0,
              order: orderBy,
              orderAs: sort,
              searchText: ''
            },
            data
          })
        }
      })
    }
    if (!responseId) {
      message.error(formatMessage(messages.alreadyExist))
      setLoadingAction(false)
      return
    }
    resetModalAction()
    openModalAction(false)
  }

  handleOnDeleteProductInternal = async () => {
    const { formatMessage, internalId } = this.props
    confirm({
      title: formatMessage(messages.confirmTitle),
      content: formatMessage(messages.confirmMessage, { internalId }),
      onOk: async () => {
        try {
          await this.handleOnConfirmDeleteProductInternal()
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }

  handleOnConfirmDeleteProductInternal = async () => {
    const {
      id,
      deleteProduct,
      resetModalAction,
      openModalAction,
      sort,
      orderBy
    } = this.props
    try {
      const response = await deleteProduct({
        variables: {
          id
        },
        update: (store: any) => {
          const data = store.readQuery({
            query: getProductInternalsQuery,
            variables: {
              limit: INTERNALS_LIMIT,
              offset: 0,
              order: orderBy,
              orderAs: sort,
              searchText: ''
            }
          })
          const productList = get(data, 'productInternalsQuery.internals')
          const updatedThemes = remove(
            productList,
            ({ id: productInternalId }) => productInternalId !== id
          )
          set(data, 'productInternalsQuery.internals', updatedThemes)
          store.writeQuery({
            query: getProductInternalsQuery,
            variables: {
              limit: INTERNALS_LIMIT,
              offset: 0,
              order: orderBy,
              orderAs: sort,
              searchText: ''
            },
            data
          })
        }
      })
      const responseMessage = get(
        response,
        'data.deleteProductInternal.message',
        ''
      )
      message.success(responseMessage)
      resetModalAction()
      openModalAction(false)
    } catch (e) {
      message.error(e.message)
    }
  }
  handleOnCloseModal = () => {
    const { openModalAction } = this.props
    openModalAction(false)
  }
  handleOnAddInternal = () => {
    const { resetModalAction, openModalAction } = this.props
    resetModalAction()
    openModalAction(true)
  }

  handleOnSortClick = (label: string, sort: sorts) => {
    const { setOrderByAction } = this.props
    setOrderByAction(label, sort)
  }

  handleOnInternalClick = (internal: ProductInternal) => {
    const { setInternalToUpdate } = this.props
    setInternalToUpdate(internal)
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }
  handleOnInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget,
      currentTarget: { value, id }
    } = event
    const { setTextAction } = this.props
    const acceptNumbersOnly = currentTarget.getAttribute('data-is-number')
    if (acceptNumbersOnly && (!isNumber(value) && value !== '')) {
      return
    }
    setTextAction(id, value)
  }
  handleOnProductChange = (value: string) => {
    const { setTextAction } = this.props
    if (!isNumber(value) && value !== '') {
      return
    }
    setTextAction('productCode', value)
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    this.setState({ searchValue: value }, () => {
      this.raiseSearchWhenUserStopsTyping()
    })
  }
}

const mapStateToProps = (state: any) =>
  state.get('productInternalsAdmin').toJS()

const ProductInternalsAdminEnhance = compose(
  updateProductInternal,
  addProductInternal,
  deleteProductInternal,
  graphql(getProductInternalsInfoQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  connect(
    mapStateToProps,
    { ...ProductInternalActions, ...ApiActions }
  )
)(ProductInternalsAdmin)

export default ProductInternalsAdminEnhance
