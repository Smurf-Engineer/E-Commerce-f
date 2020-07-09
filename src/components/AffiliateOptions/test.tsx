/**
 * AffiliatesOrders Test - Created by Jesús Apodaca on 29/11/19.
 */
import affiliatesOptionsReducer, { initialState } from './reducer'

import {
    resetReducerDataAction,
    setUploadingAction,
    successRequestAction,
    openAffiliate,
    onChangePage,
    setModalLoadingAction
} from './actions'
import {
    RESET_REDUCER_DATA,
    SET_LOADING,
    SUCCESS_REQUEST,
    OPEN_AFFILIATE,
    ON_PAGE_CHANGE,
    SET_MODAL_LOADING
} from './constants'

describe(' AffiliatesOrders Screen', () => {
    describe('Actions', () => {
        it('onResetReducer', () => {
            const type = RESET_REDUCER_DATA
            expect(resetReducerDataAction()).toEqual({
                type
            })
        })
        it('setUploadingAction', () => {
            const type = SET_LOADING
            const value = true
            expect(setUploadingAction(value)).toEqual({
                type,
                value
            })
        })
        it('successRequestAction', () => {
            const type = SUCCESS_REQUEST
            expect(successRequestAction()).toEqual({
                type
            })
        })
        it('openAffiliate', () => {
            const type = OPEN_AFFILIATE
            const value = true
            expect(openAffiliate(value)).toEqual({
                type,
                value
            })
        })
        it('setModalLoadingAction', () => {
            const type = SET_MODAL_LOADING
            const loading = true
            expect(setModalLoadingAction(loading)).toEqual({
                type,
                loading
            })
        })
        it('onChangePage', () => {
            const type = ON_PAGE_CHANGE
            const page = 2
            expect(onChangePage(page)).toEqual({
                type,
                page
            })
        })
    })
    describe('Reducer', () => {
        describe('RESET_REDUCER_DATA', () => {
            it('Should not have initial state undefined', () => {
                expect(initialState.get('currentPage')).toBeDefined()
            })
            it('Should be init with currentPage', () => {
                const selectedKeyState = affiliatesOptionsReducer(
                    initialState,
                    resetReducerDataAction()
                )
                expect(selectedKeyState.get('currentPage')).toEqual(1)
            })
        })
        describe('SET_LOADING', () => {
            describe('Set loading action', () => {
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
                    const value = true
                    const currentState = affiliatesOptionsReducer(
                        initialState,
                        setUploadingAction(value)
                    )
                    const customLoadingValue = currentState.get('loading')
                    expect(customLoadingValue).toBe(value)
                })
            })
        })
        describe('SUCCESS_REQUEST', () => {
            describe('Set link action', () => {
                it('Handles undefined value in link', () => {
                    const customInitialValue = initialState.get('link')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in link', () => {
                    const customInitialValue = initialState.get('link')
                    expect(typeof customInitialValue).toBe('boolean')
                })
                it('Handles initial value in link', () => {
                    const customInitialValue = initialState.get('link')
                    expect(customInitialValue).toBeFalsy()
                })
                it('Handles custom value in link', () => {
                    const currentState = affiliatesOptionsReducer(
                        initialState,
                        successRequestAction()
                    )
                    const customOpenModalValue = currentState.get('link')
                    expect(customOpenModalValue).toBeTruthy()
                })
            })
        })
        describe('OPEN_AFFILIATE', () => {
            describe('Set openModalAffiliate action', () => {
                it('Handles undefined value in openModal', () => {
                    const customInitialValue = initialState.get('openModal')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in openModal', () => {
                    const customInitialValue = initialState.get('openModal')
                    expect(typeof customInitialValue).toBe('boolean')
                })
                it('Handles initial value in openModal', () => {
                    const customInitialValue = initialState.get('openModal')
                    expect(customInitialValue).toBeFalsy()
                })
                it('Handles custom value in openModal', () => {
                    const value = true
                    const currentState = affiliatesOptionsReducer(
                        initialState,
                        openAffiliate(value)
                    )
                    const customOpenValue = currentState.get('openModal')
                    expect(customOpenValue).toBe(value)
                })
            })
        })
        describe('SET_MODAL_LOADING', () => {
            describe('Set modalLoading action', () => {
                it('Handles undefined value in modalLoading', () => {
                    const customInitialValue = initialState.get('modalLoading')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in modalLoading', () => {
                    const customInitialValue = initialState.get('modalLoading')
                    expect(typeof customInitialValue).toBe('boolean')
                })
                it('Handles initial value in modalLoading', () => {
                    const customInitialValue = initialState.get('modalLoading')
                    expect(customInitialValue).toBeFalsy()
                })
                it('Handles custom value in modalLoading', () => {
                    const value = true
                    const currentState = affiliatesOptionsReducer(
                        initialState,
                        setModalLoadingAction(value)
                    )
                    const customModalLoadingValue = currentState.get('modalLoading')
                    expect(customModalLoadingValue).toBe(value)
                })
            })
        })
        describe('ON_PAGE_CHANGE', () => {
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
                        onChangePage(value)
                    )
                    const customPageValue = currentState.get('currentPage')
                    expect(customPageValue).toBe(value)
                })
            })
        })
    })
})
