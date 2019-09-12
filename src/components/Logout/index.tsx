/**
 * Logout Component - Created by cazarez on 27/02/18.
 */
import * as React from 'react'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import toUpper from 'lodash/toUpper'
import { FormattedMessage } from 'react-intl'
import MediaQuery from 'react-responsive'
import messages from './messages'
import {
  Container,
  Text,
  menuStyle,
  Icon,
  OverviewStyle
} from './styledComponents'
import {
  SCREEN_LOCKER,
  PROFILE_SETTINGS,
  OVERVIEW
} from '../../screens/Account/constants'

interface Props {
  title: string
  logout: () => void
  goTo: (path: string) => void
}

const Logout = ({ title, logout, goTo }: Props) => {
  const handleOnClick = ({ key }: any) => {
    if (key === 'logout') {
      logout()
    } else {
      goTo(key)
    }
  }

  const logoutMenu = (
    <Menu onClick={handleOnClick} style={menuStyle}>
      <Menu.Item key={SCREEN_LOCKER}>
        <FormattedMessage {...messages.myLockerLabel} />
      </Menu.Item>
      <Menu.Item key={OVERVIEW}>
        <FormattedMessage {...messages.myAccountLabel} />
      </Menu.Item>
      <Menu.Item key={PROFILE_SETTINGS}>
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
              <Text>
                <Menu onClick={handleOnClick} style={OverviewStyle}>
                  <Menu.Item key={OVERVIEW}>{toUpper(title)}</Menu.Item>
                </Menu>
              </Text>
            </Container>
          )
        }
      }}
    </MediaQuery>
  )
}

export default Logout
