/**
 * AffiliatesOrders Test - Created by Jesús Apodaca on 29/11/19.
 */
import affiliatesOrdersReducer, { initialState } from './reducer'

import {
    setCurrentPageAction, resetDataAction, changeDateAction, setShowAction, setStatus, setOrderPoint,
} from './actions'
import {
    SET_CURRENT_PAGE, RESET_DATA, SET_DATE, SET_SHOW, SET_STATUS, SET_ORDER_POINT,
} from './constants'

describe(' AffiliatesOrders Screen', () => {
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
                const selectedKeyState = affiliatesOrdersReducer(
                    initialState,
                    resetDataAction()
                )
                expect(selectedKeyState.get('currentPage')).toEqual(1)
            })
        })
        describe('SET_CURRENT_PAGE', () => {
            describe('Current page', () => {
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
                    const currentPageState = affiliatesOrdersReducer(
                        initialState,
                        setCurrentPageAction(2)
                    )
                    const customPageValue = currentPageState.get('currentPage')
                    expect(customPageValue).toBe(2)
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
                    const currentState = affiliatesOrdersReducer(
                        initialState,
                        changeDateAction(startDate, endDate)
                    )
                    const customDateValue = currentState.get('startDate')
                    expect(customDateValue).toBe(startDate)
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
                    const currentState = affiliatesOrdersReducer(
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
                    const currentState = affiliatesOrdersReducer(
                        initialState,
                        setOrderPoint(orderValue)
                    )
                    const customOrderPointValue = currentState.get('orderValue')
                    expect(customOrderPointValue).toBe(orderValue)
                })
            })
        })
        describe('SET_SHOW', () => {
            describe('Set setShow action', () => {
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
                    const currentState = affiliatesOrdersReducer(
                        initialState,
                        setShowAction()
                    )
                    const customPageValue = currentState.get('currentPage')
                    expect(customPageValue).toBe(1)
                })
            })
        })
    })
})
