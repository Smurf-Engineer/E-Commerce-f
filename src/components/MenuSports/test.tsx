/**
 * MenuSports Test - Created by david on 13/02/18.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import reducer, { initialState } from './reducer'
import { setCategoryAction, setClearAction } from './actions'
import { Filter } from '../../types/common'
import { MenuSports } from './index'

describe('MenuSports Reducer', () => {
  it('Return the default state for unknow action', () => {
    const state = reducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Return the default state when we clear the state', () => {
    const state = reducer(initialState, setClearAction())
    expect(state).toEqual(initialState)
  })

  it('Update category key', () => {
    const state = reducer(initialState, setCategoryAction(2))
    const categorySelected = state.get('categorySelected')
    expect(state).not.toEqual(initialState)
    expect(categorySelected).toEqual(2)

    const state2 = reducer(initialState, setCategoryAction(2))
    const categorySelected2 = state2.get('categorySelected')
    expect(state2).not.toEqual(initialState)
    expect(categorySelected2).toEqual(2)
  })
})
