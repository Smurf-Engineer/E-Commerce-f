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

interface Props {
  history: any
}

const DropdownList = ({ history }: Props) => {
  const handleOnSeeAll = (type: string) => {
    history.push('product-catalogue')
  }
  const handleOnCustomize = (id: string) => {
    history.push('designer')
  }
  return (
    <Container>
      <Popover
        overlayStyle={overStyle}
        trigger="hover"
        placement="bottom"
        content={
          <MenuGender
            type="men"
            onPressSeeAll={handleOnSeeAll}
            onPressCustomize={handleOnCustomize}
          />
        }
      >
        <OptionDropdown>{'MEN'}</OptionDropdown>
      </Popover>
      <Popover
        overlayStyle={overStyle}
        trigger="hover"
        placement="bottom"
        content={
          <MenuGender
            type="women"
            onPressSeeAll={handleOnSeeAll}
            onPressCustomize={handleOnCustomize}
          />
        }
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
