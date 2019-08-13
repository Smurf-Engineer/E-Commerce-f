/**
 * TeamStoresAdmin Test - Created by eduardoquintero on 12/08/19.
 */

import teamStoresAdminReducer, { initialState } from './reducer'
import {
  setOrderByAction,
  setCurrentPageAction,
  setSearchTextAction,
  setLoadingAction,
  setTeamStoreDataAction,
  setPriceAction,
  setLoadingItemAction
} from './actions'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  SET_SEARCH_TEXT,
  SET_LOADING,
  SET_TEAM_STORE_DATA,
  SET_PRICE_ITEM,
  SET_LOADING_ITEM
} from './constants'

describe(' TeamStoresAdmin Screen', () => {
  describe('Actions', () => {
    it('setOrderByAction', () => {
      const type = SET_ORDER_BY
      const orderBy = 'id'
      const sort = 'asc'
      expect(setOrderByAction(orderBy, sort)).toEqual({
        type,
        orderBy,
        sort
      })
    })
    it('setCurrentPageAction', () => {
      const type = SET_CURRENT_PAGE
      const page = 2
      expect(setCurrentPageAction(page)).toEqual({
        type,
        page
      })
    })
    it('setSearchTextAction', () => {
      const type = SET_SEARCH_TEXT
      const searchText = 'SEARCH TEXT'
      expect(setSearchTextAction(searchText)).toEqual({
        type,
        searchText
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
    it('setTeamStoreDataAction', () => {
      const type = SET_TEAM_STORE_DATA
      const teamStore = {
        id: 1,
        name: 'NAME',
        private: false,
        featured: true,
        items: []
      }
      const currencies = [{ name: 'USD' }]
      expect(setTeamStoreDataAction({ teamStore, currencies })).toEqual({
        type,
        teamStore,
        currencies
      })
    })
    it('setPriceAction', () => {
      const type = SET_PRICE_ITEM
      const value = 10
      const currency = 'USD'
      const itemIndex = 0

      expect(setPriceAction(value, currency, itemIndex)).toEqual({
        type,
        value,
        currency,
        itemIndex
      })
    })
    it('setLoadingItemAction', () => {
      const type = SET_LOADING_ITEM
      const itemIndex = '0'
      const loading = true

      expect(setLoadingItemAction(itemIndex, loading)).toEqual({
        type,
        itemIndex,
        loading
      })
    })
  })

  describe('Reducer', () => {
    describe('INITIAL_STATE', () => {
      it('Should not have initial state undefined', () => {
        expect(initialState).toBeDefined()
      })
      it('Return the default state for unknow action', () => {
        let state = teamStoresAdminReducer(initialState, { type: 'unknow' })
        expect(state).toEqual(initialState)
      })
    })
    describe('SET_ORDER_BY', () => {
      describe('Order Table By', () => {
        it('Handles undefined value in orderBy', () => {
          const customInitialValue = initialState.get('orderBy')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type orderBy', () => {
          const customInitialValue = initialState.get('orderBy')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles initial value in orderBy', () => {
          const customInitialValue = initialState.get('orderBy')
          expect(customInitialValue).toBe('id')
        })
        it('Handles values in orderBy and sort', () => {
          const orderByState = teamStoresAdminReducer(
            initialState,
            setOrderByAction('id', 'desc')
          )

          const customSortValue = orderByState.get('sort')
          expect(customSortValue).toBe('desc')

          const customOrderByValue = orderByState.get('orderBy')
          expect(customOrderByValue).toBe('id')
        })
      })
      describe('Sort property', () => {
        it('Handles undefined value in sort', () => {
          const customInitialValue = initialState.get('sort')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in sort', () => {
          const customInitialValue = initialState.get('sort')
          expect(typeof customInitialValue).toBe('string')
        })
        it('Handles initial value in sort', () => {
          const customInitialValue = initialState.get('sort')
          expect(customInitialValue).toBe('desc')
        })
      })
    })
    describe('SET_CURRENT_PAGE', () => {
      describe('Current page', () => {
        it('Handles undefined value in currentPage', () => {
          const customInitialValue = initialState.get('currentPage')
          expect(customInitialValue).not.toBeUndefined()
        })
        it('Handles value type in currentPage', () => {
          const customInitialValue = initialState.get('currentPage')
          expect(typeof customInitialValue).toBe('number')
        })
        it('Handles initial value in currentPage', () => {
          const customInitialValue = initialState.get('currentPage')
          expect(customInitialValue).toBe(1)
        })
        it('Handles custom value in currentPage', () => {
          const currentPageState = teamStoresAdminReducer(
            initialState,
            setCurrentPageAction(2)
          )
          const customPageValue = currentPageState.get('currentPage')
          expect(customPageValue).toBe(2)
        })
      })
    })
  })
  describe('SET_SEARCH_TEXT', () => {
    describe('Search text', () => {
      it('Handles undefined value in currentPage', () => {
        const customInitialValue = initialState.get('searchText')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles value type in searchText', () => {
        const customInitialValue = initialState.get('searchText')
        expect(typeof customInitialValue).toBe('string')
      })
      it('Handles initial value in searchText', () => {
        const customInitialValue = initialState.get('searchText')
        expect(customInitialValue).toBe('')
      })
      it('Handles custom value in searchText', () => {
        const searchTextState = teamStoresAdminReducer(
          initialState,
          setSearchTextAction('VALUE')
        )
        const customSearchValue = searchTextState.get('searchText')
        expect(customSearchValue).toBe('VALUE')
      })
    })
  })
  describe('SET_LOADING', () => {
    describe('Loading', () => {
      it('Handles undefined value in loading', () => {
        const customInitialValue = initialState.get('loading')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles value type in loading', () => {
        const customInitialValue = initialState.get('loading')
        expect(typeof customInitialValue).toBe('boolean')
      })
      it('Handles initial value in loading', () => {
        const customInitialValue = initialState.get('loading')
        expect(customInitialValue).toBeTruthy()
      })
      it('Handles custom value in loading', () => {
        const loadingState = teamStoresAdminReducer(
          initialState,
          setLoadingAction(false)
        )
        const customLoadingValue = loadingState.get('loading')
        expect(customLoadingValue).toBeFalsy()
      })
    })
  })
  describe('SET_TEAM_STORE_DATA', () => {
    describe('Team store data', () => {
      it('Handles undefined value in teamStore', () => {
        const customInitialValue = initialState.get('teamStore')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles value type in teamStore', () => {
        const customInitialValue = initialState.get('teamStore')
        expect(typeof customInitialValue).toBe('object')
      })
      it('Handles custom values in teamStore', () => {
        const teamStoreState = teamStoresAdminReducer(
          initialState,
          setTeamStoreDataAction({
            teamStore: {
              id: 1,
              name: 'NAME',
              private: false,
              featured: true,
              items: []
            },
            currencies: []
          })
        )

        const customTeamStore = teamStoreState.get('teamStore')
        expect(customTeamStore).not.toBeUndefined()

        const customPrivateValue = teamStoreState.getIn([
          'teamStore',
          'private'
        ])
        expect(customPrivateValue).toBeFalsy()

        const customFeaturedValue = teamStoreState.getIn([
          'teamStore',
          'featured'
        ])
        expect(customFeaturedValue).toBeTruthy()
      })
    })
    describe('Currencies data', () => {
      it('Handles undefined value in currencies', () => {
        const customInitialValue = initialState.get('currencies')
        expect(customInitialValue).not.toBeUndefined()
      })
      it('Handles initial length in currencies', () => {
        const customInitialValue = initialState.get('currencies')
        expect(customInitialValue.size).toBe(0)
      })
      it('Handles custom values in currencies', () => {
        const currenciesState = teamStoresAdminReducer(
          initialState,
          setTeamStoreDataAction({
            teamStore: {},
            currencies: [
              {
                id: 1,
                shortName: 'USD'
              }
            ]
          })
        )
        const customCurrencyValue = currenciesState.get('currencies')
        expect(customCurrencyValue.size).toBeGreaterThan(0)

        const customShortNameValue = currenciesState.getIn([
          'currencies',
          0,
          'shortName'
        ])
        expect(customShortNameValue).toBe('USD')
      })
    })
  })
  describe('SET_PRICE_ITEM', () => {
    describe('Team store prices', () => {
      it('Handles undefined value in prices', () => {
        const customInitialValue = initialState.getIn([
          'teamStore',
          'items',
          0,
          'pricesByCurrency'
        ])
        expect(customInitialValue).toBeUndefined()
      })
      it('Handles custom value in prices', () => {
        const teamStoreState = teamStoresAdminReducer(
          initialState,
          setTeamStoreDataAction({
            teamStore: {
              id: 1,
              name: 'NAME',
              private: false,
              featured: true,
              items: [
                {
                  pricesByCurrency: { USD: 0 }
                }
              ]
            },
            currencies: []
          })
        )
        const pricesState = teamStoresAdminReducer(
          teamStoreState,
          setPriceAction(10, 'USD', 0)
        )
        const teamStoreItems = pricesState.getIn(['teamStore', 'items']).toJS()
        const customPriceValue = teamStoreItems[0].pricesByCurrency.USD
        expect(customPriceValue).toBe(10)
      })
    })
  })
  describe('SET_LOADING_ITEM', () => {
    describe('Loading state for team store items', () => {
      it('Handles undefined value in loading item', () => {
        const customInitialValue = initialState.getIn([
          'teamStore',
          'items',
          0,
          'loading'
        ])
        expect(customInitialValue).toBeUndefined()
      })
      it('Handles custom value in loading item', () => {
        const teamStoreState = teamStoresAdminReducer(
          initialState,
          setTeamStoreDataAction({
            teamStore: {
              id: 1,
              name: 'NAME',
              private: false,
              featured: true,
              items: [
                {
                  pricesByCurrency: { USD: 0 }
                }
              ]
            },
            currencies: []
          })
        )
        const itemState = teamStoresAdminReducer(
          teamStoreState,
          setLoadingItemAction('0', true)
        )

        const teamStoreItems = itemState.getIn(['teamStore', 'items']).toJS()
        const loadingValue = teamStoreItems[0].loading
        expect(loadingValue).toBeTruthy()
      })
    })
  })
})
