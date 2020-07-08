/**
 * AffiliatesOrders Test - Created by Jesús Apodaca on 29/11/19.
 */
import affiliatesOptionsReducer, { initialState } from './reducer'

import {
    resetDataAction,
    setCurrentPageAction,
    setLoading,
    setSearchTextAction,
    changeDateAction,
    setShowAction,
    setSelected,
    setStatus,
    setOrderPoint
} from './actions'
import {
    RESET_DATA,
    SET_CURRENT_PAGE,
    SET_LOADING,
    SET_SEARCH_TEXT,
    SET_DATE,
    SET_SELECTED,
    SET_SHOW,
    SET_STATUS,
    SET_ORDER_POINT,
} from './constants'

describe('AffiliatesAdmin Screen', () => {
    describe('Actions', () => {
        it('onResetReducer', () => {
            const type = RESET_DATA
            expect(resetDataAction()).toEqual({
                type
            })
        })
        it('setCurrentPageAction', () => {
            const type = SET_CURRENT_PAGE
            const page = 2
            expect(setCurrentPageAction(page)).toEqual({
                type,
                page
            })
        })
        it('setLoading', () => {
            const type = SET_LOADING
            const loading = true
            expect(setLoading(loading)).toEqual({
                type,
                loading
            })
        })
        it('setSearchTextAction', () => {
            const type = SET_SEARCH_TEXT
            const searchText = 'Test'
            expect(setSearchTextAction(searchText)).toEqual({
                type,
                searchText
            })
        })
        it('changeDateAction', () => {
            const type = SET_DATE
            const startDate = 'One'
            const endDate = 'Two'
            expect(changeDateAction(startDate, endDate)).toEqual({
                type,
                startDate,
                endDate
            })
        })
        it('setShowAction', () => {
            const type = SET_SHOW
            expect(setShowAction()).toEqual({
                type,
            })
        })
        it('setSelected', () => {
            const type = SET_SELECTED
            const value = {
                'Test': true
            }
            expect(setSelected(value)).toEqual({
                type,
                value
            })
        })
        it('setStatus', () => {
            const type = SET_STATUS
            const value = 'Test'
            expect(setStatus(value)).toEqual({
                type,
                value
            })
        })
        it('setOrderPoint', () => {
            const type = SET_ORDER_POINT
            const value = 'Test'
            expect(setOrderPoint(value)).toEqual({
                type,
                value
            })
        })
    })
    describe('Reducer', () => {
        describe('RESET_DATA', () => {
            it('Should not have initial state undefined', () => {
                expect(initialState.get('currentPage')).toBeDefined()
            })
            it('Should be init with currentPage', () => {
                const selectedKeyState = affiliatesOptionsReducer(
                    initialState,
                    resetDataAction()
                )
                expect(selectedKeyState.get('currentPage')).toEqual(1)
            })
        })
        describe('SET_CURRENT_PAGE', () => {
            describe('Set currentPage action', () => {
                it('Handles undefined value in currentPage', () => {
                    const customInitialValue = initialState.get('currentPage')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in currentPage', () => {
                    const customInitialValue = initialState.get('currentPage')
                    expect(typeof customInitialValue).toBe('number')
                })
                it('Handles initial value in currentPage', () => {
                    const customInitialValue = initialState.get('currentPage')
                    expect(customInitialValue).toBe(1)
                })
                it('Handles custom value in currentPage', () => {
                    const value = 2
                    const currentState = affiliatesOptionsReducer(
                        initialState,
                        setCurrentPageAction(value)
                    )
                    const customPageValue = currentState.get('currentPage')
                    expect(customPageValue).toBe(value)
                })
            })
        })
        describe('SET_LOADING', () => {
            describe('Set setLoading action', () => {
                it('Handles undefined value in loading', () => {
                    const customInitialValue = initialState.get('loading')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in loading', () => {
                    const customInitialValue = initialState.get('loading')
                    expect(typeof customInitialValue).toBe('boolean')
                })
                it('Handles initial value in loading', () => {
                    const customInitialValue = initialState.get('loading')
                    expect(customInitialValue).toBeFalsy()
                })
                it('Handles custom value in loading', () => {
                    const loading = true
                    const currentState = affiliatesOptionsReducer(
                        initialState,
                        setLoading(loading)
                    )
                    const customLoadingValue = currentState.get('loading')
                    expect(customLoadingValue).toBe(loading)
                })
            })
        })
        describe('SET_SEARCH_TEXT', () => {
            describe('Set setSearchTextAction action', () => {
                it('Handles undefined value in searchText', () => {
                    const customInitialValue = initialState.get('searchText')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in searchText', () => {
                    const customInitialValue = initialState.get('searchText')
                    expect(typeof customInitialValue).toBe('string')
                })
                it('Handles initial value in searchText', () => {
                    const customInitialValue = initialState.get('searchText')
                    expect(customInitialValue).toBe('')
                })
                it('Handles custom value in searchText', () => {
                    const searchText = 'Test'
                    const currentState = affiliatesOptionsReducer(
                        initialState,
                        setSearchTextAction(searchText)
                    )
                    const customSearchTextValue = currentState.get('searchText')
                    expect(customSearchTextValue).toBe(searchText)
                })
            })
        })
        describe('SET_DATE', () => {
            describe('Set changeDate action', () => {
                it('Handles undefined value in startDate', () => {
                    const customInitialValue = initialState.get('startDate')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in startDate', () => {
                    const customInitialValue = initialState.get('startDate')
                    expect(typeof customInitialValue).toBe('string')
                })
                it('Handles initial value in startDate', () => {
                    const customInitialValue = initialState.get('startDate')
                    expect(customInitialValue).toBe('')
                })
                it('Handles custom value in searchText', () => {
                    const startDate = 'One'
                    const endDate = 'Two'
                    const currentState = affiliatesOptionsReducer(
                        initialState,
                        changeDateAction(startDate, endDate)
                    )
                    const customDateValue = currentState.get('startDate')
                    expect(customDateValue).toBe(startDate)
                })
            })
        })
        describe('SET_SHOW', () => {
            describe('Set setShow action', () => {
                it('Handles undefined value in searchText', () => {
                    const customInitialValue = initialState.get('searchText')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in searchText', () => {
                    const customInitialValue = initialState.get('searchText')
                    expect(typeof customInitialValue).toBe('string')
                })
                it('Handles initial value in searchText', () => {
                    const customInitialValue = initialState.get('searchText')
                    expect(customInitialValue).toBe('')
                })
                it('Handles custom value in searchText', () => {
                    const currentState = affiliatesOptionsReducer(
                        initialState,
                        setShowAction()
                    )
                    const customSearchText = currentState.get('searchText')
                    expect(customSearchText).toBe('')
                    const customPageValue = currentState.get('currentPage')
                    expect(customPageValue).toBe(1)
                })
            })
        })
        describe('SET_SELECTED', () => {
            describe('Set setSelected action', () => {
                it('Handles undefined value in selected', () => {
                    const customInitialValue = initialState.get('selected')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in selected', () => {
                    const customInitialValue = initialState.get('selected')
                    expect(typeof customInitialValue).toBe('object')
                })
                it('Handles initial value in selected', () => {
                    const customInitialValue = initialState.get('selected')
                    expect(customInitialValue.size).toBe(0)
                })
                it('Handles custom value in selected', () => {
                    const selected = {
                        'Test': true
                    }
                    const currentState = affiliatesOptionsReducer(
                        initialState,
                        setSelected(selected)
                    )
                    const customSelectedValue = currentState.get('selected')
                    expect(customSelectedValue).toBe(selected)
                })
            })
        })
        describe('SET_STATUS', () => {
            describe('Set statusValue action', () => {
                it('Handles undefined value in statusValue', () => {
                    const customInitialValue = initialState.get('statusValue')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in statusValue', () => {
                    const customInitialValue = initialState.get('statusValue')
                    expect(typeof customInitialValue).toBe('string')
                })
                it('Handles initial value in statusValue', () => {
                    const customInitialValue = initialState.get('statusValue')
                    expect(customInitialValue).toBe('')
                })
                it('Handles custom value in statusValue', () => {
                    const statusValue = 'Test'
                    const currentState = affiliatesOptionsReducer(
                        initialState,
                        setStatus(statusValue)
                    )
                    const customStatusValue = currentState.get('statusValue')
                    expect(customStatusValue).toBe(statusValue)
                })
            })
        })
        describe('SET_ORDER_POINT', () => {
            describe('Set orderPoint action', () => {
                it('Handles undefined value in orderValue', () => {
                    const customInitialValue = initialState.get('orderValue')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in orderValue', () => {
                    const customInitialValue = initialState.get('orderValue')
                    expect(typeof customInitialValue).toBe('string')
                })
                it('Handles initial value in orderValue', () => {
                    const customInitialValue = initialState.get('orderValue')
                    expect(customInitialValue).toBe('')
                })
                it('Handles custom value in orderValue', () => {
                    const orderValue = 'Test'
                    const currentState = affiliatesOptionsReducer(
                        initialState,
                        setOrderPoint(orderValue)
                    )
                    const customOrderPointValue = currentState.get('orderValue')
                    expect(customOrderPointValue).toBe(orderValue)
                })
            })
        })
    })
})
