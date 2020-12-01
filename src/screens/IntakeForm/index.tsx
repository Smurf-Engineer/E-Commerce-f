/**
 * IntakeForm Screen - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import Header from '../../components/DesignCenterHeader'
import Layout from '../../components/MainLayout'
import ProductCatalogue from '../../components/ProductCatalogue'
import { connect } from 'react-redux'
import MobileMenu from './MobileMenu'

import { RouteComponentProps } from 'react-router-dom'
import {
  Container
} from './styledComponents'
import {
  Responsive,
} from '../../types/common'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  responsive: Responsive
}

export class IntakeFormPage extends React.Component<Props, {}> {
  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  render() {
    const {
      intl,
      history,
      responsive
    } = this.props
    const isMobile = !!responsive && responsive.phone
    return (
      <Layout
        {...{ history, intl }}
        hideTopHeader={responsive.tablet}
        hideBottomHeader={true}
        disableAssist={true}
        hideFooter={true}
        darkMode={true}
      >
      <Container>
          {isMobile &&
              (<MobileMenu />
            )}
          {!isMobile && (
            <Header
              proDesign={true}
              onPressBack={this.handleOnPressBack}
            />
          )}
      </Container>
      <ProductCatalogue {...{ history }} />
    </Layout>)
  }
}

const mapStateToProps = (state: any) => {
  const langProps = state.get('languageProvider').toJS()
  const appProps = state.get('app').toJS()
  const responsive = state.get('responsive').toJS()

  return {
    ...langProps,
    ...appProps,
    responsive
  }
}

const IntakeFormPageEnhance = compose(
  withApollo,
  injectIntl,
  connect(
    mapStateToProps,
  )
)(IntakeFormPage)

export default IntakeFormPageEnhance
