/**
 * ProductCatalog Test - Created by cazarez on 27/02/18.
 */

import productCatalogReducer, { initialState } from './reducer'
import {
  defaultAction,
  sortBySelected,
  setSkipValue,
  openSidebarMobile,
  resetReducerAction,
  clearFiltersAction,
  setHomeSelectedFilters
} from './actions'

describe(' ProductCatalog Screen', () => {
  // Test redux actions
  it('Return the default state for unknow action', () => {
    let state = productCatalogReducer(initialState, { type: 'unknow' })
    expect(state).toEqual(initialState)
  })

  it('Update someKey correctly', () => {
    const testValue = 'Test value'
    const state = productCatalogReducer(initialState, defaultAction(testValue))
    const someKey = state.get('someKey')
    expect(someKey).toEqual(testValue)

    const testValue2 = 'Test value 2'
    const state2 = productCatalogReducer(
      initialState,
      defaultAction(testValue2)
    )
    const someKey2 = state2.get('someKey')
    expect(someKey2).toEqual(testValue2)
  })

  describe('Test ORDERBY_SELECTED action', () => {
    it('Handles empty string value', () => {
      const orderBy = ''
      const orderByState = productCatalogReducer(
        initialState,
        sortBySelected(orderBy)
      )
      const orderByValue = orderByState.get('orderBy')
      expect(orderByValue).toEqual(orderBy)
    })

    it('Handle Top Seller Value', () => {
      const orderBy = 'topSeller'
      const orderByState = productCatalogReducer(
        initialState,
        sortBySelected(orderBy)
      )
      const orderByValue = orderByState.get('orderBy')
      expect(orderByValue).toEqual(orderBy)
    })

    it('Handle Lowest Price value', () => {
      const orderBy = 'pricelow'
      const orderByState = productCatalogReducer(
        initialState,
        sortBySelected(orderBy)
      )
      const orderByValue = orderByState.get('orderBy')
      expect(orderByValue).toEqual(orderBy)
    })

    it('Handles Highest Price value', () => {
      const orderBy = 'pricehigh'
      const orderByState = productCatalogReducer(
        initialState,
        sortBySelected(orderBy)
      )
      const orderByValue = orderByState.get('orderBy')
      expect(orderByValue).toEqual(orderBy)
    })
  })

  describe('SET_SKIP_VALUE', () => {
    it('Handles initial value for skip', () => {
      const skip = initialState.get('skip')
      expect(skip).toEqual(0)
    })

    it('Handles initial value for currentPage', () => {
      const currentPage = initialState.get('currentPage')
      expect(currentPage).toEqual(1)
    })

    it('Handles update skip value correctly', () => {
      const skipTest = 10
      const pageTest = 2
      const state = productCatalogReducer(
        initialState,
        setSkipValue(skipTest, pageTest)
      )
      const updatedSkip = state.get('skip')
      expect(updatedSkip).toEqual(skipTest)
    })

    it('Handles update currentPage value correctly', () => {
      const skipTest = 10
      const pageTest = 2
      const state = productCatalogReducer(
        initialState,
        setSkipValue(skipTest, pageTest)
      )
      const updatedCurrentPage = state.get('currentPage')
      expect(updatedCurrentPage).toEqual(pageTest)
    })
  })

  describe('OPEN_SIDEBAR_MOBILE', () => {
    it('Should update openSidebar with true value correctly', () => {
      const openSideBarTest = true
      const state = productCatalogReducer(
        initialState,
        openSidebarMobile(openSideBarTest)
      )
      const openSideBarUpdated = state.get('openSidebar')
      expect(openSideBarUpdated).toEqual(openSideBarTest)
    })

    it('Should update openSideBar with false value correctly', () => {
      const openSideBarTest = false
      const state = productCatalogReducer(
        initialState,
        openSidebarMobile(openSideBarTest)
      )
      const openSideBarUpdated = state.get('openSidebar')
      expect(openSideBarUpdated).toBeFalsy()
    })
  })

  describe('RESET_REDUCER_DATA', () => {
    it('Should return inital state', () => {
      const state = productCatalogReducer(initialState, resetReducerAction())
      expect(state).toEqual(initialState)
    })
  })

  describe('CLEAR_FILTERS', () => {
    it('Should reset genderFilters', () => {
      const genderFiltersInitial = initialState.get('genderFilters')
      const state = productCatalogReducer(initialState, clearFiltersAction())
      const genderFilters = state.get('genderFilters')
      expect(genderFilters).toEqual(genderFiltersInitial)
    })

    it('Should reset sportFilters', () => {
      const sportFiltersInitial = initialState.get('sportFilters')
      const state = productCatalogReducer(initialState, clearFiltersAction())
      const sportFilters = state.get('sportFilters')
      expect(sportFilters).toEqual(sportFiltersInitial)
    })

    it('Should reset categoryFilters', () => {
      const collectionFiltersInitial = initialState.get('collectionFilters')
      const state = productCatalogReducer(initialState, clearFiltersAction())
      const collectionFilters = state.get('collectionFilters')
      expect(collectionFilters).toEqual(collectionFiltersInitial)
    })
  })

  describe('SET_SELECTED_HOME_FILTERS', () => {
    it('Should set roadBike filter to true', () => {
      const state = productCatalogReducer(
        initialState,
        setHomeSelectedFilters()
      )
      const roadBike = state.getIn(['sportFilters', 'Road Bike'])
      expect(roadBike).toBeTruthy()
    })

    it('Should set Jersey & Tops filter to true', () => {
      const state = productCatalogReducer(
        initialState,
        setHomeSelectedFilters()
      )
      const jerseyAndTops = state.getIn(['categoryFilters', 'Jerseys & Tops'])
      expect(jerseyAndTops).toBeTruthy()
    })

    it('Should set Inline filter to true', () => {
      const state = productCatalogReducer(
        initialState,
        setHomeSelectedFilters()
      )
      const Inline = state.getIn(['collectionFilters', 'Inline'])
      expect(Inline).toBeTruthy()
    })
  })
})
