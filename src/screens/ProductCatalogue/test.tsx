/**
 * ProductCatalog Test - Created by cazarez on 27/02/18.
 */

import productCatalogReducer, { initialState } from './reducer'
import { defaultAction, setSelectedFilters } from './actions'

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

  describe('Test SET_SELECTED_FILTERS action', () => {
    // SEASON FILTERS
    it('Handles undefinde value in Season Filters', () => {
      const springSummerInitialValue = initialState.getIn([
        'seasonFilters',
        'Spring/Summer'
      ])
      expect(springSummerInitialValue).toBeUndefined()

      const fallWinterInitialValue = initialState.getIn([
        'seasonFilters',
        'Fall/Winter'
      ])
      expect(fallWinterInitialValue).toBeUndefined()

      const allSeasonsInitialValue = initialState.getIn([
        'seasonFilters',
        'All Season'
      ])
      expect(allSeasonsInitialValue).toBeUndefined()
    })

    it('Handles true value in Season Filters (Spring/Summer, Fall/Winter, All Season)', () => {
      const seasonFiltersSpringSummer = {
        type: 'seasonFilters',
        name: 'Spring/Summer'
      }

      const springSummerFilterState = productCatalogReducer(
        initialState,
        setSelectedFilters(seasonFiltersSpringSummer)
      )
      const springSummerFilterValue = springSummerFilterState.getIn([
        seasonFiltersSpringSummer.type,
        seasonFiltersSpringSummer.name
      ])
      expect(springSummerFilterValue).toBeTruthy()

      const seasonFiltersFallWinter = {
        type: 'seasonFilters',
        name: 'Fall/Winter'
      }

      const fallWinterFilterState = productCatalogReducer(
        initialState,
        setSelectedFilters(seasonFiltersFallWinter)
      )
      const fallWinterFilterValue = fallWinterFilterState.getIn([
        seasonFiltersFallWinter.type,
        seasonFiltersFallWinter.name
      ])
      expect(fallWinterFilterValue).toBeTruthy()

      const seasonFiltersAllSeason = {
        type: 'seasonFilters',
        name: 'All Season'
      }
      const allSeasonFilterState = productCatalogReducer(
        initialState,
        setSelectedFilters(seasonFiltersAllSeason)
      )
      const allSeasonFilterValue = allSeasonFilterState.getIn([
        seasonFiltersAllSeason.type,
        seasonFiltersAllSeason.name
      ])
      expect(allSeasonFilterValue).toBeTruthy()
    })

    it('Handles false value in Season Filters (Spring/Summer, Fall/Winter, All Season)', () => {
      initialState.setIn(['seasonFilters', 'Spring/Summer'], true)
      const seasonFiltersSpringSummer = {
        type: 'seasonFilters',
        name: 'Spring/Summer'
      }

      const springSummerFilterState = productCatalogReducer(
        initialState,
        setSelectedFilters(seasonFiltersSpringSummer)
      )
      const springSummerFilterValue = springSummerFilterState.getIn([
        seasonFiltersSpringSummer.type,
        seasonFiltersSpringSummer.name
      ])
      expect(!springSummerFilterValue).toBeFalsy()

      initialState.setIn(['seasonFilters', 'Fall/Winter'], true)
      const seasonFiltersFallWinter = {
        type: 'seasonFilters',
        name: 'Fall/Winter'
      }

      const fallWinterFilterState = productCatalogReducer(
        initialState,
        setSelectedFilters(seasonFiltersFallWinter)
      )
      const fallWinterFilterValue = fallWinterFilterState.getIn([
        seasonFiltersFallWinter.type,
        seasonFiltersFallWinter.name
      ])
      expect(!fallWinterFilterValue).toBeFalsy()

      initialState.setIn(['seasonFilters', 'All Season'], true)
      const seasonFiltersAllSeason = {
        type: 'seasonFilters',
        name: 'All Season'
      }
      const allSeasonFilterState = productCatalogReducer(
        initialState,
        setSelectedFilters(seasonFiltersAllSeason)
      )
      const allSeasonFilterValue = allSeasonFilterState.getIn([
        seasonFiltersAllSeason.type,
        seasonFiltersAllSeason.name
      ])
      expect(!allSeasonFilterValue).toBeFalsy()
    })

    // FIT STYLE FILTERS
    it('Handles undefined value in Fit Style Filters', () => {
      const standardFilterInitialValue = initialState.getIn([
        'fit_styleFilters',
        'Standard'
      ])
      expect(standardFilterInitialValue).toBeUndefined()

      const relaxedFilterInitialValue = initialState.getIn([
        'fit_styleFilters',
        'Relaxed'
      ])
      expect(relaxedFilterInitialValue).toBeUndefined()

      const slimFilterInitialValue = initialState.getIn([
        'fit_styleFilters',
        'Slim'
      ])
      expect(slimFilterInitialValue).toBeUndefined()
    })

    it('Handles true value in Fit Style filters (Standard, Relaxed, Slim)', () => {
      const fitStyleFiltersStandard = {
        type: 'fit_styleFilters',
        name: 'Standard'
      }
      const standardFilterState = productCatalogReducer(
        initialState,
        setSelectedFilters(fitStyleFiltersStandard)
      )
      const standardFilterValue = standardFilterState.getIn([
        fitStyleFiltersStandard.type,
        fitStyleFiltersStandard.name
      ])
      expect(standardFilterValue).toBeTruthy()

      const fitStyleFiltersRelaxed = {
        type: 'fit_styleFilters',
        name: 'Relaxed'
      }
      const relaxedFilterState = productCatalogReducer(
        initialState,
        setSelectedFilters(fitStyleFiltersRelaxed)
      )
      const relaxedFilterValue = relaxedFilterState.getIn([
        fitStyleFiltersRelaxed.type,
        fitStyleFiltersRelaxed.name
      ])
      expect(relaxedFilterValue).toBeTruthy()

      const fitStyleFiltersSlim = {
        type: 'fit_styleFilters',
        name: 'Slim'
      }
      const slimFilterState = productCatalogReducer(
        initialState,
        setSelectedFilters(fitStyleFiltersSlim)
      )
      const slimFilterValue = slimFilterState.getIn([
        fitStyleFiltersSlim.type,
        fitStyleFiltersSlim.name
      ])
      expect(slimFilterValue).toBeTruthy()
    })

    it('Handles false value in Fit Style filters (Standard, Relaxed, Slim)', () => {
      initialState.setIn(['fit_styleFilters', 'Standard'], true)
      const fitStyleFiltersStandard = {
        type: 'fit_styleFilters',
        name: 'Standard'
      }
      const standardFilterState = productCatalogReducer(
        initialState,
        setSelectedFilters(fitStyleFiltersStandard)
      )
      const standardFilterValue = standardFilterState.getIn([
        fitStyleFiltersStandard.type,
        fitStyleFiltersStandard.name
      ])
      expect(!standardFilterValue).toBeFalsy()

      initialState.setIn(['fit_styleFilters', 'Relaxed'], true)
      const fitStyleFiltersRelaxed = {
        type: 'fit_styleFilters',
        name: 'Relaxed'
      }
      const relaxedFilterState = productCatalogReducer(
        initialState,
        setSelectedFilters(fitStyleFiltersRelaxed)
      )
      const relaxedFilterValue = relaxedFilterState.getIn([
        fitStyleFiltersRelaxed.type,
        fitStyleFiltersRelaxed.name
      ])
      expect(!relaxedFilterValue).toBeFalsy()

      initialState.setIn(['fit_styleFilters', 'Slim'], true)
      const fitStyleFiltersSlim = {
        type: 'fit_styleFilters',
        name: 'Slim'
      }
      const slimFilterState = productCatalogReducer(
        initialState,
        setSelectedFilters(fitStyleFiltersSlim)
      )
      const slimFilterValue = slimFilterState.getIn([
        fitStyleFiltersSlim.type,
        fitStyleFiltersSlim.name
      ])
      expect(!slimFilterValue).toBeFalsy()
    })
  })
})
