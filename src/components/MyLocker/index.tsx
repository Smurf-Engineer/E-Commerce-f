/**
 * MyLocker Component - Created by david on 06/04/18.
 */
import * as React from 'react'
import { withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'
import Message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import Pagination from 'antd/lib/pagination/Pagination'
import Spin from 'antd/lib/spin'

import * as myLockerActions from './actions'
import messages from './messages'
import {
  desginsQuery,
  designAsPrivateMutation,
  deleteDesignMutation
} from './data'
import ProductList from '../../components/ProductCatalogueThumbnailsList'
import ModalFooter from '../ModalFooter'
import ModalTitle from '../ModalTitle'
import EmptyContainer from '../EmptyContainer'
import {
  Container,
  PaginationRow,
  LoadingContainer,
  TitleError,
  MessageError,
  MessageText,
  DeleteConfirmMessage
} from './styledComponents'
import {
  DesignResultType,
  DesignType,
  DeleteDesignModal
} from '../../types/common'
import { designExistsOnCart } from '../../utils/utilsShoppingCart'

interface Props {
  history: any
  client: any
  limit: number
  offset: number
  currentPage: number
  fullCount: string
  designs: DesignType[]
  loading: boolean
  error: boolean
  deleteModal: DeleteDesignModal
  openQuickView: (id: number, yotpoId: string | null) => void
  formatMessage: (messageDescriptor: any, values?: {}) => string
  setDesignsData: (data: DesignResultType, offset: number, page: number) => void
  setLoadingAction: (loading: boolean) => void
  setErrorAction: (error: boolean) => void
  setDeleteModalDataAction: (payload: DeleteDesignModal) => void
  setDeleteModalLoadingAction: (loading: boolean) => void
  resetModalDataAction: () => void
}

export class MyLocker extends React.PureComponent<Props, {}> {
  handleOnPressPrivate = async (id: string, isPrivate: boolean) => {
    const {
      client: { mutate }
    } = this.props
    try {
      await mutate({
        mutation: designAsPrivateMutation,
        variables: { designId: id, shared: !isPrivate }
      })
      this.fetchDesigns()
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    }
  }

  handleOnPressDelete = (id: string, name: string) => {
    if (designExistsOnCart(id)) {
      const { formatMessage } = this.props
      Message.error(formatMessage(messages.designOnCartError))
      return
    }
    const { setDeleteModalDataAction } = this.props
    const modalData: DeleteDesignModal = {
      openDeleteModal: true,
      designId: id,
      designName: name,
      modalLoading: false
    }
    setDeleteModalDataAction(modalData)
  }

  handleOnDeleteDesign = async () => {
    const {
      setDeleteModalLoadingAction,
      deleteModal: { designId },
      client: { mutate }
    } = this.props
    try {
      setDeleteModalLoadingAction(true)
      await mutate({
        mutation: deleteDesignMutation,
        variables: { designId }
      })
      const { resetModalDataAction } = this.props
      resetModalDataAction()
      this.fetchDesigns()
    } catch (e) {
      setDeleteModalLoadingAction(false)
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    }
  }

  handleOnHideDeleteModal = () => {
    const { resetModalDataAction } = this.props
    resetModalDataAction()
  }

  fetchDesigns = async (offsetParam?: number, pageParam?: number) => {
    const {
      client: { query },
      offset: offsetProp,
      currentPage: pageProp,
      limit,
      setDesignsData
    } = this.props
    let offset = offsetParam !== undefined ? offsetParam : offsetProp
    let currentPage = pageParam !== undefined ? pageParam : pageProp

    if (!offsetParam && !pageParam) {
      const fullPage = !(offset % limit)
      const maxPageNumber = offset / limit

      if (fullPage && currentPage > maxPageNumber) {
        currentPage--
        offset = currentPage > 1 ? (currentPage - 1) * limit : 0
      }
    }

    try {
      const data = await query({
        query: desginsQuery,
        variables: { limit, offset },
        fetchPolicy: 'network-only'
      })
      setDesignsData(data, offset, currentPage)
    } catch (e) {
      throw e
    }
  }

  handleOnChangePage = async (page: number) => {
    const { setLoadingAction, limit, setErrorAction } = this.props
    const offset = page > 1 ? (page - 1) * limit : 0
    setLoadingAction(true)
    try {
      this.fetchDesigns(offset, page)
    } catch (e) {
      setErrorAction(true)
    }
  }

  handleOnOpenQuickView = (id: number, yotpoId: string) => {
    const { openQuickView } = this.props
    openQuickView(id, yotpoId)
  }

  async componentDidMount() {
    const { setErrorAction } = this.props
    try {
      await this.fetchDesigns(0, 1)
    } catch (e) {
      setErrorAction(true)
    }
  }

  render() {
    const {
      history,
      loading,
      error,
      formatMessage,
      designs,
      limit,
      currentPage,
      fullCount,
      deleteModal: { modalLoading, openDeleteModal, designName }
    } = this.props

    let alternativeContent = null
    if (loading) {
      alternativeContent = (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    } else if (error) {
      alternativeContent = (
        <LoadingContainer>
          <TitleError>{formatMessage(messages.titleError)}</TitleError>
          <MessageError>{formatMessage(messages.messageError)}</MessageError>
        </LoadingContainer>
      )
    } else if (!designs.length) {
      alternativeContent = (
        <EmptyContainer message={formatMessage(messages.messageEmpty)} />
      )
    }

    let withoutPadding = true
    if (typeof window !== 'undefined') {
      withoutPadding = !window.matchMedia('(max-width: 768px)').matches
    }

    return (
      <Container>
        <MessageText>{formatMessage(messages.message)}</MessageText>
        {alternativeContent}
        <PaginationRow>
          <ProductList
            {...{ formatMessage, history, withoutPadding }}
            onPressPrivate={this.handleOnPressPrivate}
            onPressDelete={this.handleOnPressDelete}
            openQuickView={this.handleOnOpenQuickView}
            designs={designs}
          />
          <Pagination
            current={currentPage}
            pageSize={limit}
            total={Number(fullCount)}
            onChange={this.handleOnChangePage}
          />
        </PaginationRow>
        <Modal
          visible={openDeleteModal}
          title={
            <ModalTitle title={formatMessage(messages.titleDeleteModal)} />
          }
          footer={
            <ModalFooter
              okText={formatMessage(messages.deleteDesign)}
              onOk={this.handleOnDeleteDesign}
              onCancel={this.handleOnHideDeleteModal}
              confirmLoading={modalLoading}
              {...{ formatMessage }}
            />
          }
          destroyOnClose={false}
          maskClosable={false}
          closable={false}
        >
          <DeleteConfirmMessage>
            {formatMessage(messages.messageDeleteModal, { designName })}
          </DeleteConfirmMessage>
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('myLocker').toJS()

const MyLockerEnhance = compose(
  withApollo,
  connect(
    mapStateToProps,
    { ...myLockerActions }
  )
)(MyLocker)

export default MyLockerEnhance