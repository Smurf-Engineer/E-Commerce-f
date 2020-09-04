/**
 * AffiliatesOrders Test - Created by Jesús Apodaca on 29/11/19.
 */
import affiliatesAboutReducer, { initialState } from './reducer'

import {
    setPaypalCurrency,
    resetReducerDataAction,
    setPaypalCheck,
    setUploadingAction,
    successRequestAction,
    setFileAction,
    openAffiliate
} from './actions'
import {
    SET_PAYPAL_CURRENCY,
    RESET_REDUCER_DATA,
    SET_PAYPAL_CHECK,
    SET_LOADING,
    SUCCESS_REQUEST,
    SET_FILE,
    OPEN_AFFILIATE
} from './constants'

describe(' AffiliatesOrders Screen', () => {
    describe('Actions', () => {
        it('onResetReducer', () => {
            const type = RESET_REDUCER_DATA
            expect(resetReducerDataAction()).toEqual({
                type
            })
        })
        it('setPaypalCurrency', () => {
            const type = SET_PAYPAL_CURRENCY
            const value = 'cad'
            expect(setPaypalCurrency(value)).toEqual({
                type,
                value
            })
        })
        it('setPaypalCheck', () => {
            const type = SET_PAYPAL_CHECK
            const value = true
            expect(setPaypalCheck(value)).toEqual({
                type,
                value
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
        it('setFileAction', () => {
            const type = SET_FILE
            const value = 'File'
            expect(setFileAction(value)).toEqual({
                type,
                value
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
    })
    describe('Reducer', () => {
        describe('RESET_REDUCER_DATA', () => {
            it('Should not have initial state undefined', () => {
                expect(initialState.get('file')).toBeDefined()
            })
            it('Should be init with file', () => {
                const selectedKeyState = affiliatesAboutReducer(
                    initialState,
                    resetReducerDataAction()
                )
                expect(selectedKeyState.get('file')).toEqual('')
            })
        })
        describe('SET_PAYPAL_CURRENCY', () => {
            describe('Set paypalCurrency action', () => {
                it('Handles undefined value in paypalCurrency', () => {
                    const customInitialValue = initialState.get('paypalCurrency')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in paypalCurrency', () => {
                    const customInitialValue = initialState.get('paypalCurrency')
                    expect(typeof customInitialValue).toBe('string')
                })
                it('Handles initial value in paypalCurrency', () => {
                    const customInitialValue = initialState.get('paypalCurrency')
                    expect(customInitialValue).toBe('usd')
                })
                it('Handles custom value in paypalCurrency', () => {
                    const value = 'cad'
                    const currentState = affiliatesAboutReducer(
                        initialState,
                        setPaypalCurrency(value)
                    )
                    const customCurrencyValue = currentState.get('paypalCurrency')
                    expect(customCurrencyValue).toBe(value)
                })
            })
        })
        describe('SET_PAYPAL_CHECK', () => {
            describe('Set paypalCheck action', () => {
                it('Handles undefined value in paypalCheck', () => {
                    const customInitialValue = initialState.get('paypalCheck')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in paypalCheck', () => {
                    const customInitialValue = initialState.get('paypalCheck')
                    expect(typeof customInitialValue).toBe('boolean')
                })
                it('Handles initial value in paypalCheck', () => {
                    const customInitialValue = initialState.get('paypalCheck')
                    expect(customInitialValue).toBeFalsy()
                })
                it('Handles custom value in paypalCheck', () => {
                    const value = true
                    const currentState = affiliatesAboutReducer(
                        initialState,
                        setPaypalCheck(value)
                    )
                    const customCheckValue = currentState.get('paypalCheck')
                    expect(customCheckValue).toBe(value)
                })
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
                    const currentState = affiliatesAboutReducer(
                        initialState,
                        setUploadingAction(value)
                    )
                    const customLoadingValue = currentState.get('loading')
                    expect(customLoadingValue).toBe(value)
                })
            })
        })
        describe('SUCCESS_REQUEST', () => {
            describe('Set openModal action', () => {
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
                    const currentState = affiliatesAboutReducer(
                        initialState,
                        successRequestAction()
                    )
                    const customOpenModalValue = currentState.get('openModal')
                    expect(customOpenModalValue).toBeFalsy()
                })
            })
        })
        describe('SET_FILE', () => {
            describe('Set file action', () => {
                it('Handles undefined value in file', () => {
                    const customInitialValue = initialState.get('file')
                    expect(customInitialValue).not.toBeUndefined()
                })
                it('Handles value type in file', () => {
                    const customInitialValue = initialState.get('file')
                    expect(typeof customInitialValue).toBe('string')
                })
                it('Handles initial value in file', () => {
                    const customInitialValue = initialState.get('file')
                    expect(customInitialValue).toBe('')
                })
                it('Handles custom value in file', () => {
                    const value = 'File'
                    const currentState = affiliatesAboutReducer(
                        initialState,
                        setFileAction(value)
                    )
                    const customFileValue = currentState.get('file')
                    expect(customFileValue).toBe(value)
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
                    const currentState = affiliatesAboutReducer(
                        initialState,
                        openAffiliate(value)
                    )
                    const customOpenValue = currentState.get('openModal')
                    expect(customOpenValue).toBe(value)
                })
            })
        })
    })
})
