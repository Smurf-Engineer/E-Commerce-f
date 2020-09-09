/**
 * MenuBar Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import { InjectedIntl } from 'react-intl'
import MediaQuery from 'react-responsive'
import { graphql, compose } from 'react-apollo'
import AntdNotification from 'antd/lib/notification'
import find from 'lodash/find'
import AntdMessage from 'antd/lib/message'
import DropdownList from '../DropdownList'
import MenuSupport from '../MenuSupport'
import MenuRegion from '../MenuRegion'
import MenuMobile from '../MenuBarMobile'
import {
  Container,
  TopText,
  Row,
  Divider,
  TopRow,
  BottomRow,
  LogoIcon,
  TeamStoresMenuContainer,
  TeamStoresMenuTitle,
  notificationStyles
} from './styledComponents'
import { regionsQuery, notificationsQuery, notificationsSubscription, setAsRead, setAllAsRead } from './data'
import logo from '../../assets/jakroo_logo.svg'
import messages from './messages'
import SearchBar from '../SearchBar'
import Login from '../Login'
import Logout from '../Logout'
import ForgotPassword from '../ForgotPassword'
import Cart from '../CartForHeader'
import Notifications from '../NotificationHeader'
import {
  RegionConfig,
  Region as RegionType,
  QueryProps,
  Notification as NotificationType,
  MessagePayload
} from '../../types/common'
import { OVERVIEW } from '../../screens/Account/constants'
import get from 'lodash/get'
import config from '../../config'

interface RegionsData extends QueryProps {
  regionsResult: RegionType[]
}

interface NotificationsData extends QueryProps {
  notifications: NotificationType[]
}

interface NotificationsRead extends QueryProps {
  notification: NotificationType
}

interface Props {
  regionsData: RegionsData
  history: any
  searchFunc: (param: string) => void
  openLogin?: boolean
  setAccountScreen: (screen: string, openCreations?: boolean) => void
  openLoginAction: (open: boolean) => void
  onChangeLocation: (payload: RegionConfig) => void
  saveUserToLocal: (user: object) => void
  logoutAction: () => void
  currentRegion?: string
  currentLanguage?: string
  currentCurrency?: string
  intl: InjectedIntl
  hideTop?: boolean
  hideBottom?: boolean
  fakeWidth: number
  teamStoresHeader?: boolean | undefined
  itemsInCart: number
  designHasChanges: boolean
  initialCountryCode: string
  buyNowHeader: boolean
  notificationsData: NotificationsData
  openWithoutSaveModalAction: (open: boolean, route?: string) => void
  saveAndBuy: (buy: boolean) => void
  readNotification: (variables: {}) => Promise<NotificationsRead>
  readAllotification: (variables: {}) => Promise<MessagePayload>
}

interface StateProps {
  openForgotPassword: boolean
  isMobile: boolean
}

class MenuBar extends React.Component<Props, StateProps> {
  static defaultProps = {
    hideBottom: false
  }
  state = {
    openForgotPassword: false,
    isMobile: false,
    updating: false
  }
  componentWillMount() {
    const {
      notificationsData,
    } = this.props
    const isBrowser = typeof window !== 'undefined'

    const subscribeToMore = get(notificationsData, 'subscribeToMore')

    if (isBrowser && subscribeToMore) {
      let user
      if (typeof window !== 'undefined') {
        user = JSON.parse(localStorage.getItem('user') as string)
      }
      if (user) {
        subscribeToMore({
          document: notificationsSubscription,
          updateQuery: (prev: any, { subscriptionData }: any) => {
            const newNotification = get(subscriptionData, 'data.newNotification')
            const alreadyExist = find(prev.notifications, ['id', newNotification.id])
            if (!alreadyExist) {
              const goToUrl = () => this.handleOnPressNotification(newNotification.id, newNotification.url)
              AntdNotification.open({
                message: newNotification.title,
                description: newNotification.message,
                onClick: goToUrl,
                style: notificationStyles
              })
            }
            return !alreadyExist ? Object.assign({}, prev, {
              notifications: [newNotification, ...prev.notifications]
            }) : prev
          }
        })
      }
    }
  }
  componentDidMount() {
    const isMobile = window.matchMedia(
      '(min-width: 320px) and (max-width: 480px)'
    ).matches
    this.setState({ isMobile })
  }

  handleOnGoHome = () => {
    const {
      currentCurrency,
      currentRegion = '',
      currentLanguage,
      regionsData: { regionsResult }
    } = this.props
    // TODO: temporal solution to avoid the site crashing when you
    // click on Jakroo's logo in the menuBar from the product-catalogue screen
    const regionsCodes =
      regionsResult && regionsResult.map((region) => region.code)

    const regionCode = regionsCodes.includes(currentRegion)
      ? currentRegion
      : 'us'

    window.location.replace(
      `/${regionCode}?lang=${currentLanguage ||
      'en'}&currency=${currentCurrency}`
    )
  }

  handleGoTo = (path: string) => {
    this.handleOnGoTo(path)
  }

  handleOnGoTo = (key: string) => {
    const {
      history: { location, push },
      designHasChanges,
      setAccountScreen,
      openWithoutSaveModalAction
    } = this.props
    let route = '/account'
    if (key !== OVERVIEW) {
      route = route.concat(`?option=${key}`)
    }
    if (
      (location.pathname as String).includes('design-center') &&
      designHasChanges
    ) {
      openWithoutSaveModalAction(true, route)
      return
    }
    setAccountScreen(key)
    push(route)
  }

  handleOnPressNotification = async (notificationId: number, url: string) => {
    const { readNotification } = this.props
    await readNotification({
      variables: {
        id: notificationId
      }
    })
    window.location.href = `${config.baseUrl}${url}`
  }
  markAllNotificationsAsRead = async () => {
    const { readAllotification, notificationsData, intl: { formatMessage } } = this.props
    try {
      this.setState({ updating: true })
      await readAllotification({ variables: {} })
      await notificationsData.refetch()
      this.setState({ updating: false })
    } catch (e) {
      this.setState({ updating: false })
      AntdMessage.error(formatMessage(messages.readError))
    }
  }

  render() {
    const { openForgotPassword, isMobile, updating } = this.state
    const {
      history,
      searchFunc,
      openLogin,
      onChangeLocation,
      currentRegion,
      currentLanguage,
      currentCurrency,
      hideTop,
      hideBottom,
      intl,
      logoutAction,
      saveUserToLocal,
      fakeWidth,
      teamStoresHeader,
      itemsInCart,
      designHasChanges,
      openWithoutSaveModalAction,
      initialCountryCode,
      buyNowHeader,
      saveAndBuy,
      regionsData: { regionsResult, loading: loadingRegions },
      notificationsData
    } = this.props

    let user: any
    if (typeof window !== 'undefined') {
      user = JSON.parse(localStorage.getItem('user') as string)
    }

    const { formatMessage } = intl

    const notifications = get(notificationsData, 'notifications', [])
    const loggedUser = !user ? (
      <TopText onClick={this.handleOpenLogin} data-test="sign-up">
        {formatMessage(messages.title)}
      </TopText>
    ) : (
        <Logout
          {...{ history }}
          title={`${String(user.name).toUpperCase()}`}
          logout={logoutAction}
          goTo={this.handleOnGoTo}
        />
      )

    const regionsCodes =
      !loadingRegions && regionsResult.map((region) => region.code)

    const menuRegion = (
      <MenuRegion
        {...{
          onChangeLocation,
          currentRegion,
          currentLanguage,
          currentCurrency,
          isMobile,
          regionsResult
        }}
      />
    )

    const bottomRowContent = teamStoresHeader ? (
      <BottomRow>
        <LogoIcon src={logo} onClick={this.handleOnGoHome} />
        <TeamStoresMenuContainer>
          <TeamStoresMenuTitle onClick={this.gotoTeamStores}>
            {formatMessage(messages.teamStoresTitle)}
          </TeamStoresMenuTitle>
        </TeamStoresMenuContainer>
        <div />
      </BottomRow>
    ) : (
        <BottomRow>
          <LogoIcon src={logo} onClick={this.handleOnGoHome} />
          <DropdownList
            {...{ history, formatMessage, currentCurrency, regionsCodes }}
          />
          <SearchBar search={searchFunc} onHeader={true} {...{ formatMessage }} />
        </BottomRow>
      )

    return (
      <div>
        <MediaQuery
          minWidth={992}
          values={{ width: fakeWidth, deviceWidth: fakeWidth }}
        >
          {(matches) => {
            if (matches) {
              return (
                <Container>
                  {!hideTop && (
                    <Row>
                      <MenuSupport
                        {...{
                          history,
                          designHasChanges,
                          openWithoutSaveModalAction
                        }}
                      />
                      <TopRow>
                        {menuRegion}
                        <Cart
                          totalItems={itemsInCart}
                          {...{
                            history,
                            designHasChanges,
                            openWithoutSaveModalAction
                          }}
                        />
                        <Notifications
                          {...{
                            notifications,
                            history,
                            isMobile,
                            formatMessage,
                            updating
                          }}
                          onPressNotification={this.handleOnPressNotification}
                          onPressMarkAllAsRead={this.markAllNotificationsAsRead}
                        />
                        {loggedUser}
                      </TopRow>
                    </Row>
                  )}
                  <Divider />
                  {!hideBottom && bottomRowContent}
                </Container>
              )
            } else {
              return (
                !hideTop && (
                  <MenuMobile
                    {...{
                      history,
                      designHasChanges,
                      openWithoutSaveModalAction,
                      formatMessage,
                      buyNowHeader,
                      saveAndBuy,
                      notifications
                    }}
                    handleOnGoHome={this.handleOnGoHome}
                    totalItems={itemsInCart}
                    hide={hideTop}
                    loginButton={loggedUser}
                    regionButton={menuRegion}
                    onPressNotification={this.handleOnPressNotification}
                    onPressMarkAllAsRead={this.markAllNotificationsAsRead}
                    updatingNotifications={updating}
                  />
                )
              )
            }
          }}
        </MediaQuery>
        <Login
          open={openLogin}
          requestClose={this.handleCloseLogin}
          handleForgotPassword={this.handleOpenForgotPassword}
          login={saveUserToLocal}
          {...{ formatMessage, initialCountryCode }}
        />
        <ForgotPassword
          open={openForgotPassword}
          requestClose={this.handleOpenForgotPassword}
          openLogin={this.handleOpenLogin}
          {...{ formatMessage }}
        />
      </div>
    )
  }

  gotoTeamStores = () => {
    const { history } = this.props
    history.push('/search-teamstores')
  }

  handleOpenLogin = () => {
    const { openLoginAction } = this.props
    openLoginAction(true)
  }

  handleCloseLogin = () => {
    const { openLoginAction } = this.props
    openLoginAction(false)
  }
  handleOpenForgotPassword = () => {
    this.handleCloseLogin()
    const { openForgotPassword } = this.state
    this.setState({ openForgotPassword: !openForgotPassword })
  }
}

const MenuBarEnhanced = compose(
  graphql<RegionsData>(regionsQuery, {
    name: 'regionsData',
    options: () => ({
      fetchPolicy: 'network-only',
      variables: {}
    })
  }),
  graphql<NotificationsData>(notificationsQuery, {
    name: 'notificationsData',
    options: () => {
      let user
      if (typeof window !== 'undefined') {
        user = JSON.parse(localStorage.getItem('user') as string)
      }
      return {
        skip: !user
      }
    }
  }),
  setAsRead,
  setAllAsRead
)(MenuBar)
export default MenuBarEnhanced
