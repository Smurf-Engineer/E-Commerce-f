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

    ReactDOM.render(
      <DropdownList
        {...{ sportOptions, genderOptions, data, formatMessage }}
        history={{}}
        dispatch={{}}
        menuGender={{}}
      />,
      div
    )
  })
})

describe('DropdownList Reducer', () => {
  it('Return the default state for unknow action', () => {
    const state = reducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Set the Menu Menu Dropdown visible ', () => {
    const state = reducer(initialState, setMenuGenderSelectedAction(0, true))
    const menuVisible = state.getIn(['genderOptions', 0, 'visible'])
    expect(menuVisible).toEqual(true)
  })

  it('Set the Women Menu Dropdown visible ', () => {
    const state = reducer(initialState, setMenuGenderSelectedAction(1, true))
    const menuVisible = state.getIn(['genderOptions', 1, 'visible'])
    expect(menuVisible).toEqual(true)
  })

  it('Set the Cycling Menu Dropdown visible ', () => {
    const state = reducer(initialState, setMenuSportSelectedAction(0, true))
    const menuVisible = state.getIn(['sportOptions', 0, 'visible'])
    expect(menuVisible).toEqual(true)
  })

  it('Set the Triathlon Menu Dropdown visible ', () => {
    const state = reducer(initialState, setMenuSportSelectedAction(1, true))
    const menuVisible = state.getIn(['sportOptions', 1, 'visible'])
    expect(menuVisible).toEqual(true)
  })

  it('Set the Nordic Menu Dropdown visible ', () => {
    const state = reducer(initialState, setMenuSportSelectedAction(2, true))
    const menuVisible = state.getIn(['sportOptions', 2, 'visible'])
    expect(menuVisible).toEqual(true)
  })

  // TODO: uncomment when nordic sport will be added
  // it('Set the Active Menu Dropdown visible ', () => {
  //   const state = reducer(initialState, setMenuSportSelectedAction(3, true))
  //   const menuVisible = state.getIn(['sportOptions', 3, 'visible'])
  //   expect(menuVisible).toEqual(true)
  // })
})
