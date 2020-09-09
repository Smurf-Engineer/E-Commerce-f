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
  saveInfoAction,
  setVariantsAction,
  removeModelAction,
  setLoadingAction,
  changeDefault,
  selectModelAction,
  uploadComplete,
} from './actions'
import {
  OPEN_MODAL,
  EDIT_MODEL,
  CHANGE_NAME,
  UPLOADING_IMAGE,
  SET_ICON,
  SET_FILE,
  SAVE_INFO,
  REMOVE_MODEL,
  SET_LOADING,
  SET_VARIANTS,
  CHANGE_DEFAULT,
  CHANGE_MODEL_RENDER,
  UPLOAD_COMPLETE
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
    it('removeModelAction', () => {
      const type = REMOVE_MODEL
      const key = 'Test'
      expect(removeModelAction(key)).toEqual({
        type,
        key
      })
    })
    it('setLoadingAction', () => {
      const type = SET_LOADING
      const loading = true
      expect(setLoadingAction(loading)).toEqual({
        type,
        loading
      })
    })
    it('setVariantsAction', () => {
      const type = SET_VARIANTS
      const variants = {
        Test: {
          icon: 'testIcon'
        }
      }
      const defaultIndex = 'Test'
      expect(setVariantsAction(variants, defaultIndex)).toEqual({
        type,
        variants,
        defaultIndex
      })
    })
    it('changeDefault', () => {
      const type = CHANGE_DEFAULT
      const checked = true
      expect(changeDefault(checked)).toEqual({
        type,
        checked
      })
    })
    it('selectModelAction', () => {
      const type = CHANGE_MODEL_RENDER
      const id = 'Test'
      expect(selectModelAction(id)).toEqual({
        type,
        id
      })
    })
    it('uploadComplete', () => {
      const type = UPLOAD_COMPLETE
      expect(uploadComplete()).toEqual({
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
    describe('SAVE_INFO', () => {
      it('Handles undefined value in tempModel', () => {
        const customInitialValue = initialState.get('tempModel')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in tempModel', () => {
        const customInitialValue = initialState.get('tempModel')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom value in variants list', () => {
        const variants = {
          Test: {
            icon: 'iconTest'
          }
        }
        const id = 'Test'
        const variantsState = productModelsReducer(
          initialState,
          setVariantsAction(variants, 'Test')
        )
        const editedModelstate = productModelsReducer(
          variantsState,
          setEditModel(id)
        )
        const tempModelState = productModelsReducer(
          editedModelstate,
          setUploadingImage()
        )
        const productModelState = productModelsReducer(
          tempModelState,
          saveInfoAction()
        )
        const customVariantsValue = productModelState.getIn(['variants', id])
        expect(customVariantsValue).not.toBeUndefined()
      })
    })
    describe('REMOVE_MODEL', () => {
      it('Handles undefined value in variants', () => {
        const customInitialValue = initialState.get('variants')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in variants', () => {
        const customInitialValue = initialState.get('variants')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom value in variants list', () => {
        const variants = {
          Test: {
            icon: 'iconTest'
          }
        }
        const key = 'Test'
        const variantsState = productModelsReducer(
          initialState,
          setVariantsAction(variants, 'Test')
        )
        const productModelState = productModelsReducer(
          variantsState,
          removeModelAction(key)
        )
        const customVariantsValue = productModelState.get('variants')
        expect(customVariantsValue.size).toBe(0)
      })
    })
    describe('SET_LOADING', () => {
      it('Handles undefined value in loading', () => {
        const customInitialValue = initialState.get('loading')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in loading', () => {
        const customInitialValue = initialState.get('loading')
        expect(customInitialValue).toBeTruthy()
      })
      it('Handles custom value in loading', () => {
        const loading = false
        const productModelState = productModelsReducer(
          initialState,
          setLoadingAction(loading)
        )
        const customLoadingValue = productModelState.get('loading')
        expect(customLoadingValue).toBe(loading)
      })
    })
    describe('SET_LOADING', () => {
      it('Handles undefined value in loading', () => {
        const customInitialValue = initialState.get('loading')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in loading', () => {
        const customInitialValue = initialState.get('loading')
        expect(customInitialValue).toBeTruthy()
      })
      it('Handles custom value in loading', () => {
        const loading = false
        const productModelState = productModelsReducer(
          initialState,
          setLoadingAction(loading)
        )
        const customLoadingValue = productModelState.get('loading')
        expect(customLoadingValue).toBe(loading)
      })
    })
    describe('SET_VARIANTS', () => {
      it('Handles undefined value in variants', () => {
        const customInitialValue = initialState.get('variants')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in variants', () => {
        const customInitialValue = initialState.get('variants')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom value in variants', () => {
        const variants = {
          Test: {
            icon: 'testIcon'
          }
        }
        const defaultIndex = 'Test'
        const productModelState = productModelsReducer(
          initialState,
          setVariantsAction(variants, defaultIndex)
        )
        const customVariantsValue = productModelState.get('variants')
        expect(customVariantsValue.size).toBe(1)

        const customDefaultIndex = productModelState.get('defaultModelIndex')
        expect(customDefaultIndex).toBe(defaultIndex)
      })
    })
    describe('CHANGE_DEFAULT', () => {
      it('Handles undefined value in tempModel', () => {
        const customInitialValue = initialState.get('tempModel')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in tempModel', () => {
        const customInitialValue = initialState.get('tempModel')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom value in tempModel default checked', () => {
        const checked = true
        const productModelState = productModelsReducer(
          initialState,
          changeDefault(checked)
        )
        const customDefaultValue = productModelState.getIn([
          'tempModel',
          'default'
        ])
        expect(customDefaultValue).toBe(checked)
      })
    })
    describe('CHANGE_MODEL_RENDER', () => {
      it('Handles undefined value in modelRender', () => {
        const customInitialValue = initialState.get('modelRender')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in modelRender', () => {
        const customInitialValue = initialState.get('modelRender')
        expect(customInitialValue).toBe('')
      })
      it('Handles custom value in modelRender', () => {
        const id = 'Test'
        const productModelState = productModelsReducer(
          initialState,
          selectModelAction(id)
        )
        const customModelRender = productModelState.get('modelRender')
        expect(customModelRender).toBe(id)
      })
    })
    describe('UPLOAD_COMPLETE', () => {
      it('Handles undefined value in openSuccess', () => {
        const customInitialValue = initialState.get('openSuccess')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial value in openSuccess', () => {
        const customInitialValue = initialState.get('openSuccess')
        expect(customInitialValue).toBeFalsy()
      })
      it('Handles custom value in openSuccess', () => {
        const productModelState = productModelsReducer(
          initialState,
          uploadComplete()
        )
        const customSuccessValue = productModelState.get('openSuccess')
        expect(customSuccessValue).toBeTruthy()
      })
    })
  })
})
