/**
 * MainLayout Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { compose, graphql, withApollo } from 'react-apollo'
import GoogleFontLoader from 'react-google-font-loader'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { InjectedIntl } from 'react-intl'
import { EditorState, convertFromRaw } from 'draft-js'
import { MAIN_TITLE } from '../../constants'
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
  SimpleFont,
  QueryProps,
  Alert,
} from '../../types/common'
import MenuBar from '../../components/MenuBar'
import ContactAndLinks from '../../components/ContactAndLinks'
import SocialMedia from '../../components/SocialMedia'
import QuickView from '../../components/QuickView'
import {
  Header,
  Footer,
  EditorWrapper,
  EditorCloseButton,
} from './styledComponents'
import SearchResults from '../SearchResults'
import { REDIRECT_ROUTES, CONFIRM_LOGOUT } from './constants'
import { getAlertsQuery, getFonts } from './data'
import * as mainLayoutActions from './api'
import config from '../../config/index'
import LogoutModal from '../LogoutModal'
import { setDefaultScreenAction } from '../../screens/Account/actions'
import Helmet from 'react-helmet'
import { closeSlaask } from '../../slaask'
import { openSupport } from './api'
import { ipLocation } from '../../utils/utilsIpLocation'

const { Content } = Layout

interface AlertsData extends QueryProps {
  alertsData: Alert[]
}

interface Props extends RouteComponentProps<any> {
  alertsData: AlertsData
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
  saveUserToLocal: (user: UserType) => void
  logoutAction: () => void
  showSearchResults: boolean
  searchParam: string
  productId: boolean
  openLogin: boolean
  currentRegion: string
  currentLanguage: string
  style: object
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
  disableAssist: boolean
  openReseller: boolean
  fontsData: any
  fonts: []
  darkMode?: boolean
  hideDetails: boolean
  countryName: string
  countryCode: string
  regionName: string
  city: string
  openResellerAction: (open: boolean) => void
  setAccountScreen: (screen: string, openCreations?: boolean) => void
  openWithoutSaveModalAction: (open: boolean, route?: string) => void
  restoreUserSession: (client: any) => void
  deleteUserSession: () => void
  saveUserSession: (user: UserType, client: any) => void
  openLogoutModalAction: (open: boolean) => void
  saveAndBuyAction: (buy: boolean) => void
  getFontsData: () => Promise<Font>
  setInstalledFontsAction: (fonts: any) => void
  setUserLocationInfoAction: (
    countryName: string,
    countryCode: string,
    regionName: string,
    city: string
  ) => void
}

class MainLayout extends React.Component<Props, {}> {
  static defaultProps = {
    hideBottomHeader: false,
    hideFooter: false,
  }

  state = {
    editorState: false,
    contentUpdated: false,
    editorReady: false,
    Editor: null,
    showAlert: true,
  }

  constructor(props: Props) {
    super(props)
    if (typeof window !== undefined) {
      this.setState({
        editorState: EditorState.createEmpty(),
      })
    }
  }

  componentWillMount() {
    const { user, client } = this.props
    if (typeof window !== 'undefined' && !user) {
      const { restoreUserSession } = this.props
      restoreUserSession(client)
    }
  }

  async componentDidMount() {
    if (typeof window !== undefined) {
      const Editor = require('react-draft-wysiwyg').Editor
      this.setState({
        editorReady: true,
        Editor,
      })
    }

    const {
      openLoginAction,
      history: {
        location: { search, pathname },
      },
      user,
      getFontsData,
      setInstalledFontsAction,
      setUserLocationInfoAction,
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

    const fontsResponse = await getFontsData()
    const fontsList = get(fontsResponse, 'data.fontsData', {})
    const fonts: SimpleFont[] = []
    fontsList.map((font: Font) => fonts.push({ font: font.family }))
    setInstalledFontsAction(fonts)

    try {
      const { country_name, country_code, region, city } = await ipLocation()
      setUserLocationInfoAction(country_name, country_code, region, city)
    } catch (e) {
      console.log(e)
    }
  }

  getAllAlerts = (): Alert[] => {
    const { alertsData } = this.props
    return get(alertsData, 'alerts', [])
  }

  componentDidUpdate() {
    const { user, disableAssist } = this.props
    if (!disableAssist) {
      openSupport(user)
    }

    const alerts = this.getAllAlerts()
    if (!alerts || !alerts.length) {
      return
    }
    if (typeof window !== undefined) {
      const { editorReady, contentUpdated } = this.state
      if (alerts[1].content && !contentUpdated && editorReady) {
        try {
          const blocksContent = JSON.parse(alerts[1].content)
          const editorState = EditorState.createWithContent(
            convertFromRaw(blocksContent)
          )
          this.setState({
            contentUpdated: true,
            editorState,
          })
        } catch (e) {
          console.error('Error:', e)
        }
      }
    }
  }

  componentWillUnmount() {
    closeSlaask()
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
        location: { pathname },
      },
    } = this.props

    if (CONFIRM_LOGOUT.includes(pathname)) {
      return openLogoutModalAction(true)
    }

    this.onLogout()
  }

  handleOpenReseller = () => {
    const { history } = this.props
    history.push('/reseller-signup')
  }

  closeReseller = () => {
    const { openResellerAction } = this.props
    openResellerAction(false)
  }

  onLogout = () => {
    const {
      deleteUserSession,
      client,
      history: {
        location: { pathname },
      },
    } = this.props
    client.resetStore()
    deleteUserSession()
    if (typeof window.Intercom === 'function') {
      window.Intercom('update', { name: '', email: null, user_id: null })
    }
    if (REDIRECT_ROUTES.includes(pathname)) {
      window.location.replace('/')
    }
  }

  closeAlertHandler = () => {
    this.setState({
      showAlert: false,
    })
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
      hideDetails,
      openLogin,
      openLoginAction,
      setRegionAction,
      currentRegion,
      currentLanguage,
      currentCurrency,
      user,
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
      openLogoutModal,
      openLogoutModalAction,
      initialCountryCode,
      buyNowHeader,
      saveAndBuyAction,
      style,
      fonts,
      setAccountScreen,
      darkMode,
      countryName,
      countryCode,
      regionName,
      city,
    } = this.props
    const { editorReady, editorState, Editor, showAlert } = this.state
    const { formatMessage } = intl
    let numberOfProducts = 0

    if (shoppingCart.cart) {
      const cart = shoppingCart.cart as CartItems[]
      cart.map((cartItem) => {
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

    return (
      <Layout {...{ style }}>
        {!isEmpty(fonts) && <GoogleFontLoader {...{ fonts }} />}
        {/* Carousel for the alerts */}
        {showAlert && editorReady && typeof window !== 'undefined' ? (
          <EditorWrapper>
            <Editor {...{ editorState }} toolbarHidden={true} readOnly={true} />
            <EditorCloseButton onClick={this.closeAlertHandler}>
              +
            </EditorCloseButton>
          </EditorWrapper>
        ) : null}
        <Helmet defaultTitle={MAIN_TITLE} />
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
              buyNowHeader,
              setAccountScreen,
              darkMode,
              user,
              countryName,
              countryCode,
              regionName,
              city,
            }}
            loggedIn={!!user}
            saveAndBuy={saveAndBuyAction}
            saveUserToLocal={this.handleOnLogin}
            currentCurrency={currentCurrency || config.defaultCurrency}
            logoutAction={this.handleOnClickLogout}
            hideTop={hideTopHeader}
            hideBottom={hideBottomHeader}
          />
        </Header>
        <SearchResults
          {...{ history, SearchResults, user }}
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
              {...{ history, formatMessage, fakeWidth }}
              openReseller={this.handleOpenReseller}
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
          {...{ productId, history, yotpoId, hideDetails, formatMessage }}
        />
        <LogoutModal
          open={openLogoutModal}
          onLogout={this.onLogout}
          {...{ openLogoutModalAction, formatMessage }}
        />
      </Layout>
    )
  }

  handleOnLogin = (user: UserType) => {
    const { saveUserSession, client } = this.props
    saveUserSession(user, client)
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
    designCenter: { ...designCenter },
  }
}

const LayoutEnhance = compose(
  withApollo,
  getFonts,
  graphql(getAlertsQuery, {
    options: {
      fetchPolicy: 'network-only',
    },
    name: 'alertsData',
  }),
  connect(
    mapStateToProps,
    {
      ...LayoutActions,
      ...LocaleActions,
      ...mainLayoutActions,
      openWithoutSaveModalAction: openOutWithoutSaveModalAction,
      setAccountScreen: setDefaultScreenAction,
    }
  )
)(MainLayout)
export default LayoutEnhance
