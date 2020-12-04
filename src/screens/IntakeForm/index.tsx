/**
 * IntakeForm Screen - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import messages from './messages'
import Header from '../../components/DesignCenterHeader'
import Layout from '../../components/MainLayout'
import * as intakeFormActions from './actions'
import ProductCatalogue from '../../components/ProductCatalogue'
import { connect } from 'react-redux'
import MobileMenu from './MobileMenu'

import { RouteComponentProps } from 'react-router-dom'
import {
  Container,
  Title,
  NavHeader
} from './styledComponents'
import {
  Responsive,
} from '../../types/common'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  responsive: Responsive
  selectedItems: number[]
  currentScreen: number
  selectProductAction: (productId: number) => void
  deselectProductAction: (productId: number) => void
}

export class IntakeFormPage extends React.Component<Props, {}> {
  productCatalog: any
  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  handleOnContinue = () => {
    alert('s')
  }

  render() {
    const {
      intl: { formatMessage },
      intl,
      history,
      responsive,
      selectedItems,
      selectProductAction,
      deselectProductAction
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
            (<MobileMenu
              onContinue={this.handleOnContinue}
              continueDisable={selectedItems.length < 1}
              showPreviousButton={false}
              showContinueButton={true}
            />
            )}
        {!isMobile && (
          <Header
            proDesign={true}
            onPressBack={this.handleOnPressBack}
          />
        )}
        <NavHeader>
          <Title>
            {formatMessage(messages.chooseProducts)}
          </Title>
        </NavHeader>
        <ProductCatalogue
          onSelectProduct={selectProductAction}
          onDeselectProduct={deselectProductAction}
          {...{ history, formatMessage, selectedItems }} />
      </Container>
    </Layout>)
  }
}

const mapStateToProps = (state: any) => {
  const intakeForm = state.get('intakeForm').toJS()
  const langProps = state.get('languageProvider').toJS()
  const appProps = state.get('app').toJS()
  const responsive = state.get('responsive').toJS()

  return {
    ...intakeForm,
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
    { ...intakeFormActions }
  )
)(IntakeFormPage)

export default IntakeFormPageEnhance
