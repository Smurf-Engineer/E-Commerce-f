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
import { SET_MENU_GENDER_SELECTED, SET_MENU_SPORT_SELECTED } from './constants'

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
      fetchMore: () => { }
    }

    const formatMessage = () => ''
    const history = createMemoryHistory()
    ReactDOM.render(
      <DropdownList
        {...{ history, sportOptions, genderOptions, data, formatMessage }}
        dispatch={() => { }}
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

  it('setMenuSportSelectedAction', () => {
    const type = SET_MENU_SPORT_SELECTED
    const index = 0
    const visible = true
    expect(setMenuSportSelectedAction(index, visible)).toEqual({
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

  describe('SET_MENU_SPORT_SELECTED', () => { })
})
