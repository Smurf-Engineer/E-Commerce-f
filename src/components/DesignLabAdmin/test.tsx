/**
 * DesignSearch Test - Created by Jesús Apodaca on 07/02/20.
 */

import designLabAdminReducer, { initialState } from './reducer'
import { setCutoffDaysAction } from './actions'
import { SET_CUTOFF_DAYS } from './constants'

describe('Design Search Admin Screen', () => {
  describe('Actions', () => {
    it('onResetReducer', () => {
      const type = SET_CUTOFF_DAYS
      const value = 1
      expect(setCutoffDaysAction(value)).toEqual({
        type,
        value
      })
    })
  })
  describe('Reducer', () => {
    describe('SET_CUTOFF_DAYS', () => {
      it('Handles undefined value in cutOffDays', () => {
        const customInitialValue = initialState.get('cutOffDays')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles init size in cutOffDays', () => {
        const customInitialValue = initialState.get('cutOffDays')
        expect(customInitialValue).toBe(0)
      })
      it('Handles custom values in cutOffDays', () => {
        const customValue = 1
        const customState = designLabAdminReducer(
          initialState,
          setCutoffDaysAction(customValue)
        )
        const customNameValue = customState.get('cutOffDays')
        expect(customNameValue).toBeGreaterThan(0)
      })
      it('Handles undefined value in cutOffDaysChanges', () => {
        const customInitialValue = initialState.get('cutOffDaysChanges')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles init size in cutOffDaysChanges', () => {
        const customInitialValue = initialState.get('cutOffDaysChanges')
        expect(customInitialValue).toBeFalsy()
      })
      it('Handles custom values in cutOffDays', () => {
        const customValue = 1
        const customState = designLabAdminReducer(
          initialState,
          setCutoffDaysAction(customValue)
        )
        const customNameValue = customState.get('cutOffDaysChanges')
        expect(customNameValue).toBeTruthy()
      })
    })
  })
})
