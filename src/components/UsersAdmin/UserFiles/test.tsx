/**
 * UserFiles Test - Created by eduardoquintero on 22/01/20.
 */

import userFilesReducer, { initialState } from './reducer'
import { setUploadingAction } from './actions'
import { SET_UPLOADING } from './constants'

describe(' ProductCatalog Screen', () => {
  describe('Actions', () => {
    it('setUploadingAction', () => {
      const type = SET_UPLOADING
      const uploading = true
      expect(setUploadingAction(uploading)).toEqual({
        type,
        uploading
      })
    })
  })

  describe('Reducer', () => {
    describe('SET_UPLOADING_ACTION', () => {
      describe('Update uploading action', () => {
        it('Handles undefined value in uploading', () => {
          const customInitialValue = initialState.get('uploading')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in uploading', () => {
          const customInitialValue = initialState.get('uploading')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles custom values in uploading', () => {
          const customValue = true
          const userFilesState = userFilesReducer(
            initialState,
            setUploadingAction(customValue)
          )
          const customLoadingValue = userFilesState.get('uploading')
          expect(customLoadingValue).toBeTruthy()
        })
      })
    })
  })
})
