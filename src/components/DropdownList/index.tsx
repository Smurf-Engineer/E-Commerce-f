/**
 * DropdownList Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Popover from 'antd/lib/popover'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import Menu from 'antd/lib/menu'
import queryString from 'query-string'
import lowerFirst from 'lodash/lowerFirst'
import { categoriesQuery } from './data'
import MenuGender from '../MenuGender'
import MenuSports from '../MenuSports'
import { CLEAR_STATE_ACTION as CLEAR_MENU_GENDER } from '../MenuGender/constants'
import { CLEAR_STATE_ACTION as CLEAR_MENU_SPORTS } from '../MenuSports/constants'
import {
  setMenuGenderSelectedAction,
  setMenuSportSelectedAction,
  setGenderSportAction
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
  genderSportSelected: number
  sportOptions: Option[]
  genderOptions: Option[]
  menuGender: any
  currentCurrency: string
  formatMessage: (messageDescriptor: any) => string
}

export class DropdownList extends React.PureComponent<Props> {
  handleOnSeeAllFilters = (type: number) => {
    const {
      history: { push, location }
    } = this.props
    const queryParams = queryString.parse(location.search)
    const gender = type ? 'women' : 'men'
    const route = `/product-catalogue?gender=${gender}`
    const atProductCatalogue = (location.pathname as String).includes(
      'product-catalogue'
    )
    if (
      (atProductCatalogue && !queryParams.gender) ||
      (atProductCatalogue &&
        queryParams.gender &&
        queryParams.gender !== gender)
    ) {
      window.location.replace(route)
      return
    }
    push(route)
  }

  handleOnSeeAll = (type: number, categorySelected: string) => {
    const {
      history: {
        push,
        location: { search, pathname }
      }
    } = this.props

    const { gender, category } = queryString.parse(search)

    const toGender = type ? 'women' : 'men'
    let toCategory: any = categorySelected.replace(/\s/g, '')

    toCategory =
      (toCategory.includes('&') && toCategory.split('&')) ||
      lowerFirst(toCategory)

    if (Array.isArray(toCategory) && toCategory.length > 1) {
      toCategory = `${lowerFirst(toCategory[0])}-${lowerFirst(toCategory[1])}`
    }

    const route = `/product-catalogue?gender=${toGender}&category=${toCategory}`
    const atProductCatalogue = (pathname as String).includes(
      'product-catalogue'
    )

    const isChangingGender = atProductCatalogue && gender && gender !== toGender
    const isChangingCategory =
      atProductCatalogue && category && category !== toCategory

    if (
      (atProductCatalogue && (!gender || !category)) ||
      isChangingGender ||
      isChangingCategory
    ) {
      window.location.replace(route)
      return
    }

    push(route)
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

  handleOnGenderSportChange = (sportSelected: number) => {
    const { dispatch } = this.props

    dispatch(setGenderSportAction(sportSelected))
  }

  render() {
    const {
      data,
      genderOptions,
      sportOptions,
      formatMessage,
      genderSportSelected,
      currentCurrency
    } = this.props
    const { genders, sports } = data

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
              {...{ genders, sports, visible, formatMessage, currentCurrency }}
              type={index}
              onPressSeeAll={this.handleOnSeeAll}
              onPressQuickView={this.handleOnQuickView}
              onPressCustomize={this.handleOnCustomize}
              sportSelected={genderSportSelected}
              setSportAction={this.handleOnGenderSportChange}
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
              {...{ sports, visible, formatMessage, currentCurrency }}
              type={index}
              name={label}
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

const mapStateToProps = (state: any) => state.get('menu').toJS()

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const DropdownListEnhance = compose(
  graphql<Data>(categoriesQuery),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DropdownList)

export default DropdownListEnhance
