/**
 * AffiliatesOrders Test - Created by Jesús Apodaca on 29/11/19.
 */
import affiliatesOrdersReducer, { initialState } from './reducer'

import {
    setCurrentPageAction, resetDataAction,
} from './actions'
import {
    SET_CURRENT_PAGE, RESET_DATA,
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
    })
})
