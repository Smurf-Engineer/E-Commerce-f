/**
 * Account Screen - Created by david on 05/04/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import Drawer from 'rc-drawer'
import Menu from 'antd/lib/menu'
import Message from 'antd/lib/message'
import Icon from 'antd/lib/icon'
import queryString from 'query-string'
import * as accountActions from './actions'
import { addTeamStoreItemMutation } from './data'
import {
  logoutAction,
  openQuickViewAction
} from '../../components/MainLayout/actions'
import messages from './messages'
import {
  options,
  SCREEN_LOCKER,
  MY_FILES,
  ADDRESSES,
  CREDIT_CARDS,
  TEAMSTORES,
  PROFILE_SETTINGS,
  ORDER_HISTORY,
  OVERVIEW
} from './constants'
import Layout from '../../components/MainLayout'
import Overview from '../../components/Overview'
import ShareDesignModal from '../../components/ShareDesignModal'
import OrderHistory from '../../components/OrderHistory'
import MyAddresses from '../../components/MyAddresses'
import MyCards from '../../components/MyCards'
import ProfileSettings from '../../components/ProfileSettings'
import MyTeamStores from '../../components/MyTeamStores'
import MyLocker from '../../components/MyLocker'
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
import MyFiles from '../../components/MyFiles'
import config from '../../config'
import { TeamStoreItemtype, MessagePayload } from '../../types/common'
import get from 'lodash/get'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'

const { SubMenu } = Menu

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  openKeys: string[]
  screen: string
  defaultScreen: string
  isMobile: boolean
  fakeWidth: number
  openSidebar: boolean
  client: any
  openShareModal: boolean
  currentCurrency: string
  openAddToStoreModal: boolean
  teamStoreId: string
  savedDesignId: string
  itemToAdd: TeamStoreItemtype
  // Mutation action
  addItemToStore: (variables: {}) => Promise<MessagePayload>
  // Redux actions
  setItemToAddAction: (teamStoreItem: {}, teamStoreId: string) => void
  openAddToTeamStoreModalAction: (open: boolean, id: string) => void
  logoutAction: () => void
  setOpenKeysAction: (keys: string[]) => void
  setDefaultScreenAction: (screen: string, openCreations?: boolean) => void
  setCurrentScreenAction: (screen: string) => void
  setCurrentShare: (savedDesignId: string, openShareModal: boolean) => void
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
      setDefaultScreenAction
    } = this.props
    const queryParams = queryString.parse(search)
    const { option } = queryParams
    if (option) {
      if (option === SCREEN_LOCKER || option === MY_FILES) {
        setDefaultScreenAction(option)
        return
      }
      setDefaultScreenAction(option)
      return
    }
    setDefaultScreenAction(OVERVIEW)
  }

  async componentDidMount() {
    const { setIsMobileAction } = this.props
    const isMobile = window.matchMedia(
      '(min-width: 320px) and (max-width: 480px)'
    ).matches
    await LoadScripts(threeDScripts)
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

  addToStore = async () => {
    const {
      addItemToStore,
      itemToAdd,
      teamStoreId,
      openAddToTeamStoreModalAction,
      intl: { formatMessage }
    } = this.props
    const {
      design_id,
      team_store_id,
      visible,
      team_store_name: storeName
    } = itemToAdd
    try {
      const { data } = await addItemToStore({
        variables: {
          teamStoreItem: {
            design_id,
            team_store_id,
            visible
          },
          teamStoreId
        }
      })
      const responseMessage = get(data, 'addTeamStoreItem.message')
      if (responseMessage) {
        Message.success(formatMessage(messages.addedToStore, { storeName }))
      }
      openAddToTeamStoreModalAction(false, '')
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    }
  }

  handleOnSelectItem = ({ key }: any) => {
    const { history, setCurrentScreenAction } = this.props

    if (key === SCREEN_LOCKER) {
      history.replace(`/account?option=${SCREEN_LOCKER}`)
    }

    setCurrentScreenAction(key)
  }

  handleOnGoToScreen = (screen: string) => {
    const { setCurrentScreenAction } = this.props
    setCurrentScreenAction(screen)
  }

  handleOpenSidebar = () => {
    const { openSidebar, openSidebarMobile } = this.props
    openSidebarMobile(!openSidebar)
  }
  handleRequestCloseShare = () => {
    const { setCurrentShare } = this.props
    setCurrentShare('', false)
  }
  onLogout = () => {
    const {
      logoutAction: logout,
      client: { cache }
    } = this.props
    cache.reset()
    logout()
    window.location.replace('/')
  }

  getScreenComponent = (screen: string) => {
    const {
      isMobile,
      intl: { formatMessage },
      history,
      openQuickViewAction: openQuickView,
      currentCurrency,
      setCurrentShare,
      openAddToStoreModal,
      teamStoreId,
      savedDesignId,
      setItemToAddAction,
      openAddToTeamStoreModalAction
    } = this.props

    switch (screen) {
      case OVERVIEW:
        return (
          <Overview
            {...{ history, formatMessage }}
            currentCurrency={currentCurrency || config.defaultCurrency}
            goToScreen={this.handleOnGoToScreen}
          />
        )
      case ORDER_HISTORY:
        return <OrderHistory {...{ history, formatMessage }} />
      case ADDRESSES:
        return <MyAddresses listForMyAccount={true} {...{ formatMessage }} />
      case CREDIT_CARDS:
        return <MyCards listForMyAccount={true} {...{ formatMessage }} />
      case PROFILE_SETTINGS:
        return <ProfileSettings {...{ isMobile, formatMessage }} />
      case TEAMSTORES:
        return <MyTeamStores {...{ history, formatMessage }} />
      case SCREEN_LOCKER:
        return (
          <MyLocker
            {...{
              setCurrentShare,
              openQuickView,
              formatMessage,
              history,
              openAddToStoreModal,
              teamStoreId,
              savedDesignId,
              setItemToAddAction,
              openAddToTeamStoreModalAction
            }}
            addItemToStore={this.addToStore}
          />
        )
      case MY_FILES:
        return <MyFiles {...{ history, formatMessage }} />
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
      defaultScreen,
      fakeWidth,
      openSidebar,
      openShareModal,
      savedDesignId
    } = this.props

    const menuOptions = options.map(({ title, options: submenus }) =>
      submenus.length ? (
        <SubMenu
          key={title}
          title={<OptionMenu>{intl.formatMessage(messages[title])}</OptionMenu>}
        >
          {submenus.map((label) => (
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

    const logoutButton = (
      <OptionMenu onClick={this.onLogout}>
        {intl.formatMessage(messages.logout)}
      </OptionMenu>
    )

    const sidebarFilters = (
      <DrawerSidebar>
        <FiltersTitle showChildren={openSidebar} color={'#e61737'}>
          {intl.formatMessage(messages.filtersTitle)}
          <Icon type="down" style={{ color: '#e61737' }} />
        </FiltersTitle>
        <Menu
          defaultSelectedKeys={[defaultScreen]}
          selectedKeys={[screen]}
          mode="inline"
          onSelect={this.handleOnSelectItem}
          onOpenChange={this.handleOnSelectedKeys}
          style={menuDeviceStyle}
          {...{ openKeys }}
        >
          {menuOptions}
        </Menu>
        {logoutButton}
      </DrawerSidebar>
    )

    const currentScreen = this.getScreenComponent(screen || defaultScreen)

    const noOrderScreenFlag = screen !== ORDER_HISTORY && screen !== OVERVIEW

    const renderView = (
      <MediaQuery
        maxWidth={768}
        values={{ width: fakeWidth, deviceWidth: fakeWidth }}
      >
        {(matches) => {
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
                        <ScreenTitle show={noOrderScreenFlag}>
                          {!!messages[screen] && (
                            <FormattedMessage {...messages[screen]} />
                          )}
                        </ScreenTitle>
                        {currentScreen}
                      </Content>
                    </Container>
                  </Layout>
                </Drawer>
                <ShareDesignModal
                  open={openShareModal}
                  requestClose={this.handleRequestCloseShare}
                  {...{ formatMessage: intl.formatMessage, savedDesignId }}
                />
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
                      defaultSelectedKeys={[defaultScreen]}
                      selectedKeys={[screen]}
                      mode="inline"
                      onSelect={this.handleOnSelectItem}
                      onOpenChange={this.handleOnSelectedKeys}
                      style={menuStyle}
                      {...{ openKeys }}
                    >
                      {menuOptions}
                    </Menu>
                    {logoutButton}
                  </SideBar>
                  <Content>
                    <ScreenTitle show={noOrderScreenFlag}>
                      {!!messages[screen] && (
                        <FormattedMessage {...messages[screen]} />
                      )}
                    </ScreenTitle>
                    {currentScreen}
                  </Content>
                  <ShareDesignModal
                    open={openShareModal}
                    requestClose={this.handleRequestCloseShare}
                    {...{ formatMessage: intl.formatMessage, savedDesignId }}
                  />
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
  const langProps = state.get('languageProvider').toJS()
  const mainLayout = state.get('layout').toJS()
  return {
    ...account,
    ...responsive,
    ...langProps,
    ...mainLayout
  }
}

const AccountEnhance = compose(
  withApollo,
  addTeamStoreItemMutation,
  injectIntl,
  connect(
    mapStateToProps,
    { ...accountActions, openQuickViewAction, logoutAction }
  )
)(Account)

export default AccountEnhance
