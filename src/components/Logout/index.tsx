/**
 * Logout Component - Created by cazarez on 27/02/18.
 */
import * as React from 'react'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import toUpper from 'lodash/toUpper'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Text, menuStyle } from './styledComponents'

interface Props {
  title: string
  logout: () => void
}

const Logout = ({ title, logout }: Props) => {
  const logoutMenu = (
    <Menu style={menuStyle}>
      <Menu.Item>
        <FormattedMessage {...messages.myLockerLabel} />
      </Menu.Item>
      <Menu.Item>
        <FormattedMessage {...messages.myAccountLabel} />
      </Menu.Item>
      <Menu.Item>
        <FormattedMessage {...messages.profileSettingsLabel} />
      </Menu.Item>
      <Menu.Item>
        <div onClick={logout}>
          <FormattedMessage {...messages.logoutLabel} />
        </div>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={logoutMenu}>
      <Text>{toUpper(title)}</Text>
    </Dropdown>
  )
}

export default Logout
