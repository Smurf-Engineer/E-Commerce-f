/**
 * MyLocker Component - Created by david on 06/04/18.
 */
import * as React from 'react'
import { withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'
import ProductList from '../../components/ProductCatalogueThumbnailsList'
import { DesignResultType, DesignType } from '../../types/common'
import Pagination from 'antd/lib/pagination/Pagination'
import { desginsQuery } from './data'
import * as myLockerActions from './actions'
import messages from './messages'
import {
  Container,
  PaginationRow,
  LoadingContainer,
  TitleError,
  MessageError
} from './styledComponents'
import Spin from 'antd/lib/spin'

interface Props {
  client: any
  limit: number
  offset: number
  currentPage: number
  fullCount: string
  designs: DesignType[]
  loading: boolean
  error: boolean
  openQuickView: (id: number, yotpoId: string | null) => void
  formatMessage: (messageDescriptor: any) => string
  setDesignsData: (data: DesignResultType, offset: number, page: number) => void
  setLoadingAction: (loading: boolean) => void
  setErrorAction: (error: boolean) => void
}

export class MyLocker extends React.PureComponent<Props, {}> {
  handleOnPressPrivate = (id: number, isPrivate: boolean) => {
    // TODO: Handle private
  }

  handleOnPressDelete = (id: number) => {
    // TODO: Handle delete
  }

  handleOnOpenQuickView = (id: number, yotpoId: string) => {
    const { openQuickView } = this.props
    openQuickView(id, yotpoId)
  }

  async componentDidMount() {
    const {
      client: { query },
      limit,
      offset,
      setDesignsData,
      setErrorAction
    } = this.props
    try {
      const data = await query({
        query: desginsQuery,
        variables: { limit, offset },
        fetchPolicy: 'network-only'
      })
      setDesignsData(data, 0, 1)
    } catch (e) {
      setErrorAction(true)
    }
  }

  render() {
    const {
      loading,
      error,
      formatMessage,
      designs,
      currentPage,
      fullCount
    } = this.props

    if (loading) {
      return (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    }

    if (error) {
      return (
        <LoadingContainer>
          <TitleError>{formatMessage(messages.titleError)}</TitleError>
          <MessageError>{formatMessage(messages.messageError)}</MessageError>
        </LoadingContainer>
      )
    }

    return (
      <Container>
        <ProductList
          {...{ formatMessage }}
          withoutPadding={true}
          onPressPrivate={this.handleOnPressPrivate}
          onPressDelete={this.handleOnPressDelete}
          openQuickView={this.handleOnOpenQuickView}
          designs={designs}
        />
        <PaginationRow>
          <Pagination
            current={currentPage}
            pageSize={12}
            total={Number(fullCount)}
            onChange={this.handleOnChangePage}
          />
        </PaginationRow>
      </Container>
    )
  }

  handleOnChangePage = async (page: number) => {
    const {
      setLoadingAction,
      client: { query },
      limit,
      setDesignsData,
      setErrorAction
    } = this.props
    const offset = page > 1 ? (page - 1) * limit : 0
    setLoadingAction(true)
    try {
      const data = await query({
        query: desginsQuery,
        variables: { limit, offset },
        fetchPolicy: 'network-only'
      })
      setDesignsData(data, offset, page)
    } catch (e) {
      setErrorAction(true)
    }
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
