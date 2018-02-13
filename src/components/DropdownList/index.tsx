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

const genderOptions = ['men', 'women']

const DropdownList = ({ history }: Props) => {
  const handleOnSeeAll = (type: string) => {
    history.push('product-catalogue')
  }
  const handleOnCustomize = (id: string) => {
    history.push('designer')
  }
  const genderMenus = genderOptions.map(option => (
    <Popover
      key={option}
      overlayStyle={overStyle}
      trigger="hover"
      placement="bottom"
      content={
        <MenuGender
          type={option}
          onPressSeeAll={handleOnSeeAll}
          onPressCustomize={handleOnCustomize}
        />
      }
    >
      <OptionDropdown>{option.toUpperCase()}</OptionDropdown>
    </Popover>
  ))
  return (
    <Container>
      {genderMenus}
      {/* TODO: USE MAP WHEN MENU SPORTS Component is ready */}
      <OptionDropdown>{'CYCLING'}</OptionDropdown>
      <OptionDropdown>{'TRIATHALON'}</OptionDropdown>
      <OptionDropdown>{'NORDIC'}</OptionDropdown>
      <OptionDropdown>{'ACTIVE'}</OptionDropdown>
    </Container>
  )
}

export default DropdownList
