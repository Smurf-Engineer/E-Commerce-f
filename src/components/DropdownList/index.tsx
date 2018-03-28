/**
 * DropdownList Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Popover from 'antd/lib/popover'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import Menu from 'antd/lib/menu'
import { ReducersObject } from '../../store/rootReducer'
import { categoriesQuery } from './data'
import MenuGender from '../MenuGender'
import MenuSports from '../MenuSports'
import { CLEAR_STATE_ACTION as CLEAR_MENU_GENDER } from '../MenuGender/constants'
import { CLEAR_STATE_ACTION as CLEAR_MENU_SPORTS } from '../MenuSports/constants'
import {
  setMenuGenderSelectedAction,
  setMenuSportSelectedAction
} from './actions'
import { Filter, QueryProps } from '../../types/common'
import {
  Option,
  OptionDropdown,
  overStyle,
  menuStyle
} from './styledComponents'
import messages from './messages'
import { openQuickViewAction } from '../../components/MainLayout/actions'

interface Data extends QueryProps {
  genders: Filter[]
  categories: Filter[]
  sports: Filter[]
}

export interface Option {
  label: string
  visible: boolean
}

interface Props {
  history: any
  dispatch: any
  data: Data
  sportOptions: Option[]
  genderOptions: Option[]
}

export class DropdownList extends React.PureComponent<Props> {
  handleOnSeeAll = (type: string) => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  handleOnCustomize = (id: string) => {
    const { history } = this.props
    history.push(`/design-center?id=${id}`)
  }

  handleOnQuickView = (id: number, yotpoId: string) => {
    const { dispatch } = this.props
    dispatch(openQuickViewAction(id, yotpoId))
  }

  handleOnHideGenderMenu = (visible: boolean, index: number) => {
    const { dispatch } = this.props

    dispatch(setMenuGenderSelectedAction(index, visible))

    if (!visible) {
      dispatch({ type: CLEAR_MENU_GENDER })
    }
  }

  handleOnHideSportsMenu = (visible: boolean, index: number) => {
    const { dispatch } = this.props

    dispatch(setMenuSportSelectedAction(index, visible))

    if (!visible) {
      dispatch({ type: CLEAR_MENU_SPORTS })
    }
  }

  render() {
    const { data, genderOptions, sportOptions } = this.props
    const { genders, categories, sports } = data

    const genderMenus = genderOptions.map(({ label, visible }, index) => (
      <Menu.Item key={label}>
        <Popover
          overlayStyle={overStyle}
          trigger="hover"
          placement="bottom"
          visible={visible}
          mouseEnterDelay={0.3}
          onVisibleChange={isVisible =>
            this.handleOnHideGenderMenu(isVisible, index)
          }
          content={
            <MenuGender
              {...{ genders, sports, categories, visible }}
              type={index}
              onPressSeeAll={this.handleOnSeeAll}
              onPressQuickView={this.handleOnQuickView}
              onPressCustomize={this.handleOnCustomize}
            />
          }
        >
          <OptionDropdown>
            <FormattedMessage {...messages[label]} />
          </OptionDropdown>
        </Popover>
      </Menu.Item>
    ))
    const sportMenus = sportOptions.map(({ label, visible }, index) => (
      <Menu.Item key={label}>
        <Popover
          overlayStyle={overStyle}
          trigger="hover"
          placement="bottom"
          visible={visible}
          mouseEnterDelay={0.3}
          onVisibleChange={isVisible =>
            this.handleOnHideSportsMenu(isVisible, index)
          }
          content={
            <MenuSports
              {...{ sports, categories, visible }}
              type={index}
              onPressSeeAll={this.handleOnSeeAll}
              onPressQuickView={this.handleOnQuickView}
              onPressCustomize={this.handleOnCustomize}
            />
          }
        >
          <OptionDropdown>
            <FormattedMessage {...messages[label]} />
          </OptionDropdown>
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
}

const mapStateToProps = ({ menu }: ReducersObject) => menu.toJS()

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const DropdownListEnhance = compose(
  graphql<Data>(categoriesQuery),
  connect(mapStateToProps, mapDispatchToProps)
)(DropdownList)

export default DropdownListEnhance
