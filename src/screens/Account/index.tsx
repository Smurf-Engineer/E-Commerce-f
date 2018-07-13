/**
 * Account Screen - Created by david on 05/04/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import Drawer from 'rc-drawer'
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import queryString from 'query-string'
import * as accountActions from './actions'
import messages from './messages'
import {
  options,
  SCREEN_LOCKER,
  MY_FILES,
  ADDRESSES,
  CREDIT_CARDS,
  TEAMSTORES,
  PROFILE_SETTINGS
} from './constants'
import Layout from '../../components/MainLayout'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import MyLocker from '../../components/MyLocker'
import MyTeamStores from '../../components/MyTeamStores'
import MyAddresses from '../../components/MyAddresses'
import MyCards from '../../components/MyCards'
import ProfileSettings from '../../components/ProfileSettings'
import {
  Container,
  SideBar,
  Content,
  Title,
  ScreenTitle,
  menuStyle,
  OptionMenu,
  FiltersTitle,
  menuDeviceStyle,
  DrawerSidebar
} from './styledComponents'

const { SubMenu } = Menu

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  openKeys: string[]
  screen: string
  isMobile: boolean
  fakeWidth: number
  openSidebar: boolean
  // Redux actions
  setOpenKeysAction: (keys: string[]) => void
  setCurrentScreenAction: (screen: string, openCreations?: boolean) => void
  openQuickViewAction: (id: number, yotpoId: string | null) => void
  clearReducerAction: () => void
  setIsMobileAction: (isMobile: boolean) => void
  openSidebarMobile: (open: boolean) => void
}

export class Account extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { clearReducerAction } = this.props
    clearReducerAction()
  }

  componentWillMount() {
    const {
      location: { search },
      setCurrentScreenAction
    } = this.props
    const queryParams = queryString.parse(search)
    const { option } = queryParams
    if (option) {
      if (option === SCREEN_LOCKER || option === MY_FILES) {
        setCurrentScreenAction(option, true)
        return
      }
      setCurrentScreenAction(option)
    }
  }

  componentDidMount() {
    const { setIsMobileAction } = this.props
    const isMobile = window.matchMedia(
      '(min-width: 320px) and (max-width: 480px)'
    ).matches
    setIsMobileAction(isMobile)
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
    const { setCurrentScreenAction } = this.props
    setCurrentScreenAction(key)
  }

  handleOpenSidebar = () => {
    const { openSidebar, openSidebarMobile } = this.props
    openSidebarMobile(!openSidebar)
  }

  getScreenComponent = (screen: string) => {
    const {
      isMobile,
      intl: { formatMessage },
      history,
      openQuickViewAction: openQuickView
    } = this.props
    switch (screen) {
      case ADDRESSES:
        return <MyAddresses {...{ formatMessage }} />
      case CREDIT_CARDS:
        return <MyCards {...{ formatMessage }} />
      case PROFILE_SETTINGS:
        return <ProfileSettings {...{ isMobile, formatMessage }} />
      case TEAMSTORES:
        return <MyTeamStores {...{ history, formatMessage }} />
      case SCREEN_LOCKER:
        return <MyLocker {...{ openQuickView, formatMessage, history }} />
      default:
        return null
    }
  }

  render() {
    const {
      intl,
      history,
      openKeys,
      screen,
      fakeWidth,
      openSidebar
    } = this.props

    const menuOptions = options.map(
      ({ title, options: submenus }) =>
        submenus.length ? (
          <SubMenu
            key={title}
            title={
              <OptionMenu>{intl.formatMessage(messages[title])}</OptionMenu>
            }
          >
            {submenus.map(label => (
              <Menu.Item key={label}>
                <FormattedMessage {...messages[label]} />
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item className="ant-menu-item-custom" key={title}>
            <OptionMenu>{intl.formatMessage(messages[title])}</OptionMenu>
          </Menu.Item>
        )
    )

    const sidebarFilters = (
      <DrawerSidebar>
        <FiltersTitle showChildren={openSidebar} color={'#e61737'}>
          {intl.formatMessage(messages.filtersTitle)}
          <Icon type="down" style={{ color: '#e61737' }} />
        </FiltersTitle>
        <Menu
          {...{ openKeys }}
          mode="inline"
          onSelect={this.handleOnSelectItem}
          onOpenChange={this.handleOnSelectedKeys}
          style={menuDeviceStyle}
        >
          {menuOptions}
        </Menu>
      </DrawerSidebar>
    )

    const currentScreen = this.getScreenComponent(screen)

    const renderView = (
      <MediaQuery
        maxWidth={768}
        values={{ width: fakeWidth, deviceWidth: fakeWidth }}
      >
        {matches => {
          if (matches) {
            return (
              <div className="drawer-container">
                <Drawer
                  open={openSidebar}
                  sidebar={sidebarFilters}
                  position={'left'}
                  touch={true}
                  onOpenChange={this.handleOpenSidebar}
                >
                  <Layout {...{ history, intl }}>
                    <Container>
                      <Content width={'100%'}>
                        <FiltersTitle
                          showChildren={true}
                          onClick={this.handleOpenSidebar}
                        >
                          {intl.formatMessage(messages.filtersTitle)}
                          <Icon type="down" />
                        </FiltersTitle>
                        <ScreenTitle>
                          {!!messages[screen] && (
                            <FormattedMessage {...messages[screen]} />
                          )}
                        </ScreenTitle>
                        {currentScreen}
                      </Content>
                    </Container>
                  </Layout>
                </Drawer>
              </div>
            )
          } else {
            return (
              <Layout {...{ history, intl }}>
                <Container>
                  <SideBar>
                    <Title>
                      <FormattedMessage {...messages.title} />
                    </Title>
                    <Menu
                      {...{ openKeys }}
                      mode="inline"
                      onSelect={this.handleOnSelectItem}
                      onOpenChange={this.handleOnSelectedKeys}
                      style={menuStyle}
                    >
                      {menuOptions}
                    </Menu>
                  </SideBar>
                  <Content>
                    <ScreenTitle>
                      {!!messages[screen] && (
                        <FormattedMessage {...messages[screen]} />
                      )}
                    </ScreenTitle>
                    {currentScreen}
                  </Content>
                </Container>
              </Layout>
            )
          }
        }}
      </MediaQuery>
    )

    return renderView
  }
}

const mapStateToProps = (state: any) => {
  const account = state.get('account').toJS()
  const responsive = state.get('responsive').toJS()
  return { ...account, ...responsive }
}

const AccountEnhance = compose(
  injectIntl,
  connect(
    mapStateToProps,
    { ...accountActions, openQuickViewAction }
  )
)(Account)

export default AccountEnhance
