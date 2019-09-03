/**
 * AdminLayout Component - Created by eduardoquintero on 29/03/19.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'
import GoogleFontLoader from 'react-google-font-loader'
import get from 'lodash/get'
import Menu from 'antd/lib/menu'
import isEmpty from 'lodash/isEmpty'
import messages from './messages'
import { connect } from 'react-redux'
import { InjectedIntl, FormattedMessage } from 'react-intl'
import * as LayoutActions from './actions'
import * as LocaleActions from '../../screens/LanguageProvider/actions'
import { UserType, Font, SimpleFont } from '../../types/common'
import config from '../../config/index'
import { getTeamStoreStatus, getFonts } from './data'
import * as adminLayoutActions from './api'
import {
  options,
  ORDER_STATUS,
  DISCOUNTS,
  PRODUCT_CATALOG,
  PRODUCT_INTERNAL,
  USERS,
  TEAM_STORES,
  DESIGN_SEARCH,
  DESIGN_LAB,
  EDIT_NAVIGATION
} from './constants'
import {
  SideBar,
  Container,
  OptionMenu,
  Content,
  LogoutButton
} from './styledComponents'
import Helmet from 'react-helmet'

const { SubMenu } = Menu

interface Props extends RouteComponentProps<any> {
  children: React.ReactChildren
  intl: InjectedIntl
  client: any
  user: UserType
  fontsData: any
  fonts: []
  openKeys: string[]
  screen: string
  onLogout: () => void
  restoreUserSession: () => void
  deleteUserSession: () => void
  getFontsData: () => Promise<Font>
  setInstalledFontsAction: (fonts: any) => void
  setOpenKeysAction: (keys: string[]) => void
  setCurrentScreenAction: (screen: string) => void
}

class AdminLayout extends React.Component<Props, {}> {
  componentWillMount() {
    const { user } = this.props
    if (typeof window !== 'undefined' && !user) {
      const { restoreUserSession } = this.props
      restoreUserSession()
    }
  }

  async componentDidMount() {
    const { getFontsData, setInstalledFontsAction } = this.props

    const fontsResponse = await getFontsData()
    const fontsList = get(fontsResponse, 'data.fontsData', {})
    const fonts: SimpleFont[] = fontsList.map((font: Font) => ({
      font: font.family
    }))
    setInstalledFontsAction(fonts)
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
      case ORDER_STATUS:
        history.push('/admin')
        break
      case DISCOUNTS:
        history.push('/admin/discounts')
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
      case USERS:
        history.push('/admin/users')
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
      default:
        break
    }
    setCurrentScreenAction(key)
  }

  render() {
    const { children, fonts, intl, openKeys, screen, onLogout } = this.props
    const menuOptions = options.map(({ title, options: submenus }) =>
      submenus.length ? (
        <SubMenu
          key={title}
          title={<OptionMenu>{intl.formatMessage(messages[title])}</OptionMenu>}
        >
          {submenus.map(label => (
            <Menu.Item key={label} active={true}>
              {<FormattedMessage {...messages[label]} />}
            </Menu.Item>
          ))}
        </SubMenu>
      ) : (
        <Menu.Item className="ant-menu-item-custom" key={title}>
          <OptionMenu>{intl.formatMessage(messages[title])}</OptionMenu>
        </Menu.Item>
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
        <Helmet defaultTitle={config.mainTitle} />
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
