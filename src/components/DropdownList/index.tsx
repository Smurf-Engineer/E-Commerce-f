/**
 * DropdownList Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Popover from 'antd/lib/popover'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import Menu from 'antd/lib/menu'
import { QueryProps } from '../../types/common'
import { categoriesQuery } from './data'
import MenuGender from '../MenuGender'
import { CLEAR_STATE_ACTION as CLEAR_MENU_GENDER } from '../MenuGender/constants'
import { CLEAR_STATE_ACTION as CLEAR_MENU_SPORTS } from '../MenuSports/constants'
import MenuSports from '../MenuSports'
import { Filter } from '../../types/common'
import {
  Container,
  Option,
  OptionDropdown,
  overStyle,
  menuStyle
} from './styledComponents'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

interface Data extends QueryProps {
  categories: Filter[]
  sports: Filter[]
}

interface Props {
  history: any
  dispatch: any
  data: Data
}

const genderOptions = ['men', 'women']
const sportOptions = ['cycling', 'triathalon', 'nordic', 'active']

export const DropdownList = ({ history, dispatch, data }: Props) => {
  const { categories, sports } = data
  const handleOnSeeAll = (type: string) => {
    history.push('product-catalogue')
  }

  const handleOnCustomize = (id: string) => {
    history.push('designer')
  }

  const handleOnHideGenderMenu = (visible: boolean) => {
    if (!visible) {
      dispatch({ type: CLEAR_MENU_GENDER })
    }
  }

  const handleOnHideSportsMenu = (visible: boolean) => {
    if (!visible) {
      dispatch({ type: CLEAR_MENU_SPORTS })
    }
  }

  const genderMenus = genderOptions.map(option => (
    <Menu.Item key={option}>
      <Popover
        key={option}
        overlayStyle={overStyle}
        trigger="hover"
        placement="bottom"
        onVisibleChange={handleOnHideGenderMenu}
        content={
          <MenuGender
            {...{ sports, categories }}
            type={option}
            onPressSeeAll={handleOnSeeAll}
            onPressCustomize={handleOnCustomize}
          />
        }
      >
        <OptionDropdown>{option.toUpperCase()}</OptionDropdown>
      </Popover>
    </Menu.Item>
  ))
  const sportMenus = sportOptions.map((option, index) => (
    <Menu.Item key={option}>
      <Popover
        key={option}
        overlayStyle={overStyle}
        trigger="hover"
        placement="bottom"
        onVisibleChange={handleOnHideSportsMenu}
        content={
          <MenuSports
            {...{ sports, categories }}
            type={index}
            onPressSeeAll={handleOnSeeAll}
            onPressCustomize={handleOnCustomize}
          />
        }
      >
        <OptionDropdown>{option.toUpperCase()}</OptionDropdown>
      </Popover>
    </Menu.Item>
  ))
  return (
    <Menu mode="horizontal" selectable={false} style={menuStyle}>
      {genderMenus}
      {sportMenus}
    </Menu>
  )
}

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const DropdownListEnhance = compose(
  graphql<Data>(categoriesQuery),
  connect(null, mapDispatchToProps)
)(DropdownList)

export default DropdownListEnhance
