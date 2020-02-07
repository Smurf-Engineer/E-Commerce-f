/**
 * DesignSearch Test - Created by Jesús Apodaca on 07/02/20.
 */

import designSearchAdminReducer, { initialState } from './reducer'
import {
  setLoadingAction,
  setPreflightAction,
  setLoadingPreflight
} from './actions'
import { SET_LOADING, SET_PREFLIGHT, SET_LOADING_PREFLIGHT } from './constants'

describe('Design Search Admin Screen', () => {
  describe('Actions', () => {
    it('setLoadingAction', () => {
      const type = SET_LOADING
      expect(setLoadingAction()).toEqual({
        type
      })
    })
    it('setPreflightAction', () => {
      const type = SET_PREFLIGHT
      const checked = true
      expect(setPreflightAction(checked)).toEqual({
        type,
        checked
      })
    })
    it('setLoadingPreflight', () => {
      const type = SET_LOADING_PREFLIGHT
      const loading = true
      expect(setLoadingPreflight(loading)).toEqual({
        type,
        loading
      })
    })
  })

  describe('Reducer', () => {
    describe('SET_LOADING', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState.get('loading')).toBeDefined()
      })
      it('Should be init with loading', () => {
        const loadingState = designSearchAdminReducer(
          initialState,
          setLoadingAction()
        )
        const customLoadingValue = loadingState.get('loading')
        expect(customLoadingValue).toBeTruthy()
      })
    })
    describe('SET_PREFLIGHT', () => {
      describe('Set preflight check action', () => {
        it('Handles undefined value in order', () => {
          const customInitialValue = initialState.get('order')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in loadingPreflight', () => {
          const customInitialValue = initialState.get('loadingPreflight')
          expect(customInitialValue.size).toBeFalsy()
        })
        it('Handles custom values in order', () => {
          const checked = true
          const designState = designSearchAdminReducer(
            initialState,
            setPreflightAction(checked)
          )
          const customOrderValue = designState.getIn([
            'order',
            'preflightCheck'
          ])
          expect(customOrderValue).toBe(checked)
        })
      })
    })
    describe('SET_LOADING_PREFLIGHT', () => {
      describe('Set preflight loading action', () => {
        it('Handles undefined value in loadingPreflight', () => {
          const customInitialValue = initialState.get('loadingPreflight')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in loadingPreflight', () => {
          const customInitialValue = initialState.get('loadingPreflight')
          expect(customInitialValue.size).toBeFalsy()
        })
        it('Handles custom values in loadingPreflight', () => {
          const loading = true
          const designState = designSearchAdminReducer(
            initialState,
            setLoadingPreflight(loading)
          )
          const customOrderValue = designState.get('loadingPreflight')
          expect(customOrderValue).toBe(loading)
        })
      })
    })
  })
})
