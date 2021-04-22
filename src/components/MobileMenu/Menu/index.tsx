/**
 * Menu Component - Created by david on 03/04/18.
 */
import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
import queryString from 'query-string'
import MenuAntd from 'antd/lib/menu'
import Spin from 'antd/lib/spin'
import {
  logoutAction
} from '../../MainLayout/actions'
import {
  Container,
  Bottom,
  menuStyle,
  BottomDiv,
  Item,
  StyledSubMenu,
  containerStyle,
  MenuTitle,
  BetaLabel
} from './styledComponents'
import messages from './messages'
import messagesMenu from '../../../screens/Account/messages'
import { menuOptions, AFFILIATES, RESELLER, resellerShortOptions, resellerOptions, PRO_DESIGN } from './constants'
import { setCurrentScreenAction } from '../../../screens/Account/actions'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'

interface Props {
  client: any
  data?: any
  history: any
  resellerEnabled?: boolean
  showProDesign?: boolean
  affiliateEnabled?: boolean
  openMenuAccount: boolean
  resellerPending?: boolean
  approvedReseller?: boolean
  hideMenu: () => void
  logoutAction: () => void
  setCurrentScreen: (screen: string) => void
  loginButton: React.ReactNode
  menuOpen: boolean
  formatMessage: (messageDescriptor: any) => string
}

class Menu extends React.PureComponent<Props, {}> {
  state = {
    openKeys: [''],
    sportSelected: null
  }

  componentWillReceiveProps({ menuOpen }: Props) {
    if (menuOpen === false) {
      this.setState({ openKeys: [''] })
    }
  }

  handleOpenSport = (sport: string) => {
    this.setState({ sportSelected: sport })
  }

  handleClick = ({
    item: {
      props: { children }
    },
    key
  }: any) => {
    const {
      openMenuAccount,
      setCurrentScreen,
      history: {
        push,
        replace,
        location: { search, pathname }
      },
      hideMenu
    } = this.props

    if (openMenuAccount) {
      hideMenu()
      push(`/account?option=${key}`)
      setCurrentScreen(key)
      return
    }

    const { sportSelected } = this.state

    const { gender, category, sport } = queryString.parse(search)

    const toCategory = children.replace(' & ', ' ')
    const toSport = sportSelected && (sportSelected as string).toLowerCase()

    const route = `/product-catalogue?${key}`
    const atProductCatalogue = (pathname as String).includes(
      'product-catalogue'
    )

    let isChangingCategory = false
    let isChangingSport = false

    if (atProductCatalogue) {
      isChangingCategory = category && category !== toCategory
      isChangingSport = sport && sport !== toSport
    }
    const isMissingFilter = !gender || !category || !sport
    const isChangingFilter = isChangingCategory || isChangingSport

    if ((atProductCatalogue && isMissingFilter) || isChangingFilter) {
      hideMenu()
      replace(route, { forced: true })
      return
    }

    push(route)
  }

  logout = () => {
    const { logoutAction: logout } = this.props
    logout()
    window.location.replace('/')
  }

  onOpenChange = (openKeys: string[]) => {
    if (openKeys[openKeys.length - 1].substring(0, 4) === 'menu') {
      const newOpenKeys = ['']
      newOpenKeys.push(openKeys[openKeys.length - 1])
      this.setState({ openKeys: newOpenKeys })
    } else {
      this.setState({ openKeys })
    }
  }

  handleOnSeeAll = () => {
    const { history } = this.props
    history.push(`/product-catalogue`)
  }

  render() {
    const {
      data: { loading, error, sports },
      loginButton,
      openMenuAccount,
      affiliateEnabled,
      approvedReseller,
      resellerPending,
      showProDesign,
      resellerEnabled,
      formatMessage
    } = this.props

    if (loading) {
      return (
        <div>
          <Spin />
        </div>
      )
    }

    if (error) {
      return <div>{formatMessage(messages.error)}</div>
    }
    let sideMenu = menuOptions

    if (resellerPending) {
      sideMenu = resellerShortOptions
    } else if (approvedReseller) {
      sideMenu = resellerOptions
    }

    const menuAccount = sideMenu.map(({ title, options: submenus, beta }) =>
      submenus.length ?
      (((title === AFFILIATES && affiliateEnabled) || 
        (title === RESELLER && resellerEnabled) ||
        (title === PRO_DESIGN && showProDesign)
      )
      || (title !== AFFILIATES && title !== RESELLER && title !== PRO_DESIGN)) &&
        <StyledSubMenu
          key={title}
          title={
            <MenuTitle>
              {formatMessage(messagesMenu[title])}
              {beta && <BetaLabel>{formatMessage(messages.beta)}</BetaLabel>}
            </MenuTitle>
          }
        >
          {submenus.map((label) => (
            <Item key={label}>
              {formatMessage(messagesMenu[label])}
            </Item>
          ))}
        </StyledSubMenu>
        : (
          <Item withBorder={true} key={title}>
            {formatMessage(messagesMenu[title])}
          </Item>
        )
    )

    const optionsSports = sports.map(({ name, categories }, index) => {
      // TODO: Check this out.
      // this.getCategories(id)
      return (
        <StyledSubMenu
          key={`menu-${name}-${index}`}
          onClick={this.handleOpenSport(name)}
          title={<span>{name}</span>}
        >
          {categories.map(({ name: categoryName }: any) => (
            <Item
              key={`sport=${name}&category=${categoryName.replace(' & ', ' ')}`}
            >
              {categoryName}
            </Item>
          ))}
        </StyledSubMenu>
      )
    })

    return (
      <Container>
        <Bottom>{loginButton}</Bottom>
        <SwipeableViews
          {... {containerStyle }}
          index={openMenuAccount ? 1 : 0}
          disabled={true}
          animateHeight={true}
        >
          <MenuAntd
            mode="inline"
            onSelect={this.handleClick}
            defaultSelectedKeys={['']}
            defaultOpenKeys={['']}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            style={menuStyle}
          >
            {optionsSports}
          </MenuAntd>
          <MenuAntd
            mode="inline"
            onSelect={this.handleClick}
            defaultSelectedKeys={['']}
            defaultOpenKeys={['']}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            style={menuStyle}
          >
            {menuAccount}
          </MenuAntd>
        </SwipeableViews>
        {openMenuAccount ?
          <BottomDiv onClick={this.logout}>
            {formatMessage(messages.logout)}
          </BottomDiv> :
          <BottomDiv onClick={this.handleOnSeeAll}>
            {formatMessage(messages.seeAll)}
          </BottomDiv>
        }
      </Container>
    )
  }
}

const MenuEnhance = compose(
  withApollo,
  connect(null, {
    setCurrentScreen: setCurrentScreenAction,
    logoutAction
  })
)(Menu)

export default MenuEnhance
