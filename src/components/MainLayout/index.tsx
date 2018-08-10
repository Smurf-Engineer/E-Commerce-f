/**
 * MainLayout Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { InjectedIntl } from 'react-intl'
import Layout from 'antd/lib/layout'
import queryString from 'query-string'
import * as LayoutActions from './actions'
import * as LocaleActions from '../../screens/LanguageProvider/actions'
import { openOutWithoutSaveModalAction } from '../../screens/DesignCenter/actions'
import { RegionConfig, CartItems } from '../../types/common'
import MenuBar from '../../components/MenuBar'
import ContactAndLinks from '../../components/ContactAndLinks'
import SocialMedia from '../../components/SocialMedia'
import QuickView from '../../components/QuickView'
import { Header, Footer } from './styledComponents'
import SearchResults from '../SearchResults'
import { REDIRECT_ROUTES } from './constants'
import Intercom from 'react-intercom'
import config from '../../config/index'

const { Content } = Layout

interface Props extends RouteComponentProps<any> {
  children: React.ReactChild
  intl: InjectedIntl
  history: any
  client: any
  setSearchParam: (param: string) => void
  showSearchResultsAction: (show: boolean) => void
  setRegionAction: (payload: RegionConfig) => void
  openQuickViewAction: (open: number, yotpoId: string | null) => void
  openLoginAction: (open: boolean) => void
  saveUserToLocal: (user: object) => void
  logoutAction: () => void
  showSearchResults: boolean
  searchParam: string
  productId: boolean
  openLogin: boolean
  currentRegion: string
  currentLanguage: number
  currentCurrency: number
  yotpoId: string
  hideBottomHeader: boolean
  hideFooter: boolean
  fakeWidth: number
  teamStoresHeader?: boolean
  hideQuickViewSliderButtons?: boolean
  itemsInCart: number
  shoppingCart: any
  designCenter: any
  openWithoutSaveModalAction: (open: boolean, route?: string) => void
}

class MainLayout extends React.Component<Props, {}> {
  static defaultProps = {
    hideBottomHeader: false,
    hideFooter: false
  }

  state = {}

  onSearch = (value: string) => {
    const { setSearchParam } = this.props
    setSearchParam(value)
  }

  onLogout = () => {
    const {
      logoutAction,
      client,
      history: {
        location: { pathname }
      }
    } = this.props
    client.resetStore()
    logoutAction()
    if (REDIRECT_ROUTES.includes(pathname)) {
      window.location.replace('/')
    }
  }

  componentDidMount() {
    const {
      openLoginAction,
      history: {
        location: { search, pathname }
      }
    } = this.props
    const { login } = queryString.parse(search)

    const appUser = JSON.parse(localStorage.getItem('user')) || {}

    const userLogged = !!appUser

    // Intercom data
    const user = {
      user_id: appUser.id,
      email: appUser.email,
      name: `${appUser.name} ${appUser.lastName}`
    }
    this.setState({ user })

    if (
      (pathname === '/faq' || pathname === '/shopping-cart') &&
      login === 'open' &&
      !userLogged
    ) {
      openLoginAction(true)
    }
  }

  render() {
    const {
      children,
      history,
      showSearchResults,
      searchParam,
      productId,
      yotpoId,
      openLogin,
      openLoginAction,
      setRegionAction,
      currentRegion,
      currentLanguage,
      currentCurrency,
      intl,
      saveUserToLocal,
      hideBottomHeader,
      hideFooter,
      fakeWidth,
      teamStoresHeader,
      hideQuickViewSliderButtons,
      itemsInCart,
      shoppingCart,
      designCenter: { designHasChanges },
      openWithoutSaveModalAction
    } = this.props

    const { formatMessage } = intl

    let numberOfProducts = 0
    if (shoppingCart.cart) {
      const cart = shoppingCart.cart as CartItems[]
      cart.map(cartItem => {
        const quantities = cartItem.itemDetails.map((itemDetail, ind) => {
          return itemDetail.quantity
        })

        const quantitySum = quantities.reduce((a, b) => a + b, 0)

        numberOfProducts = numberOfProducts + quantitySum
      })
    }

    const numeroDeElementosEnElCarritoCuleroDeMierda = shoppingCart.cart
      ? numberOfProducts
      : itemsInCart

    return (
      <Layout>
        <Header {...{ hideBottomHeader }}>
          <MenuBar
            searchFunc={this.onSearch}
            onChangeLocation={setRegionAction}
            itemsInCart={numeroDeElementosEnElCarritoCuleroDeMierda}
            {...{
              fakeWidth,
              history,
              intl,
              showSearchResults,
              searchParam,
              currentRegion,
              currentLanguage,
              currentCurrency,
              openLogin,
              openLoginAction,
              saveUserToLocal,
              teamStoresHeader,
              designHasChanges,
              openWithoutSaveModalAction
            }}
            logoutAction={this.onLogout}
            hideBottom={hideBottomHeader}
          />
        </Header>
        <SearchResults
          {...{ history }}
          showResults={showSearchResults}
          searchParam={searchParam}
          closeResults={this.closeResults}
          openResults={this.openResults}
          quickViewAction={this.openQuickView}
        />
        <Content>{children}</Content>
        {!hideFooter && (
          <Footer>
            <ContactAndLinks {...{ history, formatMessage, fakeWidth }} />
            <SocialMedia />
          </Footer>
        )}
        <QuickView
          open={!!productId}
          handleClose={this.onCloseModal}
          hideSliderButtons={hideQuickViewSliderButtons}
          {...{ productId, history, yotpoId, formatMessage }}
        />
        <div className="app">
          <Intercom appID={config.intercomKey} {...this.props.user} />
        </div>
      </Layout>
    )
  }
  closeResults = () => {
    const { showSearchResultsAction } = this.props
    showSearchResultsAction(false)
  }
  openResults = () => {
    const { showSearchResultsAction } = this.props
    showSearchResultsAction(true)
  }

  openQuickView = (id: number, yotpoId: string) => {
    const { openQuickViewAction } = this.props
    openQuickViewAction(id, yotpoId)
  }
  onCloseModal = () => {
    const { openQuickViewAction } = this.props
    openQuickViewAction(0, '')
  }
}

const mapStateToProps = (state: any) => {
  const layoutProps = state.get('layout').toJS()
  const langProps = state.get('languageProvider').toJS()
  const responsive = state.get('responsive').toJS()
  const shoppingCart = state.get('shoppingCartPage').toJS()
  const designCenter = state.get('designCenter').toJS()
  return {
    ...layoutProps,
    ...langProps,
    ...responsive,
    shoppingCart: { ...shoppingCart },
    designCenter: { ...designCenter }
  }
}

const LayoutEnhance = compose(
  withApollo,
  connect(
    mapStateToProps,
    {
      ...LayoutActions,
      ...LocaleActions,
      openWithoutSaveModalAction: openOutWithoutSaveModalAction
    }
  )
)(MainLayout)
export default LayoutEnhance
