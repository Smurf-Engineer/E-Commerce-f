/**
 * DropdownList Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { compose, withApollo } from 'react-apollo'
import get from 'lodash/get'
import Menu from 'antd/lib/menu'
import Popover from 'antd/lib/popover'
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
import { sportRoutePosition } from './constants'
import { Filter, User } from '../../types/common'
import {
  Option,
  OptionDropdown,
  overStyle,
  StyledDivider,
  StyledMenu
} from './styledComponents'
import { openQuickViewAction } from '../../components/MainLayout/actions'

export interface Option {
  label: string
  menuOpen: boolean
  route: string
}

interface Props {
  history: History
  regionsCodes: string[]
  dispatch: any
  client: any
  genderSportSelected: number
  sportOptions: Option[]
  genderOptions: Option[]
  user: User
  menuGender: any
  currentCurrency: string
  currentLanguage: string
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
    genderSelected: string,
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

    let genderString = `gender=${genderSelected}&`
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
      isChangingGender = gender && gender !== genderString
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

  handleOnHideSportsMenu = (index: number) => (visible: boolean) => {
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
      user,
      sports
    } = this.props

    const pathName = get(history, 'location.pathname', '')
    const sportRoute = pathName && pathName.split('/')
    const sportMenus =
      sportOptions &&
      sportOptions.length > 0 && 
      sportOptions.reduce(
        (prev: any, { label: name, menuOpen, route }, index) => {
          const sportSelected = sportRoute[sportRoutePosition] === route
          const divider = (
            <StyledDivider type="vertical" />
          )
          const menuItem = (
            <Menu.Item key={name}>
              <Popover
                overlayStyle={overStyle}
                overlayClassName="innerClass"
                trigger="hover"
                placement="bottom"
                visible={menuOpen}
                mouseEnterDelay={0.3}
                onVisibleChange={this.handleOnHideSportsMenu(index)}
                content={
                  <MenuSports
                    {...{
                      sports,
                      formatMessage,
                      currentCurrency,
                      history,
                      name,
                      user
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
                  bold={name === 'team stores'}
                >
                  {name}
                </OptionDropdown>
              </Popover>
            </Menu.Item>
          )
          return name !== 'team stores' ? prev.concat(menuItem) : prev.concat(divider, menuItem)
        }, 
        []
      )
    return (
      <StyledMenu mode="horizontal" selectable={false}>
        {sportMenus}
      </StyledMenu>
    )
  }

  handleRedirect = ({
    currentTarget: { id }
  }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const {
      currentRegion,
      currentCurrency,
      currentLanguage,
      regionsCodes
    } = this.props

    const region = regionsCodes.includes(currentRegion) ? currentRegion : 'us'

    const path = `/${id}/${region}?lang=${currentLanguage ||
      'en'}&currency=${currentCurrency}`
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
