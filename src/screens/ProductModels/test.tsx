/**
 * ProductModels Test - Created by Jesús Apodaca on 30/12/19.
 */

import productModelsReducer, { initialState } from './reducer'
import {
  openModalAction,
  setEditModel,
  changeNameAction,
  setUploadingImage,
  setIconAction,
  setFileAction,
  saveInfoAction
} from './actions'
import {
  OPEN_MODAL,
  EDIT_MODEL,
  CHANGE_NAME,
  UPLOADING_IMAGE,
  SET_ICON,
  SET_FILE,
  SAVE_INFO
} from './constants'

describe(' TeamStoresAdmin Screen', () => {
  describe('Actions', () => {
    it('openModalAction', () => {
      const type = OPEN_MODAL
      const open = true
      expect(openModalAction(open)).toEqual({
        type,
        open
      })
    })
    it('setEditModel', () => {
      const type = EDIT_MODEL
      const id = 'Test'
      expect(setEditModel(id)).toEqual({
        type,
        id
      })
    })
    it('changeNameAction', () => {
      const type = CHANGE_NAME
      const name = 'Test'
      expect(changeNameAction(name)).toEqual({
        type,
        name
      })
    })
    it('setUploadingImage', () => {
      const type = UPLOADING_IMAGE
      expect(setUploadingImage()).toEqual({
        type
      })
    })
    it('setIconAction', () => {
      const type = SET_ICON
      const icon = 'Test'
      expect(setIconAction(icon)).toEqual({
        type,
        icon
      })
    })
    it('setFileAction', () => {
      const type = SET_FILE
      const key = 'TestFile'
      const url = 'TestUrl'
      expect(setFileAction(key, url)).toEqual({
        type,
        key,
        url
      })
    })
    it('saveInfoAction', () => {
      const type = SAVE_INFO
      expect(saveInfoAction()).toEqual({
        type
      })
    })
  })

  describe('Reducer', () => {
    describe('INITIAL_STATE', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState).toBeDefined()
      })
      it('Return the default state for unknow action', () => {
        let state = productModelsReducer(initialState, { type: 'unknow' })
        expect(state).toEqual(initialState)
      })
    })
    describe('OPEN_MODAL', () => {
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
        const productModelState = productModelsReducer(
          initialState,
          openModalAction(true)
        )
        const customOpenModalValue = productModelState.get('openModal')
        expect(customOpenModalValue).toBeTruthy()
      })
    })
    describe('EDIT_MODEL', () => {
      it('Set edit model action', () => {
        const id = 'Test'
        let state
        beforeEach(() => {
          state = productModelsReducer(initialState, setEditModel(id))
        })
        it('Handles undefined value in tempModel', () => {
          const customInitialValue = initialState.get('tempModel')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles undefined value in openModal', () => {
          const customInitialValue = initialState.get('openModal')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in openModal', () => {
          const customInitialValue = initialState.get('openModal')
          expect(customInitialValue).toBeFalsy()
        })
        it('Handles undefined value in selected', () => {
          const customInitialValue = initialState.get('selected')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles initial value in selected', () => {
          const customInitialValue = initialState.get('selected')
          expect(customInitialValue).toBe('')
        })
        it('Handles undefined values in modified tempModel', () => {
          const customTempValue = state.get('tempModel')
          expect(customTempValue).not.toBeUndefined()
        })
        it('Handles custom value in openModal', () => {
          const customTempValue = state.get('openModal')
          expect(customTempValue).toBeTruthy()
        })
        it('Handles custom value in selected', () => {
          const customTempValue = state.get('selected')
          expect(customTempValue).toBe(id)
        })
      })
    })
    describe('CHANGE_NAME', () => {
      it('Handles undefined value in tempModel', () => {
        const customInitialValue = initialState.get('tempModel')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in tempModel', () => {
        const customInitialValue = initialState.get('tempModel')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom value in openModal', () => {
        const name = 'Test'
        const productModelState = productModelsReducer(
          initialState,
          changeNameAction(name)
        )
        const customNameValue = productModelState.getIn(['tempModel', 'name'])
        expect(customNameValue).toBe(name)
      })
    })
    describe('UPLOADING_IMAGE', () => {
      it('Handles undefined value in tempModel', () => {
        const customInitialValue = initialState.get('tempModel')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in tempModel', () => {
        const customInitialValue = initialState.get('tempModel')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom value in icon', () => {
        const productModelState = productModelsReducer(
          initialState,
          setUploadingImage()
        )
        const customIconValue = productModelState.getIn(['tempModel', 'icon'])
        expect(customIconValue).toBe('loading')
      })
    })
    describe('SET_ICON', () => {
      it('Handles undefined value in tempModel', () => {
        const customInitialValue = initialState.get('tempModel')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in tempModel', () => {
        const customInitialValue = initialState.get('tempModel')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom value in icon', () => {
        const icon = 'Test'
        const productModelState = productModelsReducer(
          initialState,
          setIconAction(icon)
        )
        const customIconValue = productModelState.getIn(['tempModel', 'icon'])
        expect(customIconValue).toBe(icon)
      })
    })
    describe('SET_FILE', () => {
      it('Handles undefined value in tempModel', () => {
        const customInitialValue = initialState.get('tempModel')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in tempModel', () => {
        const customInitialValue = initialState.get('tempModel')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom value in file key', () => {
        const key = 'TestFile'
        const url = 'TestUrl'
        const productModelState = productModelsReducer(
          initialState,
          setFileAction(key, url)
        )
        const customFileValue = productModelState.getIn(['tempModel', key])
        expect(customFileValue).toBe(url)
      })
    })
    // describe('SAVE_INFO', () => {
    //   it('Handles undefined value in tempModel', () => {
    //     const customInitialValue = initialState.get('tempModel')
    //     expect(customInitialValue).not.toBeUndefined()
    //   })
    //   it('Handles initial value in tempModel', () => {
    //     const customInitialValue = initialState.get('tempModel')
    //     expect(customInitialValue.size).toBe(0)
    //   })
    //   it('Handles custom value in file key', () => {
    //     const id = 'Test'
    //     const editedModelstate = productModelsReducer(
    //       initialState,
    //       setEditModel(id)
    //     )
    //     const productModelState = productModelsReducer(
    //       editedModelstate,
    //       saveInfoAction()
    //     )
    //     const customFileValue = productModelState.getIn(['variants', id])
    //     expect(customFileValue).not.toBeUndefined()
    //   })
    // })
  })
})
