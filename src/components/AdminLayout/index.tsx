/**
 * AdminLayout Component - Created by eduardoquintero on 29/03/19.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'
import GoogleFontLoader from 'react-google-font-loader'
import AntdNotification from 'antd/lib/notification'
import get from 'lodash/get'
import find from 'lodash/find'
import Menu from 'antd/lib/menu'
import isEmpty from 'lodash/isEmpty'
import messages from './messages'
import { connect } from 'react-redux'
import { MAIN_TITLE } from '../../constants'
import { InjectedIntl, FormattedMessage } from 'react-intl'
import { firebaseInit, getToken } from '../../utils/realtimeUtils'
import * as LayoutActions from './actions'
import * as LocaleActions from '../../screens/LanguageProvider/actions'
import {
  UserType,
  Font,
  SimpleFont,
  UserPermissions,
  QueryProps,
  Notification as NotificationType,
  MessagePayload,
  PushNotificationData
} from '../../types/common'
import {
  getTeamStoreStatus,
  getFonts,
  notificationsQuery,
  upsertNotificationToken,
  setAsRead
} from './data'
import * as adminLayoutActions from './api'
import {
  options,
  ORDER_STATUS,
  DISCOUNTS,
  PRODUCT_CATALOG,
  PRODUCT_INTERNAL,
  TEAM_STORES,
  DESIGN_SEARCH,
  DESIGN_LAB,
  EDIT_NAVIGATION,
  ADD_PRO_DESIGN,
  CREATE_DESIGNS,
  DESIGN_LAB_TOOLS,
  PRO_ASSIST,
  USER_LIST,
  ROLE_MANAGEMENT,
  SALES_REP,
  AFFILIATES,
  AFFILIATES_PAYOUTS,
  RESELLER_ORDERS,
  RESELLER_PAYOUTS,
  NOTIFICATIONS,
  BADGE,
} from './constants'
import {
  SideBar,
  Container,
  OptionMenu,
  Content,
  LogoutButton,
  Advertisement,
  MenuItem,
  notificationStyles
} from './styledComponents'
import Helmet from 'react-helmet'

const { SubMenu } = Menu

export type NotificationResults = {
  fullCount: number
  list: NotificationType[]
}
interface NotificationsData extends QueryProps {
  notifications: NotificationResults
}

interface NotificationsRead extends QueryProps {
  notification: NotificationType
  loading: boolean
}

interface PushNotification {
  data: {
    'firebase-messaging-msg-data': {
      data: PushNotificationData
    }
  }
}

interface Props extends RouteComponentProps<any> {
  children: React.ReactChildren
  intl: InjectedIntl
  client: any
  user: UserType
  fontsData: any
  fonts: []
  openKeys: string[]
  screen: string
  permissions: UserPermissions
  notificationsData: NotificationsData
  onLogout: () => void
  restoreUserSession: (client: any) => void
  deleteUserSession: () => void
  getFontsData: () => Promise<Font>
  setInstalledFontsAction: (fonts: any) => void
  setOpenKeysAction: (keys: string[]) => void
  setCurrentScreenAction: (screen: string) => void
  readNotification: (variables: {}) => Promise<NotificationsRead>
  upsertNotification: (variables: {}) => Promise<MessagePayload>
}

class AdminLayout extends React.Component<Props, {}> {
  componentWillMount() {
    const { user, client } = this.props
    if (typeof window !== 'undefined' && !user) {
      const { restoreUserSession } = this.props
      restoreUserSession(client)
    }
  }

  componentWillUnmount() {
    navigator.serviceWorker.removeEventListener('message', this.drawNotification)
  }

  async componentDidMount() {
    const { getFontsData, setInstalledFontsAction } = this.props
    const {
      upsertNotification
    } = this.props

    let user = JSON.parse(localStorage.getItem('user') as string)
    if (user) {
      if (user) {
        await firebaseInit()
        const token = await getToken()
        await upsertNotification({
          variables: { token }
        })
        navigator.serviceWorker.addEventListener('message', this.drawNotification)
      }
    }

    const fontsResponse = await getFontsData()
    const fontsList = get(fontsResponse, 'data.fontsData', {})
    const fonts: SimpleFont[] = fontsList.map((font: Font) => ({
      font: font.family
    }))
    setInstalledFontsAction(fonts)
  }

  drawNotification = (notification: PushNotification) => {
    const { data } = notification
    const payload = data['firebase-messaging-msg-data'].data
    const goToUrl = () => this.handleOnPressNotification(payload.id, payload.url)
    if (!this.notificationAlreadyExist(payload.id) && payload.toAdmin === 'true') {
      this.displayNotification(payload, goToUrl)
    }
  }

  notificationAlreadyExist = (notificationId: string) => {
    const { notificationsData } = this.props
    const notifications = get(notificationsData, 'notifications', [])
    const alreadyExist = find(notifications, ['id', notificationId])
    return !!alreadyExist
  }

  displayNotification = async (payload: PushNotificationData, goToUrl: () => void) => {
    AntdNotification.open({
      message: payload.title,
      description: payload.message,
      onClick: goToUrl,
      style: notificationStyles
    })
    this.reloadNotifications()
  }

  reloadNotifications = async () => {
    const { notificationsData } = this.props
    await notificationsData.refetch()
  }

  handleOnPressNotification = async (notificationId: string, url: string) => {
    const { readNotification, history } = this.props
    await readNotification({
      variables: {
        shortId: notificationId
      }
    })
    history.push(url)
  }

  handleOnSelectedKeys = (keys: string[]) => {
    const { setOpenKeysAction } = this.props
    const openKeys = ['']
    if (keys.length > 1 && keys[2]) {
      openKeys.push(keys[2])
      setOpenKeysAction(openKeys)
    } else {
      setOpenKeysAction(keys)
    }
  }
  handleOnSelectItem = ({ key }: any) => {
    const { setCurrentScreenAction, history } = this.props
    switch (key) {
      case NOTIFICATIONS:
        history.push('/admin')
        break
      case ORDER_STATUS:
        history.push('/admin/orders')
        break
      case DISCOUNTS:
        history.push('/admin/discounts')
        break
      case PRO_ASSIST:
        history.push('/admin/pro-assist')
        break
      case PRODUCT_CATALOG:
        history.push('/admin/products')
        break
      case PRODUCT_INTERNAL:
        history.push('/admin/products-internal')
        break
      case DESIGN_SEARCH:
        history.push('/admin/design-search')
        break
      case USER_LIST:
        history.push('/admin/users')
        break
      case ROLE_MANAGEMENT:
        history.push('/admin/roles')
        break
      case SALES_REP:
        history.push('/admin/reps')
        break
      case RESELLER_ORDERS:
        history.push('/admin/reseller-orders')
        break
      case RESELLER_PAYOUTS:
        history.push('/admin/reseller-payouts')
        break
      case AFFILIATES_PAYOUTS:
        history.push('/admin/affiliates-payouts')
        break
      case AFFILIATES:
        history.push('/admin/affiliates')
        break
      case TEAM_STORES:
        history.push('/admin/team-stores')
        break
      case EDIT_NAVIGATION:
        history.push('/admin/edit-navigation')
        break
      case DESIGN_LAB:
        history.push('/admin/design-lab')
        break
      case ADD_PRO_DESIGN:
        history.push('/admin/add-pro-design')
        break
      case CREATE_DESIGNS:
        history.push('/admin/publishing-tool')
        break
      case DESIGN_LAB_TOOLS:
        history.push('/admin/design-tools')
        break
      default:
        break
    }
    setCurrentScreenAction(key)
  }

  render() {
    const {
      children,
      fonts,
      intl,
      openKeys,
      screen,
      onLogout,
      permissions = {},
      notificationsData
    } = this.props

    const notifications = get(notificationsData, 'notifications.list', [])
    const unread = notifications.filter((notification) => !notification.read).length

    if (!Object.keys(permissions).length) {
      return (
        <Advertisement>
          <FormattedMessage {...messages.noRole} />
        </Advertisement>
      )
    }
    const isHidden = options.reduce((obj, { title, options: submenus }) => {
      obj[title] = submenus.every((label) => !permissions[label].view)
      return obj
      // tslint:disable-next-line: align
    }, {})
    const notificationsBadge = unread > 9 ? '+9' : unread
    const menuOptions = options.map(({ title, options: submenus }) =>
      submenus.length && !isHidden[title] ? (
        <SubMenu
          key={title}
          title={<OptionMenu>{intl.formatMessage(messages[title])}</OptionMenu>}
        >
          {submenus.map(
            (label) =>
              permissions[label] &&
              permissions[label].view && (
                <Menu.Item key={label} active={true}>
                  {<FormattedMessage {...messages[label]} />}
                </Menu.Item>
              )
          )}
        </SubMenu>
      ) : (
          permissions[title] &&
          permissions[title].view && (
            <MenuItem className={`ant-menu-item-custom 
              ${title === NOTIFICATIONS && notificationsBadge > 0 && BADGE}`} key={title}
              notifications={notificationsBadge}
            >
              <OptionMenu>{intl.formatMessage(messages[title])}</OptionMenu>
            </MenuItem>
          )
        )
    )

    const logoutButton = (
      <LogoutButton>
        <OptionMenu onClick={onLogout}>
          {intl.formatMessage(messages.logout)}
        </OptionMenu>
      </LogoutButton>
    )

    return (
      <Container>
        {!isEmpty(fonts) && <GoogleFontLoader {...{ fonts }} />}
        <Helmet defaultTitle={MAIN_TITLE} />

        <SideBar>
          <Menu
            selectedKeys={[screen]}
            mode="inline"
            onSelect={this.handleOnSelectItem}
            onOpenChange={this.handleOnSelectedKeys}
            {...{ openKeys }}
          >
            {menuOptions}
          </Menu>
          {logoutButton}
        </SideBar>
        <Content>{children}</Content>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => {
  const adminLayout = state.get('adminLayout').toJS()
  const layoutProps = state.get('layout').toJS()
  const responsive = state.get('responsive').toJS()
  const app = state.get('app').toJS()
  return {
    ...layoutProps,
    ...responsive,
    ...adminLayout,
    ...app
  }
}

const LayoutEnhance = compose(
  withApollo,
  getTeamStoreStatus,
  getFonts,
  notificationsQuery,
  setAsRead,
  upsertNotificationToken,
  connect(
    mapStateToProps,
    {
      ...LayoutActions,
      ...LocaleActions,
      ...adminLayoutActions
    }
  )
)(AdminLayout)
export default LayoutEnhance
