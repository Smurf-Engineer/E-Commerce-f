/**
 * ProDesign Test - Created by eduardoquintero on 30/09/19.
 */

import proDesignReducer, { initialState } from './reducer'
import {
  onTabClickAction,
  setSearchProductAction,
  setProductCodeAction,
  setUploadingAction,
  uploadFileSuccessAction,
  goToColorSectionAction,
  setStitchingColorAction,
  setColorAction,
  setSelectedUserAction,
  setInputValueAction,
  setSaveModalOpenAction,
  setSavingDesignAction,
  setUserToSearchAction
} from './actions'
import {
  ON_TAB_CLICK,
  UPLOAD,
  COLOR,
  SET_SEARCH_PRODUCT,
  SET_PRODUCT_CODE,
  UPLOAD_FILE_ACTION_SUCCESS,
  SET_UPLOADING_FILE_ACTION,
  GO_TO_COLOR_SECTION,
  SET_STITCHING_COLOR_ACTION,
  SET_COLOR_ACTION,
  SET_SELECTED_USER,
  SET_INPUT_VALUE,
  OPEN_MODAL,
  SET_SAVING_DESIGN
} from './constants'

describe(' ProductCatalog Screen', () => {
  describe('Actions', () => {
    it('onTabClickAction', () => {
      const type = ON_TAB_CLICK
      const selectedKey = 'color'

      expect(onTabClickAction(selectedKey)).toEqual({
        type,
        selectedKey
      })
    })
    it('setSearchProductAction', () => {
      const type = SET_SEARCH_PRODUCT
      const products = [{ name: 'Name', code: '4040' }]

      expect(setSearchProductAction(products)).toEqual({
        type,
        products
      })
    })
    it('setProductCodeAction', () => {
      const type = SET_PRODUCT_CODE
      const productCode = '005'

      expect(setProductCodeAction(productCode)).toEqual({
        type,
        productCode
      })
    })
    it('uploadFileSuccessAction', () => {
      const type = UPLOAD_FILE_ACTION_SUCCESS
      const url = { fileUrl: 'image.png' }
      const fileName = 'image'

      expect(uploadFileSuccessAction(url, fileName)).toEqual({
        type,
        url,
        fileName
      })
    })
    it('setUploadingAction', () => {
      const type = SET_UPLOADING_FILE_ACTION
      const isUploading = true

      expect(setUploadingAction(isUploading)).toEqual({
        type,
        isUploading
      })
    })
    it('goToColorSectionAction', () => {
      const type = GO_TO_COLOR_SECTION
      const index = 1

      expect(goToColorSectionAction(index)).toEqual({
        type,
        index
      })
    })
    it('setStitchingColorAction', () => {
      const type = SET_STITCHING_COLOR_ACTION
      const stitchingColor = { name: 'FSC-10', value: '#000' }

      expect(setStitchingColorAction(stitchingColor)).toEqual({
        type,
        stitchingColor
      })
    })
    it('setColorAction', () => {
      const type = SET_COLOR_ACTION
      const color = 'black'
      const id = 'zipperColor'

      expect(setColorAction(color, id)).toEqual({
        type,
        color,
        id
      })
    })
    it('setSelectedUserAction', () => {
      const type = SET_SELECTED_USER
      const email = 'john@tailrecursive.co'

      expect(setSelectedUserAction(email)).toEqual({
        type,
        email
      })
    })
    it('setInputValueAction', () => {
      const type = SET_INPUT_VALUE
      const id = 'designName'
      const value = 'my design'

      expect(setInputValueAction(id, value)).toEqual({
        type,
        id,
        value
      })
    })
    it('setSaveModalOpenAction', () => {
      const type = OPEN_MODAL

      expect(setSaveModalOpenAction()).toEqual({
        type
      })
    })
    it('setSavingDesignAction', () => {
      const type = SET_SAVING_DESIGN
      const saving = true
      expect(setSavingDesignAction(saving)).toEqual({
        type,
        saving
      })
    })
  })

  describe('Reducer', () => {
    describe('ON_TAB_CLICK', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState.get('selectedKey')).toBeDefined()
      })
      it('Should be init with UPLOAD tab key', () => {
        expect(initialState.get('selectedKey')).toEqual(UPLOAD)
      })
      it('Should be init with UPLOAD tab key', () => {
        const selectedKeyState = proDesignReducer(
          initialState,
          onTabClickAction(COLOR)
        )
        expect(selectedKeyState.get('selectedKey')).toEqual(COLOR)
      })
    })
    describe('SET_SEARCH_PRODUCT', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState.get('productSearchResults')).toBeDefined()
      })
      it('productSearchResults shouldn´t have length on init', () => {
        expect(initialState.get('productSearchResults').size).toEqual(0)
      })
      it('Handles custom values in productSearchResults', () => {
        const searchResults = [{ name: 'Name', code: '4040' }]
        const selectedKeyState = proDesignReducer(
          initialState,
          setSearchProductAction(searchResults)
        )
        expect(selectedKeyState.get('productSearchResults').size).toEqual(1)
      })
    })
    describe('SET_PRODUCT_CODE', () => {
      it('Should have empty value on init', () => {
        expect(initialState.get('productCode')).not.toBeUndefined()
      })
      it('Handles value type in productCode', () => {
        const customInitialValue = initialState.get('productCode')
        expect(typeof customInitialValue).toBe('string')
      })
      it('Handles custom value type in productCode', () => {
        const customValue = '005'
        const customValueState = proDesignReducer(
          initialState,
          setProductCodeAction(customValue)
        )
        expect(customValueState.get('productCode')).toEqual(customValue)
      })
    })
    describe('SET_UPLOADING_FILE_ACTION', () => {
      it('Should have empty value on init', () => {
        expect(initialState.get('uploadingFile')).not.toBeUndefined()
      })
      it('Should be false on init', () => {
        expect(initialState.get('uploadingFile')).toBeFalsy()
      })
      it('Handles value type in uploadingFile', () => {
        const customInitialValue = initialState.get('uploadingFile')
        expect(typeof customInitialValue).toBe('boolean')
      })
      it('Handles custom value type in uploadingFile', () => {
        const customValue = true
        const customValueState = proDesignReducer(
          initialState,
          setUploadingAction(customValue)
        )
        expect(customValueState.get('uploadingFile')).toBeTruthy()
      })
    })
    describe('UPLOAD_FILE_ACTION_SUCCESS', () => {
      it('Should have empty value on init', () => {
        expect(initialState.get('fileName')).not.toBeUndefined()
      })
      it('Handles value type in fileName', () => {
        const customInitialValue = initialState.get('fileName')
        expect(typeof customInitialValue).toBe('string')
      })
      it('actualImage should have empty value on init', () => {
        expect(initialState.get('actualImage')).not.toBeUndefined()
      })
      it('Handles value type in actualImage', () => {
        const customInitialValue = initialState.get('actualImage')
        expect(typeof customInitialValue).toBe('string')
      })
      it('Handles custom value type in fileName & actualImage', () => {
        const url = { fileUrl: 'image.png' }
        const fileName = 'image'
        const customValueState = proDesignReducer(
          initialState,
          uploadFileSuccessAction(url, fileName)
        )
        expect(customValueState.get('fileName')).toEqual(fileName)
        expect(customValueState.get('actualImage')).toEqual(url.fileUrl)
      })
    })
    describe('GO_TO_COLOR_SECTION', () => {
      it('Should have empty value on init', () => {
        expect(initialState.get('colorSectionIndex')).not.toBeUndefined()
      })
      it('Should be 0 on init', () => {
        expect(initialState.get('colorSectionIndex')).toEqual(0)
      })
      it('Handles value type in colorSectionIndex', () => {
        const customInitialValue = initialState.get('colorSectionIndex')
        expect(typeof customInitialValue).toBe('number')
      })
      it('Handles custom value type in colorSectionIndex', () => {
        const customValue = 1
        const customValueState = proDesignReducer(
          initialState,
          goToColorSectionAction(customValue)
        )
        expect(customValueState.get('colorSectionIndex')).toEqual(customValue)
      })
    })
    describe('SET_STITCHING_COLOR_ACTION', () => {
      it('stitching Should have empty value on init', () => {
        expect(
          initialState.getIn(['colorAccessories', 'stitching'])
        ).not.toBeUndefined()
      })
      it('stitching Should be string', () => {
        expect(
          typeof initialState.getIn(['colorAccessories', 'stitching'])
        ).toBe('string')
      })
      it('stitchingName Should have empty value on init', () => {
        expect(
          initialState.getIn(['colorAccessories', 'stitchingName'])
        ).not.toBeUndefined()
      })
      it('stitchingName Should be string', () => {
        expect(
          typeof initialState.getIn(['colorAccessories', 'stitchingName'])
        ).toBe('string')
      })
      it('Handles custom value type in stitching & stitchingName', () => {
        const stitching = { name: 'FSC-10', value: '#000' }
        const customValueState = proDesignReducer(
          initialState,
          setStitchingColorAction(stitching)
        )
        expect(
          customValueState.getIn(['colorAccessories', 'stitching'])
        ).toEqual(stitching.value)
        expect(
          customValueState.getIn(['colorAccessories', 'stitchingName'])
        ).toEqual(stitching.name)
      })
    })
    describe('SET_COLOR_ACTION', () => {
      it('zipperColor Should be a string', () => {
        expect(
          typeof initialState.getIn(['colorAccessories', 'zipperColor'])
        ).toBe('string')
      })
      it('bibColor Should be a string', () => {
        expect(
          typeof initialState.getIn(['colorAccessories', 'bibColor'])
        ).toBe('string')
      })
      it('bindingColor Should be a string', () => {
        expect(
          typeof initialState.getIn(['colorAccessories', 'bindingColor'])
        ).toBe('string')
      })
      it('Handles custom value type in zipperColor', () => {
        const color = 'black'
        const id = 'zipperColor'
        const customValueState = proDesignReducer(
          initialState,
          setColorAction(color, id)
        )
        expect(customValueState.getIn(['colorAccessories', id])).toEqual(color)
      })
      it('Handles custom value type in bindingColor', () => {
        const color = 'black'
        const id = 'bindingColor'
        const customValueState = proDesignReducer(
          initialState,
          setColorAction(color, id)
        )
        expect(customValueState.getIn(['colorAccessories', id])).toEqual(color)
      })
      it('Handles custom value type in bibColor', () => {
        const color = 'black'
        const id = 'bibColor'
        const customValueState = proDesignReducer(
          initialState,
          setColorAction(color, id)
        )
        expect(customValueState.getIn(['colorAccessories', id])).toEqual(color)
      })
      describe('SET_SELECTED_USER', () => {
        it('Should not have initial state undefined', () => {
          expect(initialState.get('selectedUser')).not.toBeUndefined()
        })
        it('email should be tring', () => {
          expect(typeof initialState.get('selectedUser')).toBe('string')
        })
        it('Handles custom values in users', () => {
          const email = 'john@tailrecursive.co'
          const selectedUserState = proDesignReducer(
            initialState,
            setSelectedUserAction(email)
          )
          expect(selectedUserState.get('selectedUser')).toBe(email)
        })
      })
      describe('SET_INPUT_VALUE', () => {
        it('designName Should not have initial state undefined', () => {
          expect(initialState.get('designName')).not.toBeUndefined()
        })
        it('designName should be tring', () => {
          expect(typeof initialState.get('designName')).toBe('string')
        })
        it('Handles custom values in designName', () => {
          const id = 'designName'
          const designName = 'my design'
          const designNameState = proDesignReducer(
            initialState,
            setInputValueAction(id, designName)
          )
          expect(designNameState.get(id)).toBe(designName)
        })
        it('legacyNumber Should not have initial state undefined', () => {
          expect(initialState.get('legacyNumber')).not.toBeUndefined()
        })
        it('legacyNumber should be tring', () => {
          expect(typeof initialState.get('legacyNumber')).toBe('string')
        })
        it('Handles custom values in legacyNumber', () => {
          const id = 'legacyNumber'
          const legacyNumber = '123-DESIGN'
          const legacyNumberState = proDesignReducer(
            initialState,
            setInputValueAction(id, legacyNumber)
          )
          expect(legacyNumberState.get(id)).toBe(legacyNumber)
        })
      })
      describe('OPEN_MODAL', () => {
        it('Should have empty value on init', () => {
          expect(initialState.get('saveModalOpen')).not.toBeUndefined()
        })
        it('Should be false on init', () => {
          expect(initialState.get('saveModalOpen')).toBeFalsy()
        })
        it('Handles value type in saveModalOpen', () => {
          const customInitialValue = initialState.get('saveModalOpen')
          expect(typeof customInitialValue).toBe('boolean')
        })
        it('Handles custom value type in saveModalOpen', () => {
          const customValueState = proDesignReducer(
            initialState,
            setSaveModalOpenAction()
          )
          expect(customValueState.get('saveModalOpen')).toBeTruthy()
        })
      })
      describe('SET_SAVING_DESIGN', () => {
        it('Should have empty value on init', () => {
          expect(initialState.get('savingDesign')).not.toBeUndefined()
        })
        it('Should be false on init', () => {
          expect(initialState.get('savingDesign')).toBeFalsy()
        })
        it('Handles value type in savingDesign', () => {
          const customInitialValue = initialState.get('savingDesign')
          expect(typeof customInitialValue).toBe('boolean')
        })
        it('Handles custom value type in savingDesign', () => {
          const customValueState = proDesignReducer(
            initialState,
            setSavingDesignAction(true)
          )
          expect(customValueState.get('savingDesign')).toBeTruthy()
        })
      })
      describe('SET_USER_TO_SEARCH', () => {
        it('Should not have initial state undefined', () => {
          expect(initialState.get('userToSearch')).not.toBeUndefined()
        })
        it('userToSearch should be tring', () => {
          expect(typeof initialState.get('userToSearch')).toBe('string')
        })
        it('Handles custom values in users', () => {
          const user = 'john'
          const selectedUserState = proDesignReducer(
            initialState,
            setUserToSearchAction(user)
          )
          expect(selectedUserState.get('userToSearch')).toBe(user)
        })
      })
    })
  })
})
