/**
 * IntakeForm Screen - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import messages from './messages'
import Header from '../../components/DesignCenterHeader'
import Layout from '../../components/MainLayout'
import SwipeableViews from 'react-swipeable-views'
import * as intakeFormActions from './actions'
import ProductCatalogue from '../../components/ProductCatalogue'
import { connect } from 'react-redux'
import MobileMenu from './MobileMenu'
import DesignPathway from './DesignPathway'

import { RouteComponentProps } from 'react-router-dom'
import {
  Container,
  Title,
  NavHeader
} from './styledComponents'
import {
  Responsive,
} from '../../types/common'
import { Sections } from './constants'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  responsive: Responsive
  selectedItems: number[]
  currentScreen: number
  selectProductAction: (productId: number) => void
  deselectProductAction: (productId: number) => void
  goToPage: (page: number) => void
}

export class IntakeFormPage extends React.Component<Props, {}> {
  productCatalog: any
  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  handleOnContinue = () => {
    const { goToPage, currentScreen } = this.props
    goToPage(currentScreen + 1)
  }

  getNavButtonsValidation = () => {
    const { currentScreen, selectedItems } = this.props
    switch (currentScreen) {
      case Sections.PRODUCTS:
        return {
          continueDisable: selectedItems.length < 1,
          showPreviousButton: false
        }
      case Sections.PATHWAY:
        return {
          showPreviousButton: false,
          showContinueButton: false
        }
      default:
        return {}
    }
  }

  render() {
    const {
      intl: { formatMessage },
      intl,
      history,
      responsive,
      selectedItems,
      currentScreen,
      selectProductAction,
      deselectProductAction
    } = this.props
    const isMobile = !!responsive && responsive.phone
    const validations = this.getNavButtonsValidation()
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
              {...{validations}}
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
        {currentScreen === Sections.PRODUCTS && <ProductCatalogue
            onSelectProduct={selectProductAction}
            onDeselectProduct={deselectProductAction}
            {...{ history, formatMessage, selectedItems }} />}
        {currentScreen === Sections.PATHWAY && (
          <DesignPathway fromScratch={this.handleOnContinue} {...{formatMessage, isMobile}} />
        )}
       {currentScreen > Sections.PATHWAY && <SwipeableViews disabled={true} index={currentScreen}>
          {/* INSPIRATION */}
        </SwipeableViews>}
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
