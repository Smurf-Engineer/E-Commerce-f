/**
 * Logout Component - Created by cazarez on 27/02/18.
 */
import * as React from 'react'
import Menu from 'antd/lib/menu'
import toUpper from 'lodash/toUpper'
import MediaQuery from 'react-responsive'
import messages from './messages'
import messagesMenu from '../../screens/Account/messages'
import {
  Container,
  Text,
  menuStyle,
  Icon,
  OverviewStyle,
  titleStyle,
  RightIcon,
  LeftIcon,
  PopoverStyled,
  StyledSubMenu,
  Item,
  overStyle,
  TitleItem,
  UserIcon
} from './styledComponents'
import {
  OVERVIEW
} from '../../screens/Account/constants'
import { AFFILIATES, menuOptions, RESELLER, resellerOptions, resellerShortOptions } from './constants'
import { Message } from '../../types/common'

interface Props {
  title: string
  darkMode?: boolean
  resellerPending?: boolean
  openedMenu: boolean
  resellerEnabled: boolean
  affiliateEnabled: boolean
  approvedReseller?: boolean
  logout: () => void
  openMenu: () => void
  closeMenu: () => void
  goTo: (path: string) => void
  formatMessage: (messageDescriptor: Message) => string
}

class Logout extends React.PureComponent<Props, {}> { 
  state = {
    openKeys: ['']
  }
  handleOnClick = ({ key }: any) => {
    const { logout, goTo } = this.props
    if (key === 'logout') {
      logout()
    } else {
      goTo(key)
    }
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

  render () {
    const {
      title,
      openMenu,
      openedMenu,
      closeMenu,
      formatMessage,
      affiliateEnabled,
      resellerPending,
      resellerEnabled,
      approvedReseller,
      darkMode
    } = this.props
    let sideMenu = menuOptions
    if (resellerPending) {
      sideMenu = resellerShortOptions
    } else if (approvedReseller) {
      sideMenu = resellerOptions
    }
    const logoutMenu = (
      <Menu
        mode="inline"
        onSelect={this.handleOnClick}
        defaultSelectedKeys={['']}
        defaultOpenKeys={['']}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={menuStyle}
      >
        <TitleItem bold={true} key={OVERVIEW}>
          <UserIcon type="user" />
          {title}
        </TitleItem>
        {sideMenu.map(({ titleLabel, options: submenus }) =>
          submenus.length ?
          (((titleLabel === AFFILIATES && affiliateEnabled) || (titleLabel === RESELLER && resellerEnabled))
            || (titleLabel !== AFFILIATES && titleLabel !== RESELLER)) &&
            <StyledSubMenu
              key={titleLabel}
              title={formatMessage(messagesMenu[titleLabel])}
            >
              {submenus.map((label: string) => (
                <Item key={label}>
                  {formatMessage(messagesMenu[label])}
                </Item>
              ))}
            </StyledSubMenu>
            : (
              <Item withBorder={true} key={titleLabel}>
                {formatMessage(messagesMenu[titleLabel])}
              </Item>
            )
        )}
        <Item bold={true} key="logout">
          {formatMessage(messages.logoutLabel)}
        </Item>
      </Menu>
    )
    return (
      <MediaQuery minWidth={992}>
        {matches => {
          if (matches) {
            return (
              <PopoverStyled overlayStyle={overStyle} trigger="hover" placement="bottomRight" content={logoutMenu}>
                <Text {...{darkMode}}>{toUpper(title)}</Text>
              </PopoverStyled>
            )
          } else {
            return (
              <Container>
                {openedMenu && <LeftIcon onClick={closeMenu} type="left" />}
                <Icon type="user" />
                <Text {...{darkMode}}>
                  <Menu onClick={openMenu} style={OverviewStyle}>
                    <Menu.Item style={titleStyle} key={OVERVIEW}>{toUpper(title)}</Menu.Item>
                  </Menu>
                </Text>
                {!openedMenu && <RightIcon onClick={openMenu} type="right" />}
              </Container>
            )
          }
        }}
      </MediaQuery>
    )
  }
}

export default Logout
