/**
 * DropdownList Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Popover from 'antd/lib/popover'
import Menu from 'antd/lib/menu'
import MenuGender from '../MenuGender'
import {
  Container,
  Option,
  OptionDropdown,
  overStyle
} from './styledComponents'

interface Props {}

const DropdownList = (props: Props) => {
  return (
    <Container>
      <Popover
        overlayStyle={overStyle}
        trigger="hover"
        placement="bottom"
        content={<MenuGender type="men" />}
      >
        <OptionDropdown>{'MEN'}</OptionDropdown>
      </Popover>
      <Popover
        overlayStyle={overStyle}
        trigger="hover"
        placement="bottom"
        content={<MenuGender type="women" />}
      >
        <OptionDropdown>{'WOMEN'}</OptionDropdown>
      </Popover>
      <OptionDropdown>{'CYCLING'}</OptionDropdown>
      <OptionDropdown>{'TRIATHALON'}</OptionDropdown>
      <OptionDropdown>{'NORDIC'}</OptionDropdown>
      <OptionDropdown>{'ACTIVE'}</OptionDropdown>
    </Container>
  )
}

export default DropdownList
