/**
 * DropdownList Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Popover from 'antd/lib/popover'
import { connect } from 'react-redux'
import { compose, withApollo } from 'react-apollo'
import Menu from 'antd/lib/menu'
import queryString from 'query-string'
import { getSportsQuery } from './data'
import get from 'lodash/get'
import MenuSports from '../MenuSports'
import { CLEAR_STATE_ACTION as CLEAR_MENU_GENDER } from '../MenuGender/constants'
import { CLEAR_STATE_ACTION as CLEAR_MENU_SPORTS } from '../MenuSports/constants'
import {
  setMenuGenderSelectedAction,
  setMenuSportSelectedAction,
  setGenderSportAction,
  setSportsAction
} from './actions'
import { Filter, NavbarSports } from '../../types/common'
import {
  Option,
  OptionDropdown,
  overStyle,
  menuStyle
} from './styledComponents'
import { openQuickViewAction } from '../../components/MainLayout/actions'

const MEN = 'men'
const WOMEN = 'women'

export interface Option {
  label: string
  visible: boolean
  navbar: boolean
}

interface Props {
  history: any
  dispatch: any
  client: any
  genderSportSelected: number
  sportOptions: Option[]
  genderOptions: Option[]
  menuGender: any
  currentCurrency: string
  sports: Filter[]
  formatMessage: (messageDescriptor: any) => string
}

export class DropdownList extends React.PureComponent<Props> {
  componentDidMount = async () => {
    const {
      client: { query },
      dispatch
    } = this.props
    const response = await query({
      query: getSportsQuery,
      fetchPolicy: 'network-only'
    })
    const sportsData = get(response, 'data.sports', [])
    const sportOptions = sportsData.map((sport: NavbarSports) => ({
      label: sport.name.toLowerCase(),
      visible: false,
      navbar: sport.navbar
    }))
    dispatch(setSportsAction(sportOptions, sportsData))
  }

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

  render() {
    const {
      sportOptions,
      formatMessage,
      currentCurrency,
      history,
      sports
    } = this.props

    const sportMenus =
      sportOptions &&
      sportOptions.map(
        ({ label: name, navbar, visible }, index) =>
          navbar && (
            <Menu.Item key={name}>
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
                    {...{
                      sports,
                      formatMessage,
                      currentCurrency,
                      history,
                      name,
                      visible
                    }}
                    type={index}
                    onPressSeeAll={this.handleOnSeeAll}
                    onPressQuickView={this.handleOnQuickView}
                    onPressCustomize={this.handleOnCustomize}
                    onPressThumbnail={this.handleOnHideSportsMenu}
                  />
                }
              >
                <OptionDropdown>{name}</OptionDropdown>
              </Popover>
            </Menu.Item>
          )
      )
    return (
      <Menu mode="horizontal" selectable={false} style={menuStyle}>
        {sportMenus}
      </Menu>
    )
  }
}

const mapStateToProps = (state: any) => state.get('menu').toJS()

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const DropdownListEnhance = compose(
  withApollo,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DropdownList)

export default DropdownListEnhance
