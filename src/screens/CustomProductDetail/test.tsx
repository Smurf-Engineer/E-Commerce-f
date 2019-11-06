/**
 * CustomProductDetail Test - Created by jorge on 03/08/18.
 */
import customProductDetailReducer, { initialState } from './reducer'
import { setLoadingAction } from './actions'
import { SET_LOADING_ACTION } from './constants'

describe(' CustomProductDetail Screen', () => {
  describe('Actions', () => {
    it('setLoadingAction', () => {
      const type = SET_LOADING_ACTION
      const loading = false
      expect(setLoadingAction(loading)).toEqual({
        type,
        loading
      })
    })
    it('setLoadingAction', () => {
      const type = SET_LOADING_ACTION
      const loading = false
      expect(setLoadingAction(loading)).toEqual({
        type,
        loading
      })
    })
  })
  describe('SET_LOADING_ACTION', () => {
    describe('Loading action', () => {
      it('Handles initial value in loading', () => {
        const customInitialValue = initialState.get('loading')
        expect(customInitialValue).not.toBeUndefined()
        expect(typeof customInitialValue).toBe('boolean')
        expect(customInitialValue).toBeTruthy()
      })
      it('Handles custom value in loading', () => {
        const loading = false
        const loadingState = customProductDetailReducer(
          initialState,
          setLoadingAction(loading)
        )
        const customLoadingValue = loadingState.get('loading')
        expect(typeof customLoadingValue).toBe('boolean')
        expect(customLoadingValue).toBeFalsy()
      })
    })
  })
  // TODO: Add the rest of the actions
})
