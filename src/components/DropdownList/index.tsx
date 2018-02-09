/**
 * DropdownList Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Popover from 'antd/lib/popover'
import Menu from 'antd/lib/menu'
import { Container, Option, OptionDropdown } from './styledComponents'

interface Props {}

const DropdownList = (props: Props) => {
  return (
    <Container>
      <Popover
        style={{ paddingTop: 15 }}
        placement="bottom"
        content={<div>SOME</div>}
      >
        <OptionDropdown>{'MEN'}</OptionDropdown>
      </Popover>
      <OptionDropdown>{'WOMEN'}</OptionDropdown>
      <OptionDropdown>{'CYCLING'}</OptionDropdown>
      <OptionDropdown>{'TRIATHALON'}</OptionDropdown>
      <OptionDropdown>{'NORDIC'}</OptionDropdown>
      <OptionDropdown>{'ACTIVE'}</OptionDropdown>
    </Container>
  )
}

export default DropdownList
