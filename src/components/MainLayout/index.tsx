/**
 * MainLayout Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'
import GoogleFontLoader from 'react-google-font-loader'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { InjectedIntl } from 'react-intl'
import Layout from 'antd/lib/layout'
import queryString from 'query-string'
import * as LayoutActions from './actions'
import * as LocaleActions from '../../screens/LanguageProvider/actions'
import { openOutWithoutSaveModalAction } from '../../screens/DesignCenter/actions'
import {
  RegionConfig,
  CartItems,
  UserType,
  Font,
  SimpleFont
} from '../../types/common'
import MenuBar from '../../components/MenuBar'
import ContactAndLinks from '../../components/ContactAndLinks'
import SocialMedia from '../../components/SocialMedia'
import QuickView from '../../components/QuickView'
import { Header, Footer } from './styledComponents'
import SearchResults from '../SearchResults'
import { REDIRECT_ROUTES, CONFIRM_LOGOUT } from './constants'
import Intercom from 'react-intercom'
import { IntercomAPI } from 'react-intercom'
import { getTeamStoreStatus, getFonts } from './data'
import * as mainLayoutActions from './api'
import config from '../../config/index'
import LogoutModal from '../LogoutModal'

const { Content } = Layout

interface Props extends RouteComponentProps<any> {
  children: React.ReactChildren
  intl: InjectedIntl
  history: any
  client: any
  user: UserType
  setSearchParam: (param: string) => void
  showSearchResultsAction: (show: boolean) => void
  setRegionAction: (payload: RegionConfig) => void
  openQuickViewAction: (
    open: number,
    yotpoId: string | null,
    gender: number
  ) => void
  openLoginAction: (open: boolean, callback?: boolean) => void
  saveUserToLocal: (user: object) => void
  logoutAction: () => void
  showSearchResults: boolean
  searchParam: string
  productId: boolean
  openLogin: boolean
  currentRegion: string
  currentLanguage: string
  currentCurrency: string
  yotpoId: string
  productGender: number
  hideTopHeader: boolean
  hideBottomHeader: boolean
  hideFooter: boolean
  fakeWidth: number
  teamStoresHeader?: boolean
  hideQuickViewSliderButtons?: boolean
  itemsInCart: number
  shoppingCart: any
  designCenter: any
  openLogoutModal: boolean
  initialCountryCode: string
  buyNowHeader: boolean
  showTeamStores: boolean
  fontsData: any
  fonts: []
  openWithoutSaveModalAction: (open: boolean, route?: string) => void
  restoreUserSession: () => void
  deleteUserSession: () => void
  saveUserSession: (user: object) => void
  openLogoutModalAction: (open: boolean) => void
  saveAndBuyAction: (buy: boolean) => void
  teamStoreStatus: () => Promise<any>
  setTeamStoreStatusAction: (show: boolean) => void
  getFontsData: () => Promise<Font>
  setInstalledFontsAction: (fonts: any) => void
}

class MainLayout extends React.Component<Props, {}> {
  static defaultProps = {
    hideBottomHeader: false,
    hideFooter: false
  }

  state = {}

  componentWillMount() {
    const { user } = this.props
    if (typeof window !== 'undefined' && !user) {
      const { restoreUserSession } = this.props
      restoreUserSession()
    }
  }

  async componentDidMount() {
    const {
      openLoginAction,
      history: {
        location: { search, pathname }
      },
      user,
      teamStoreStatus,
      setTeamStoreStatusAction,
      getFontsData,
      setInstalledFontsAction
    } = this.props

    const { login } = queryString.parse(search)
    const userLogged = !!user

    if (
      (pathname === '/faq' || pathname === '/shopping-cart') &&
      login === 'open' &&
      !userLogged
    ) {
      openLoginAction(true)
    }
    const response = await teamStoreStatus()

    setTeamStoreStatusAction(
      get(response, 'data.getTeamStoreStatus.showTeamStores', false)
    )

    const fontsResponse = await getFontsData()
    const fontsList = get(fontsResponse, 'data.fontsData', {})
    const fonts: SimpleFont[] = []
    fontsList.map((font: Font) => fonts.push({ font: font.family }))
    setInstalledFontsAction(fonts)
  }

  onSearch = (value: string) => {
    const { setSearchParam } = this.props
    if (value.length >= 3) {
      setSearchParam(value)
    }
  }

  handleOnClickLogout = () => {
    const {
      openLogoutModalAction,
      history: {
        location: { pathname }
      }
    } = this.props

    if (CONFIRM_LOGOUT.includes(pathname)) {
      return openLogoutModalAction(true)
    }

    this.onLogout()
  }

  onLogout = () => {
    const {
      deleteUserSession,
      client,
      history: {
        location: { pathname }
      }
    } = this.props
    client.resetStore()
    deleteUserSession()
    // https://developers.intercom.com/installing-intercom/docs/intercom-javascript#section-intercomshutdown
    IntercomAPI('shutdown')
    if (REDIRECT_ROUTES.includes(pathname)) {
      window.location.replace('/')
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
      productGender,
      openLogin,
      openLoginAction,
      setRegionAction,
      currentRegion,
      currentLanguage,
      currentCurrency,
      intl,
      hideTopHeader,
      hideBottomHeader,
      hideFooter,
      fakeWidth,
      teamStoresHeader,
      hideQuickViewSliderButtons,
      itemsInCart,
      shoppingCart,
      designCenter: { designHasChanges },
      openWithoutSaveModalAction,
      user,
      openLogoutModal,
      openLogoutModalAction,
      initialCountryCode,
      buyNowHeader,
      saveAndBuyAction,
      showTeamStores,
      fonts
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

    const numberOfProductsInCart = shoppingCart.cart
      ? numberOfProducts
      : itemsInCart

    let userData = {}
    if (!!user) {
      userData = {
        user_id: user.id,
        email: user.email,
        name: `${user.name} ${user.lastName}`
      }
    }

    return (
      <Layout>
        {!isEmpty(fonts) && <GoogleFontLoader {...{ fonts }} />}
        <Header {...{ hideTopHeader, hideBottomHeader }}>
          <MenuBar
            searchFunc={this.onSearch}
            onChangeLocation={setRegionAction}
            itemsInCart={numberOfProductsInCart}
            {...{
              fakeWidth,
              history,
              intl,
              showSearchResults,
              searchParam,
              openLogin,
              openLoginAction,
              teamStoresHeader,
              designHasChanges,
              openWithoutSaveModalAction,
              initialCountryCode,
              currentRegion,
              currentLanguage,
              buyNowHeader
            }}
            saveAndBuy={saveAndBuyAction}
            saveUserToLocal={this.handleOnLogin}
            currentCurrency={currentCurrency || config.defaultCurrency}
            logoutAction={this.handleOnClickLogout}
            hideTop={hideTopHeader}
            hideBottom={hideBottomHeader}
          />
        </Header>
        <SearchResults
          {...{ history, SearchResults }}
          showResults={showSearchResults}
          searchParam={searchParam}
          closeResults={this.closeResults}
          openResults={this.openResults}
          quickViewAction={this.openQuickView}
          currentCurrency={currentCurrency || config.defaultCurrency}
        />
        <Content>{children}</Content>
        {!hideFooter && (
          <Footer>
            <ContactAndLinks
              {...{ history, formatMessage, fakeWidth, showTeamStores }}
            />
            <SocialMedia formatMessage={intl.formatMessage} />
          </Footer>
        )}
        <QuickView
          open={!!productId}
          currentCurrency={currentCurrency || config.defaultCurrency}
          handleClose={this.onCloseModal}
          hideSliderButtons={hideQuickViewSliderButtons}
          gender={productGender}
          {...{ productId, history, yotpoId, formatMessage }}
        />
        <LogoutModal
          open={openLogoutModal}
          onLogout={this.onLogout}
          {...{ openLogoutModalAction, formatMessage }}
        />
        <div className="app">
          <Intercom appID={config.intercomKey} {...userData} />
        </div>
      </Layout>
    )
  }

  handleOnLogin = (user: object) => {
    const { saveUserSession } = this.props
    saveUserSession(user)
  }

  closeResults = () => {
    const { showSearchResultsAction } = this.props
    showSearchResultsAction(false)
  }
  openResults = () => {
    const { showSearchResultsAction } = this.props
    showSearchResultsAction(true)
  }

  openQuickView = (id: number, yotpoId: string, gender: number) => {
    const { openQuickViewAction } = this.props
    openQuickViewAction(id, yotpoId, gender)
  }
  onCloseModal = () => {
    const { openQuickViewAction } = this.props
    openQuickViewAction(0, '', 0)
  }
}

const mapStateToProps = (state: any) => {
  const layoutProps = state.get('layout').toJS()
  const langProps = state.get('languageProvider').toJS()
  const responsive = state.get('responsive').toJS()
  const shoppingCart = state.get('shoppingCartPage').toJS()
  const designCenter = state.get('designCenter').toJS()
  const app = state.get('app').toJS()
  return {
    ...layoutProps,
    ...langProps,
    ...responsive,
    ...app,
    shoppingCart: { ...shoppingCart },
    designCenter: { ...designCenter }
  }
}

const LayoutEnhance = compose(
  withApollo,
  getTeamStoreStatus,
  getFonts,
  connect(
    mapStateToProps,
    {
      ...LayoutActions,
      ...LocaleActions,
      ...mainLayoutActions,
      openWithoutSaveModalAction: openOutWithoutSaveModalAction
    }
  )
)(MainLayout)
export default LayoutEnhance
