/**
 * MenuSupport Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import { Container, Text, Link, menuStyle } from './styledComponents'
import links from './links'

interface Props {}

const MenuSupport = (props: Props) => {
  const items = links.map(({ label, url }, index) => (
    <Menu.Item key={index}>
      <Link href={url}>{label}</Link>
    </Menu.Item>
  ))
  const menu = <Menu style={menuStyle}>{items}</Menu>
  return (
    <Dropdown className="top-dropdown ant-dropdown-menu" overlay={menu}>
      <Text>SUPPORT</Text>
    </Dropdown>
  )
}

export default MenuSupport
