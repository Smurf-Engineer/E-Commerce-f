/**
 * ProductCatalogAdmin Test - Created by Jesús Apodaca on 05/08/20.
 */
import affiliatesOptionsReducer, { initialState } from './reducer'

import {
    resetDataAction,
    setCurrentPageAction,
    setSearchTextAction,
    setOrderByAction,
} from './actions'
import {
    RESET_DATA,
    SET_CURRENT_PAGE,
    SET_SEARCH_TEXT,
    SET_ORDER_BY,
} from './constants'

describe('ProductCatalogAdmin Screen', () => {
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
        it('setSearchTextAction', () => {
            const type = SET_SEARCH_TEXT
            const searchText = 'Test'
            expect(setSearchTextAction(searchText)).toEqual({
                type,
                searchText
            })
        })
        it('setOrderByAction', () => {
            const type = SET_ORDER_BY
            const orderBy = 'Test'
            const sort = 'asc'
            expect(setOrderByAction(orderBy, sort)).toEqual({
                type,
                orderBy,
                sort
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
        describe('SET_ORDER_BY', () => {
            describe('Set setOrderByAction action', () => {
                it('Handles undefined value in searchText', () => {
                    const customInitialValue = initialState.get('orderBy')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in orderBy', () => {
                    const customInitialValue = initialState.get('orderBy')
                    expect(typeof customInitialValue).toBe('string')
                })
                it('Handles initial value in orderBy', () => {
                    const customInitialValue = initialState.get('orderBy')
                    expect(customInitialValue).toBe('id')
                })
                it('Handles custom value in orderBy', () => {
                    const orderBy = 'Test'
                    const sort = 'asc'
                    const currentState = affiliatesOptionsReducer(
                        initialState,
                        setOrderByAction(orderBy, sort)
                    )
                    const customOrderValue = currentState.get('orderBy')
                    expect(customOrderValue).toBe(orderBy)
                })
            })
        })
    })
})
