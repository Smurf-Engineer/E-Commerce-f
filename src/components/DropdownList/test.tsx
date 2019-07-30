/**
 * DropdownList Test - Created by david on 07/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Filter } from '../../types/common'
import { Option } from './index'
import reducer, { initialState } from './reducer'
import {
  setMenuGenderSelectedAction,
  setMenuSportSelectedAction
} from './actions'
import { DropdownList } from './index'
import { createMemoryHistory } from 'history'
import { SET_MENU_GENDER_SELECTED } from './constants'

describe('<DropdownList />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div')
    const genders: Filter[] = []
    const sports: Filter[] = []
    const categories: Filter[] = []
    const sportOptions: Option[] = []
    const genderOptions: Option[] = []

    const data = {
      genders,
      sports,
      categories,
      fetchMore: () => {}
    }

    const formatMessage = () => ''
    const history = createMemoryHistory()
    ReactDOM.render(
      <DropdownList
        {...{ history, sportOptions, genderOptions, data, formatMessage }}
        dispatch={{}}
        menuGender={{}}
        genderSportSelected={0}
        regionsCodes={[]}
        client={{}}
        currentCurrency={''}
        currentLanguage={''}
        currentRegion={''}
        sports={[]}
      />,
      div
    )
  })
})

describe('Actions', () => {
  it('setMenuGenderSelectedAction', () => {
    const type = SET_MENU_GENDER_SELECTED
    const index = 0
    const visible = true
    expect(setMenuGenderSelectedAction(index, visible)).toEqual({
      type,
      index,
      visible
    })
  })
})

describe('Reducer', () => {
  describe('INITIAL STATE', () => {
    it('Return the default state for unknow action', () => {
      const state = reducer(initialState, { type: 'unknow' })
      expect(state).toEqual(initialState)
    })
  })

  describe('SET_MENU_GENDER_SELECTED', () => {
    it('Set the Menu Menu Dropdown visible ', () => {
      const indextTest = 0
      const visibleTest = true
      const state = reducer(
        initialState,
        setMenuGenderSelectedAction(indextTest, visibleTest)
      )
      const menuVisible = state.getIn(['genderOptions', 0, 'visible'])
      console.log(menuVisible)
      expect(menuVisible).toBeTruthy()
    })

    it('Set the Women Menu Dropdown visible ', () => {
      const state = reducer(initialState, setMenuGenderSelectedAction(1, true))
      const menuVisible = state.getIn(['genderOptions', 1, 'visible'])
      expect(menuVisible).toBeTruthy()
    })

    it('Set the Cycling Menu Dropdown visible ', () => {
      const state = reducer(initialState, setMenuSportSelectedAction(0, true))
      const menuVisible = state.getIn(['sportOptions', 0, 'visible'])
      expect(menuVisible).toBeTruthy()
    })

    it('Set the Triathlon Menu Dropdown visible ', () => {
      const state = reducer(initialState, setMenuSportSelectedAction(1, true))
      const menuVisible = state.getIn(['sportOptions', 1, 'visible'])
      expect(menuVisible).toBeTruthy()
    })

    it('Set the Nordic Menu Dropdown visible ', () => {
      const state = reducer(initialState, setMenuSportSelectedAction(2, true))
      const menuVisible = state.getIn(['sportOptions', 2, 'visible'])
      expect(menuVisible).toBeTruthy()
    })
  })

  // TODO: uncomment when nordic sport will be added
  // it('Set the Active Menu Dropdown visible ', () => {
  //   const state = reducer(initialState, setMenuSportSelectedAction(3, true))
  //   const menuVisible = state.getIn(['sportOptions', 3, 'visible'])
  //   expect(menuVisible).toEqual(true)
  // })
})
