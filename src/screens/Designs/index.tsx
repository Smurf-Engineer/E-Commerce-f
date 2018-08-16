/**
 * Designs Screen - Created by david on 27/03/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import withLoading from '../../components/WithLoadingData/'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'
import messages from './messages'
import ThreeD from '../../components/Render3D'
import * as designsActions from './actions'
import { styleQuery } from './data'
import { QueryProps, DesignSaved } from '../../types/common'
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
  design: DesignSaved
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
    const {
      data: {
        design: { product }
      },
      openQuickViewAction: openQuickView
    } = this.props
    openQuickView(product.id)
  }

  render() {
    const {
      data: { error, design }
    } = this.props

    if (error) {
      return (
        <ContainerError>
          <Title>
            <FormattedMessage {...messages.errorTitle} />
          </Title>
          <Message>
            <FormattedMessage {...messages.errorMessage} />
          </Message>
        </ContainerError>
      )
    }

    const {
      svg,
      product,
      flatlockColor,
      bindingColor,
      bibBraceColor,
      zipperColor
    } = design
    const { name } = product

    return (
      <Container>
        <Row>
          <Model>{name}</Model>
          <QuickView onClick={this.handleOpenQuickView} src={quickView} />
        </Row>
        <ThreeD
          {...{ svg, product }}
          zipperColor={zipperColor}
          bindingColor={bindingColor}
          bibColor={bibBraceColor}
          flatlockColor={flatlockColor}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('designs').toJS()

type OwnProps = {
  location?: any
}

const DesignsEnhance = compose(
  injectIntl,
  connect(
    mapStateToProps,
    { ...designsActions, openQuickViewAction }
  ),
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
