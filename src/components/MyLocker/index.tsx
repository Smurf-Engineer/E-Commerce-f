/**
 * MyLocker Component - Created by david on 06/04/18.
 */
import * as React from 'react'
import { withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'
import ProductList from '../../components/ProductCatalogueThumbnailsList'
import { DesignResultType, DesignType } from '../../types/common'
import { desginsQuery } from './data'
import * as myLockerActions from './actions'
import { Container } from './styledComponents'

interface Props {
  client: any
  limit: number
  offset: number
  currentPage: number
  fullCount: string
  designs: DesignType[]
  openQuickView: (id: number, yotpoId: string | null) => void
  formatMessage: (messageDescriptor: string) => string
  setDesignsData: (data: DesignResultType) => void
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
      setDesignsData
    } = this.props
    try {
      const data = await query({
        query: desginsQuery,
        variables: { limit, offset },
        fetchPolicy: 'network-only'
      })
      setDesignsData(data)
    } catch (e) {}
  }

  render() {
    console.log(this.props)
    const { formatMessage, designs } = this.props

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
