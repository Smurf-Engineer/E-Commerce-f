/**
 * DropdownList Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Popover from 'antd/lib/popover'
import { connect } from 'react-redux'
import { compose, withApollo } from 'react-apollo'
import get from 'lodash/get'
import Menu from 'antd/lib/menu'
import queryString from 'query-string'
import { History } from 'history'
import MenuSports from '../MenuSports'
import * as thunkActions from './thunkActions'
import { CLEAR_STATE_ACTION as CLEAR_MENU_GENDER } from '../MenuGender/constants'
import { CLEAR_STATE_ACTION as CLEAR_MENU_SPORTS } from '../MenuSports/constants'
import {
  setMenuGenderSelectedAction,
  setMenuSportSelectedAction,
  setGenderSportAction
} from './actions'
import { Filter } from '../../types/common'
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
  menuOpen: boolean
  route: string
}

interface Props {
  history: History
  dispatch: any
  client: any
  genderSportSelected: number
  sportOptions: Option[]
  genderOptions: Option[]
  menuGender: any
  currentCurrency: string
  sports: Filter[]
  currentRegion: string
  formatMessage: (messageDescriptor: any) => string
}

export class DropdownList extends React.PureComponent<Props> {
  componentDidMount = async () => {
    const { client, dispatch } = this.props
    const { getSportsMenu } = thunkActions
    await dispatch(getSportsMenu(client))
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

    const pathName = get(history, 'location.pathname', '')
    const sportRoute = pathName && pathName.split('/')
    const sportMenus =
      sportOptions &&
      sportOptions.map(({ label: name, menuOpen, route }, index) => {
        const sportSelected = sportRoute[1] === route
        return (
          <Menu.Item key={name}>
            <Popover
              overlayStyle={overStyle}
              trigger="hover"
              placement="bottom"
              visible={menuOpen}
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
                    name
                  }}
                  visible={menuOpen}
                  type={index}
                  onPressSeeAll={this.handleOnSeeAll}
                  onPressQuickView={this.handleOnQuickView}
                  onPressCustomize={this.handleOnCustomize}
                  onPressThumbnail={this.handleOnHideSportsMenu}
                />
              }
            >
              <OptionDropdown
                selected={sportSelected}
                id={route}
                onClick={this.handleRedirect}
              >
                {name}
              </OptionDropdown>
            </Popover>
          </Menu.Item>
        )
      })
    return (
      <Menu mode="horizontal" selectable={false} style={menuStyle}>
        {sportMenus}
      </Menu>
    )
  }

  handleRedirect = ({
    currentTarget: { id }
  }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { history, currentRegion } = this.props
    const {
      location: { search }
    } = history
    const path = `/${id}/${currentRegion}${search}`
    window.location.replace(path)
  }
}

const mapStateToProps = (state: any) => {
  const menu = state.get('menu').toJS()
  const region = state.get('languageProvider').toJS()
  return {
    ...menu,
    ...region
  }
}

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const DropdownListEnhance = compose(
  withApollo,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DropdownList)

export default DropdownListEnhance
