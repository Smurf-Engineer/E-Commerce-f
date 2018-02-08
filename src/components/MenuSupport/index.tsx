/**
 * MenuSupport Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/Menu'
import { Container, Text } from './styledComponents'

interface Props {}

const links = [
  {
    label: 'F.A.Q',
    url: '/'
  },
  {
    label: 'Terms of Use',
    url: '/'
  },
  {
    label: 'Pricing chart',
    url: '/'
  },
  {
    label: ' Warranty',
    url: '/'
  },
  {
    label: ' Design Support',
    url: '/'
  }
]

const MenuSupport = (props: Props) => {
  const items = links.map(({ label, url }, index) => (
    <Menu.Item>
      <a target="_blank" href="url">
        {label}
      </a>
    </Menu.Item>
  ))
  const menu = <Menu>{items}</Menu>
  return (
    <Dropdown overlay={menu}>
      <Text>SUPPORT</Text>
    </Dropdown>
  )
}

export default MenuSupport
