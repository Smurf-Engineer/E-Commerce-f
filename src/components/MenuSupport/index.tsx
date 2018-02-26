/**
 * MenuSupport Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Dropdown from 'antd/lib/dropdown'
import { FormattedMessage } from 'react-intl'
import Menu from 'antd/lib/menu'
import messages from './messages'
import { Container, Text, Link, menuStyle } from './styledComponents'
import links from './links'

interface Props {}

const MenuSupport = (props: Props) => {
  const items = links.map(({ label, url }, index) => (
    <Menu.Item key={index}>
      <Link href={url}>
        <FormattedMessage {...messages[label]} />
      </Link>
    </Menu.Item>
  ))
  const menu = <Menu style={menuStyle}>{items}</Menu>
  return (
    <Dropdown overlay={menu}>
      <Text>
        <FormattedMessage {...messages.title} />
      </Text>
    </Dropdown>
  )
}

export default MenuSupport
