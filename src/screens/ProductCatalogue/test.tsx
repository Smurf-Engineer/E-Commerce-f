/**
 * ProductCatalog Test - Created by cazarez on 27/02/18.
 */

import productCatalogReducer, { initialState } from './reducer'
import { setSelectedFilters } from './actions'
import { SET_SELECTED_FILTERS } from './constants'

describe(' ProductCatalog Screen', () => {
  describe('Actions', () => {
    it('setSelectedFilters', () => {
      // function from the actios.ts file.
      const type = SET_SELECTED_FILTERS
      const collectionFiltersCustom = {
        type: 'TYPE',
        name: 'NAME'
      }

      expect(setSelectedFilters(collectionFiltersCustom)).toEqual({
        type,
        filter: collectionFiltersCustom
      })
    })
  })

  describe('Reducer', () => {
    // Test redux actions
    describe('INITIAL_STATE', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState).toBeDefined()
      })
      it('Return the default state for unknow action', () => {
        let state = productCatalogReducer(initialState, { type: 'unknow' })
        expect(state).toEqual(initialState)
      })
    })
    describe('SET_SELECTED_FILTERS', () => {
      it('Handle undefined initial value in collectionFilters', () => {
        const customInitialValue = initialState.getIn([
          'collectionFilters',
          'Custom'
        ])
        expect(customInitialValue).toBeUndefined()

        const inlineInitialValue = initialState.getIn([
          'collectionFilters',
          'Inline'
        ])
        expect(inlineInitialValue).toBeUndefined()
      })

      it('Handles true value in Custom and Inline filters', () => {
        const collectionFiltersCustom = {
          type: 'collectionFilters',
          name: 'Custom'
        }
        const customFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(collectionFiltersCustom)
        )
        const customFilterValue = customFilterState.getIn([
          collectionFiltersCustom.type,
          collectionFiltersCustom.name
        ])
        expect(customFilterValue).toBeTruthy()

        const collectionFiltersInline = {
          type: 'collectionFilters',
          name: 'Inline'
        }
        const inlineFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(collectionFiltersInline)
        )
        const inlineFilterValue = inlineFilterState.getIn([
          collectionFiltersInline.type,
          collectionFiltersInline.name
        ])
        expect(inlineFilterValue).toBeTruthy()
      })

      it('Handles false value in Custom and Inline filters', () => {
        initialState.setIn(['collectionFilters', 'Inline'], true)
        const collectionFiltersCustom = {
          type: 'collectionFilters',
          name: 'Custom'
        }
        const customFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(collectionFiltersCustom)
        )
        const customFilterValue = customFilterState.getIn([
          collectionFiltersCustom.type,
          collectionFiltersCustom.name
        ])
        expect(!customFilterValue).toBeFalsy()

        initialState.setIn(['collectionFilters', 'Inline'], true)
        const collectionFiltersInline = {
          type: 'collectionFilters',
          name: 'Inline'
        }
        const inlineFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(collectionFiltersInline)
        )
        const inlineFilterValue = inlineFilterState.getIn([
          collectionFiltersInline.type,
          collectionFiltersInline.name
        ])
        expect(!inlineFilterValue).toBeFalsy()
      })

      it('Handles undefined initial value in gender filters', () => {
        const menFilterInitialValue = initialState.getIn([
          'genderFilters',
          'Men'
        ])
        expect(menFilterInitialValue).toBeUndefined()

        const womenFilterInitialValue = initialState.getIn([
          'genderFilters',
          'Women'
        ])
        expect(womenFilterInitialValue).toBeUndefined()

        const unisexFilterInitialValue = initialState.getIn([
          'genderFilters',
          'Unisex'
        ])
        expect(unisexFilterInitialValue).toBeUndefined()
      })

      it('Handles true value in gender filters (Men, Women, Unisex)', () => {
        const genderFiltersMen = {
          type: 'genderFilters',
          name: 'Men'
        }
        const menFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(genderFiltersMen)
        )
        const menFilterValue = menFilterState.getIn([
          genderFiltersMen.type,
          genderFiltersMen.name
        ])
        expect(menFilterValue).toBeTruthy()

        const genderFiltersWomen = {
          type: 'genderFilters',
          name: 'Women'
        }
        const womenFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(genderFiltersWomen)
        )
        const womenFilterValue = womenFilterState.getIn([
          genderFiltersWomen.type,
          genderFiltersWomen.name
        ])
        expect(womenFilterValue).toBeTruthy()

        const genderFiltersUnisex = {
          type: 'genderFilters',
          name: 'Unisex'
        }
        const unisexFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(genderFiltersUnisex)
        )
        const unisexFilterValue = unisexFilterState.getIn([
          genderFiltersUnisex.type,
          genderFiltersUnisex.name
        ])
        expect(unisexFilterValue).toBeTruthy()
      })

      it('Handles false value in gender filters (Men, Women, Unisex)', () => {
        initialState.setIn(['genderFilters', 'Men'], true)
        const genderFiltersMen = {
          type: 'genderFilters',
          name: 'Men'
        }
        const menFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(genderFiltersMen)
        )
        const menFilterValue = menFilterState.getIn([
          genderFiltersMen.type,
          genderFiltersMen.name
        ])
        expect(!menFilterValue).toBeFalsy()

        initialState.setIn(['genderFilters', 'Women'], true)
        const genderFiltersWomen = {
          type: 'genderFilters',
          name: 'Women'
        }
        const womenFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(genderFiltersWomen)
        )
        const womenFilterValue = womenFilterState.getIn([
          genderFiltersWomen.type,
          genderFiltersWomen.name
        ])
        expect(!womenFilterValue).toBeFalsy()

        initialState.setIn(['genderFilters', 'Unisex'], true)
        const genderFiltersUnisex = {
          type: 'genderFilters',
          name: 'Unisex'
        }
        const unisexFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(genderFiltersUnisex)
        )
        const unisexFilterValue = unisexFilterState.getIn([
          genderFiltersUnisex.type,
          genderFiltersUnisex.name
        ])
        expect(!unisexFilterValue).toBeFalsy()
      })
    })
  })
})
