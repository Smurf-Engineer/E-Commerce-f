/**
 * Logout Component - Created by cazarez on 27/02/18.
 */
import * as React from 'react'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import toUpper from 'lodash/toUpper'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text, menuStyle, Icon } from './styledComponents'
import {
  SCREEN_LOCKER,
  PROFILE_SETTINGS
} from '../../screens/Account/constants'
import MediaQuery from 'react-responsive'

interface Props {
  title: string
  logout: () => void
  goTo: (path: string) => void
}

const Logout = ({ title, logout, goTo }: Props) => {
  const handleOnClick = ({ key }: any) => {
    switch (key) {
      case 'logout':
        logout()
        break
      case 'account':
        goTo('account')
        break
      case 'locker':
        goTo(`/account?option=${SCREEN_LOCKER}`)
        break
      case 'settings':
        goTo(`/account?option=${PROFILE_SETTINGS}`)
        break
      default:
        break
    }
  }

  const handleOnGoToMyAccount = () => {
    goTo('account')
  }

  const logoutMenu = (
    <Menu onClick={handleOnClick} style={menuStyle}>
      <Menu.Item key="locker">
        <FormattedMessage {...messages.myLockerLabel} />
      </Menu.Item>
      <Menu.Item key="account">
        <FormattedMessage {...messages.myAccountLabel} />
      </Menu.Item>
      <Menu.Item key="settings">
        <FormattedMessage {...messages.profileSettingsLabel} />
      </Menu.Item>
      <Menu.Item key="logout">
        <FormattedMessage {...messages.logoutLabel} />
      </Menu.Item>
    </Menu>
  )

  return (
    <MediaQuery minWidth={992}>
      {matches => {
        if (matches) {
          return (
            <Dropdown overlay={logoutMenu}>
              <Text>{toUpper(title)}</Text>
            </Dropdown>
          )
        } else {
          return (
            <Container>
              <Icon type="user" />
              <Text onClick={handleOnGoToMyAccount}>{toUpper(title)}</Text>
            </Container>
          )
        }
      }}
    </MediaQuery>
  )
}

export default Logout
