/**
 * Designs Screen - Created by david on 27/03/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import get from 'lodash/get'
import withLoading from '../../components/WithLoadingData/'

import { openQuickViewAction } from '../../components/MainLayout/actions'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'

import ThreeD from './Render3D'
import * as designsActions from './actions'
import { styleQuery } from './data'
import { QueryProps } from '../../types/common'
import quickView from '../../assets/quickview.svg'
import {
  Container,
  Title,
  Message,
  ContainerError,
  Row,
  Model,
  QuickView
} from './styledComponents'

interface Data extends QueryProps {
  design?: any
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
  openQuickViewAction: (index: number) => void
  loadingModel: boolean
  // Redux actions
  setLoadingAction: (loading: boolean) => void
}

export class Designs extends React.Component<Props, {}> {
  handleOnPressBack = () => {
    window.location.replace('/')
  }

  handleOpenQuickView = () => {
    const { data: { design }, openQuickViewAction: openQuickView } = this.props
    const productId = get(design, 'product.id')
    openQuickView(productId)
  }

  render() {
    const { data: { error, design } } = this.props
    const productName = get(design, 'product.name')
    const colors = get(design, 'colors')
    const svg = get(design, 'svg')

    return (
      <div>
        {error ? (
          <ContainerError>
            <Title>Oops!</Title>
            <Message>
              Seems like the design was deleted or is not available
            </Message>
          </ContainerError>
        ) : (
          <Container>
            <Row>
              <Model>{productName}</Model>
              <QuickView onClick={this.handleOpenQuickView} src={quickView} />
            </Row>
            <ThreeD {...{ colors, svg }} />
          </Container>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => state.get('designs').toJS()

type OwnProps = {
  location?: any
}

const DesignsEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...designsActions, openQuickViewAction }),
  graphql<Data>(styleQuery, {
    options: ({ location }: OwnProps) => {
      const { search } = location
      const queryParams = queryString.parse(search)
      const designId = queryParams.id || ''
      return {
        variables: { designId }
      }
    }
  }),
  withLoading
)(Designs)

export default DesignsEnhance
