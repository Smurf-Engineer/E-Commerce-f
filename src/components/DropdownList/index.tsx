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

const MEN = 'men'
const WOMEN = 'women'

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

  handleOnSeeAll = (
    type: number,
    categorySelected: string,
    sportSelected: string
  ) => {
    const {
      history: {
        push,
        location: { search, pathname }
      }
    } = this.props

    const { gender, category, sport } = queryString.parse(search)

    let genderString = ''
    if (type > 0) {
      genderString = `gender=${WOMEN}&`
    }
    if (type === 0) {
      genderString = `gender=${MEN}&`
    }

    const toGender = type ? WOMEN : MEN
    const toCategory = categorySelected.replace(' & ', ' ')
    const toSport = sportSelected && (sportSelected as string).toLowerCase()

    const route = `/product-catalogue?${genderString}category=${toCategory}&sport=${toSport}`
    const atProductCatalogue = (pathname as String).includes(
      'product-catalogue'
    )

    let isChangingGender = false
    let isChangingCategory = false
    let isChangingSport = false

    if (atProductCatalogue) {
      isChangingGender = gender && gender !== toGender
      isChangingCategory = category && category !== toCategory
      isChangingSport = sport && sport !== toSport
    }
    const isMissingFilter = !gender || !category || !sport
    const isChangingFilter =
      isChangingGender || isChangingCategory || isChangingSport

    if ((atProductCatalogue && isMissingFilter) || isChangingFilter) {
      window.location.replace(route)
      return
    }

    push(route)
  }

  handleOnCustomize = (id: string) => {
    const { history } = this.props
    history.push(`/design-center?id=${id}`)
  }

  handleOnQuickView = (id: number, yotpoId: string, gender: number) => {
    const { dispatch } = this.props
    dispatch(openQuickViewAction(id, yotpoId, gender))
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

  onHideGenderMenu = (visible: boolean, index: number) =>
    this.handleOnHideGenderMenu(visible, index)

  onHideSportsMenu = (visible: boolean, index: number) =>
    this.handleOnHideSportsMenu(visible, index)

  render() {
    const {
      data,
      genderOptions,
      sportOptions,
      formatMessage,
      genderSportSelected,
      currentCurrency,
      history
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
              {...{
                genders,
                sports,
                visible,
                formatMessage,
                currentCurrency,
                history
              }}
              type={index}
              onPressSeeAll={this.handleOnSeeAll}
              onPressQuickView={this.handleOnQuickView}
              onPressCustomize={this.handleOnCustomize}
              onPressThumbnail={this.handleOnHideGenderMenu}
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
              {...{ sports, visible, formatMessage, currentCurrency, history }}
              type={index}
              name={label}
              onPressSeeAll={this.handleOnSeeAll}
              onPressQuickView={this.handleOnQuickView}
              onPressCustomize={this.handleOnCustomize}
              onPressThumbnail={this.handleOnHideSportsMenu}
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
