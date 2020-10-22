/**
 * CustomProductDetail Test - Created by jorge on 03/08/18.
 */
import customProductDetailReducer, { initialState } from './reducer'
import {
  setLoadingAction,
  setSelectedGenderAction,
  setSelectedSizeAction,
  setSelectedFitAction,
  openFitInfoAction,
  setShowDetailsAction,
  setShowSpecsAction,
  setFitsModal,
  setSelectedTopSizeAction,
  setSelectedBottomSizeAction
} from './actions'
import {
  SET_LOADING_ACTION,
  SET_SELECTED_GENDER,
  SET_SELECTED_SIZE,
  SET_SELECTED_FIT,
  OPEN_FITINFO,
  SET_SHOW_DETAILS,
  SET_SHOW_SPECS,
  SET_FITS_MODAL,
  SET_TOP_SELECTED_SIZE,
  SET_BOTTOM_SELECTED_SIZE
} from './constants'

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
    it('setSelectedGenderAction', () => {
      const type = SET_SELECTED_GENDER
      const selected = { id: 1, name: 'Name' }
      expect(setSelectedGenderAction(selected)).toEqual({
        type,
        selected
      })
    })
    it('setSelectedSizeAction', () => {
      const type = SET_SELECTED_SIZE
      const selected = { id: 1, name: 'Name' }
      expect(setSelectedSizeAction(selected)).toEqual({
        type,
        selected
      })
    })
    it('setSelectedFitAction', () => {
      const type = SET_SELECTED_FIT
      const selected = { id: 1, name: 'Name' }
      expect(setSelectedFitAction(selected)).toEqual({
        type,
        selected
      })
    })
    it('openFitInfoAction', () => {
      const type = OPEN_FITINFO
      const open = true
      expect(openFitInfoAction(open)).toEqual({
        type,
        open
      })
    })
    it('setShowDetailsAction', () => {
      const type = SET_SHOW_DETAILS
      const show = true
      expect(setShowDetailsAction(show)).toEqual({
        type,
        show
      })
    })
    it('setShowSpecsAction', () => {
      const type = SET_SHOW_SPECS
      const show = true
      expect(setShowSpecsAction(show)).toEqual({
        type,
        show
      })
    })
    it('setFitsModal', () => {
      const type = SET_FITS_MODAL
      const showFits = true
      expect(setFitsModal(showFits)).toEqual({
        type,
        showFits
      })
    })
    it('setSelectedTopSizeAction', () => {
      const type = SET_TOP_SELECTED_SIZE
      const selected = { id: 1, name: 'Name' }
      expect(setSelectedTopSizeAction(selected)).toEqual({
        type,
        selected
      })
    })
    it('setSelectedBottomSizeAction', () => {
      const type = SET_BOTTOM_SELECTED_SIZE
      const selected = { id: 1, name: 'Name' }
      expect(setSelectedBottomSizeAction(selected)).toEqual({
        type,
        selected
      })
    })
  })
  describe('INITIAL_STATE', () => {
    it('Should not have initial state undefined', () => {
      expect(initialState).toBeDefined()
    })
    it('Return the default state for unknow action', () => {
      let state = customProductDetailReducer(initialState, { type: 'unknow' })
      expect(state).toEqual(initialState)
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
  describe('SET_SELECTED_GENDER', () => {
    describe('setSelectedGender action', () => {
      it('Handles initial value in selectedGender', () => {
        const customInitialValue = initialState.get('selectedGender')
        expect(customInitialValue).not.toBeUndefined()
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom value in selectedGender', () => {
        const selectedGender = {
          id: 1,
          name: 'Name'
        }
        const genderState = customProductDetailReducer(
          initialState,
          setSelectedGenderAction(selectedGender)
        )

        const customSelectedGender = genderState.get('selectedGender')
        expect(customSelectedGender).not.toBeUndefined()
        expect(customSelectedGender).toBe(selectedGender)
      })
    })
  })
  describe('SET_SELECTED_SIZE', () => {
    describe('setSelectedSizeAction action', () => {
      it('Handles initial value in selectedSize', () => {
        const customInitialValue = initialState.get('selectedSize')
        expect(customInitialValue).not.toBeUndefined()
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom value in selectedSize', () => {
        const selectedSize = {
          id: 1,
          name: 'Name'
        }
        const state = customProductDetailReducer(
          initialState,
          setSelectedSizeAction(selectedSize)
        )

        const customSelectedSize = state.get('selectedSize')
        expect(customSelectedSize).not.toBeUndefined()
        expect(customSelectedSize).toBe(selectedSize)
      })
    })
  })
  describe('SET_SELECTED_FIT', () => {
    describe('setSelectedFitAction action', () => {
      it('Handles initial value in selectedFit', () => {
        const customInitialValue = initialState.get('selectedFit')
        expect(customInitialValue).not.toBeUndefined()
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom value in selectedFit', () => {
        const selectedFit = {
          id: 1,
          name: 'Name'
        }
        const state = customProductDetailReducer(
          initialState,
          setSelectedFitAction(selectedFit)
        )

        const customSelectedFit = state.get('selectedFit')
        expect(customSelectedFit).not.toBeUndefined()
        expect(customSelectedFit).toBe(selectedFit)
      })
    })
  })
  describe('OPEN_FITINFO', () => {
    describe('openFitInfoAction action', () => {
      it('Handles initial value in openFitInfo', () => {
        const customInitialValue = initialState.get('openFitInfo')
        expect(customInitialValue).not.toBeUndefined()
        expect(customInitialValue.size).toBeFalsy()
      })
      it('Handles custom value in openFitInfo', () => {
        const open = true
        const state = customProductDetailReducer(
          initialState,
          openFitInfoAction(open)
        )

        const openFitInfo = state.get('openFitInfo')
        expect(openFitInfo).toBe(open)
      })
    })
  })
  describe('SET_SHOW_DETAILS', () => {
    describe('setShowDetailsAction action', () => {
      it('Handles initial value in showDetails', () => {
        const customInitialValue = initialState.get('showDetails')
        expect(customInitialValue).not.toBeUndefined()
        expect(customInitialValue.size).toBeFalsy()
      })
      it('Handles custom value in showDetails', () => {
        const show = true
        const state = customProductDetailReducer(
          initialState,
          setShowDetailsAction(show)
        )

        const showDetails = state.get('showDetails')
        expect(showDetails).toBe(show)
      })
    })
  })
  describe('SET_SHOW_SPECS', () => {
    describe('setShowSpecsAction action', () => {
      it('Handles initial value in showSpecs', () => {
        const customInitialValue = initialState.get('showSpecs')
        expect(customInitialValue).not.toBeUndefined()
        expect(customInitialValue.size).toBeFalsy()
      })
      it('Handles custom value in showSpecs', () => {
        const show = true
        const state = customProductDetailReducer(
          initialState,
          setShowSpecsAction(show)
        )

        const showSpecs = state.get('showSpecs')
        expect(showSpecs).toBe(show)
      })
    })
  })
  describe('SET_FITS_MODAL', () => {
    describe('setFitsModal action', () => {
      it('Handles initial value in showFitsModal', () => {
        const customInitialValue = initialState.get('showFitsModal')
        expect(customInitialValue).not.toBeUndefined()
        expect(customInitialValue.size).toBeFalsy()
      })
      it('Handles custom value in showFitsModal', () => {
        const showFits = true
        const state = customProductDetailReducer(
          initialState,
          setFitsModal(showFits)
        )

        const showFitsModal = state.get('showFitsModal')
        expect(showFitsModal).toBe(showFits)
      })
    })
  })
  describe('SET_TOP_SELECTED_SIZE', () => {
    describe('setSelectedTopSizeAction action', () => {
      it('Handles initial value in selectedTopSize', () => {
        const customInitialValue = initialState.get('selectedTopSize')
        expect(customInitialValue).not.toBeUndefined()
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom value in selectedTopSize', () => {
        const selectedSize = {
          id: 1,
          name: 'Name'
        }
        const state = customProductDetailReducer(
          initialState,
          setSelectedTopSizeAction(selectedSize)
        )

        const customSelectedSize = state.get('selectedTopSize')
        expect(customSelectedSize).not.toBeUndefined()
        expect(customSelectedSize).toBe(selectedSize)
      })
    })
  })
  describe('SET_BOTTOM_SELECTED_SIZE', () => {
    describe('setSelectedBottomSizeAction action', () => {
      it('Handles initial value in selectedTopSize', () => {
        const customInitialValue = initialState.get('selectedBottomSize')
        expect(customInitialValue).not.toBeUndefined()
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom value in selectedBottomSize', () => {
        const selectedSize = {
          id: 1,
          name: 'Name'
        }
        const state = customProductDetailReducer(
          initialState,
          setSelectedBottomSizeAction(selectedSize)
        )

        const customSelectedSize = state.get('selectedBottomSize')
        expect(customSelectedSize).not.toBeUndefined()
        expect(customSelectedSize).toBe(selectedSize)
      })
    })
  })
})
