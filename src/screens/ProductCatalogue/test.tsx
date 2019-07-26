/**
 * ProductCatalog Test - Created by cazarez on 27/02/18.
 */

import productCatalogReducer, { initialState } from './reducer'
import { setSelectedFilters } from './actions'
import { SET_SELECTED_FILTERS } from './constants'

describe(' ProductCatalog Screen', () => {
  describe('Actions', () => {
    it('setSelectedFilters', () => {
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

      // SPORTS FILTERS
      it('Handles undefined value in sports filter', () => {
        const sportFilterInitialValue = initialState.getIn([
          'sportFilters',
          'Triathlon'
        ])
        expect(sportFilterInitialValue).toBeUndefined()

        const activeFilterInitialValue = initialState.getIn([
          'sportFilters',
          'Active'
        ])
        expect(activeFilterInitialValue).toBeUndefined()

        const mountainBikeFilterInitialValue = initialState.getIn([
          'sportFilters',
          'Mountain Bike'
        ])
        expect(mountainBikeFilterInitialValue).toBeUndefined()

        const roadBikeFilterInitialValue = initialState.getIn([
          'sportFilters',
          'Road Bike'
        ])
        expect(roadBikeFilterInitialValue).toBeUndefined()
      })

      it('Handles true value in sport filters (Triathlon, Active, Mountain Bike, Road Bike)', () => {
        const sportFiltersTriathlon = {
          type: 'sportFilters',
          name: 'Triathlon'
        }
        const triathlonFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(sportFiltersTriathlon)
        )
        const triathlonFilterValue = triathlonFilterState.getIn([
          sportFiltersTriathlon.type,
          sportFiltersTriathlon.name
        ])
        expect(triathlonFilterValue).toBeTruthy()

        const sportFiltersActive = {
          type: 'sportFilters',
          name: 'Active'
        }

        const activeFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(sportFiltersActive)
        )
        const activeFilterValue = activeFilterState.getIn([
          sportFiltersActive.type,
          sportFiltersActive.name
        ])
        expect(activeFilterValue).toBeTruthy()

        const sportFilterMountainBike = {
          type: 'sportFilters',
          name: 'Mountain Bike'
        }
        const mountainBikeFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(sportFilterMountainBike)
        )
        const mountainBikeFilterValue = mountainBikeFilterState.getIn([
          sportFilterMountainBike.type,
          sportFilterMountainBike.name
        ])
        expect(mountainBikeFilterValue).toBeTruthy()

        const sportFilterRoadBike = {
          type: 'sportFilters',
          name: 'Road Bike'
        }
        const roadBikeFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(sportFilterRoadBike)
        )
        const roadBikeFilterValue = roadBikeFilterState.getIn([
          sportFilterRoadBike.type,
          sportFilterRoadBike.name
        ])
        expect(roadBikeFilterValue).toBeTruthy()
      })

      it('Handles false value for sport filters (Triarhlon, Active, Mountain Bike, Road Bike)', () => {
        initialState.setIn(['sportFilters', 'Triathlon'], false)
        const sportFiltersTriathlon = {
          type: 'sportFilters',
          name: 'Triathlon'
        }
        const triathlonFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(sportFiltersTriathlon)
        )
        const triathlonFilterValue = triathlonFilterState.getIn([
          sportFiltersTriathlon.type,
          sportFiltersTriathlon.name
        ])
        expect(!triathlonFilterValue).toBeFalsy()

        const sportFiltersActive = {
          type: 'sportFilters',
          name: 'Active'
        }

        const activeFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(sportFiltersActive)
        )
        const activeFilterValue = activeFilterState.getIn([
          sportFiltersActive.type,
          sportFiltersActive.name
        ])
        expect(!activeFilterValue).toBeFalsy()

        const sportFilterMountainBike = {
          type: 'sportFilters',
          name: 'Mountain Bike'
        }
        const mountainBikeFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(sportFilterMountainBike)
        )
        const mountainBikeFilterValue = mountainBikeFilterState.getIn([
          sportFilterMountainBike.type,
          sportFilterMountainBike.name
        ])
        expect(!mountainBikeFilterValue).toBeFalsy()

        const sportFilterRoadBike = {
          type: 'sportFilters',
          name: 'Road Bike'
        }
        const roadBikeFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(sportFilterRoadBike)
        )
        const roadBikeFilterValue = roadBikeFilterState.getIn([
          sportFilterRoadBike.type,
          sportFilterRoadBike.name
        ])
        expect(!roadBikeFilterValue).toBeFalsy()
      })

      // CATEGORY FILTERS
      it('Handles undefined value for category filters', () => {
        const categoryFiltersJerseyAndTops = initialState.getIn([
          'categoryFiltes',
          'Jerseys & Tops'
        ])
        expect(categoryFiltersJerseyAndTops).toBeUndefined()

        const categoryFiltersShortsBibs = initialState.getIn([
          'categoryFilters',
          'Shorts & Bibs'
        ])
        expect(categoryFiltersShortsBibs).toBeUndefined()

        const categoryFiltersSuits = initialState.getIn([
          'categoryFilters',
          'Suits'
        ])
        expect(categoryFiltersSuits).toBeUndefined()

        const categoryFiltersAccessories = initialState.getIn([
          'cagtegoryFilters',
          'Accessories'
        ])
        expect(categoryFiltersAccessories).toBeUndefined()

        const categoryFiltersOutwear = initialState.getIn([
          'categoryFilters',
          'Outwear'
        ])
        expect(categoryFiltersOutwear).toBeUndefined()

        const categoryFiltersRaceSuits = initialState.getIn([
          'categoryFilters',
          'Racesuits'
        ])
        expect(categoryFiltersRaceSuits).toBeUndefined()
      })

      // tslint:disable-next-line
      it('Handles true value in category filters (Jersey & Tops, Shorts & Bibs, Suits, Accessories, Outwear, Racesuits)', () => {
        const categoryFiltersJerseyTops = {
          type: 'categoryFilters',
          name: 'Jerseys & Tops'
        }
        const jerseyTopsFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(categoryFiltersJerseyTops)
        )
        const jerseyTopsFilterValue = jerseyTopsFilterState.getIn([
          categoryFiltersJerseyTops.type,
          categoryFiltersJerseyTops.name
        ])
        expect(jerseyTopsFilterValue).toBeTruthy()

        const categoryFiltersShortsBibs = {
          type: 'categoryFilters',
          name: 'Shorts & Bibs'
        }
        const shortBibsFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(categoryFiltersShortsBibs)
        )
        const shortBibsFilterValue = shortBibsFilterState.getIn([
          categoryFiltersShortsBibs.type,
          categoryFiltersShortsBibs.name
        ])
        expect(shortBibsFilterValue).toBeTruthy()

        const categoryFiltersSuits = {
          type: 'categoryFilters',
          name: 'Suits'
        }
        const suitsFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(categoryFiltersSuits)
        )
        const suitsFilterValue = suitsFilterState.getIn([
          categoryFiltersSuits.type,
          categoryFiltersSuits.name
        ])
        expect(suitsFilterValue).toBeTruthy()

        const categoryFiltersAccessories = {
          type: 'categoryFilters',
          name: 'Accessories'
        }
        const accessoriesFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(categoryFiltersAccessories)
        )
        const accessoriesFilterValue = accessoriesFilterState.getIn([
          categoryFiltersAccessories.type,
          categoryFiltersAccessories.name
        ])
        expect(accessoriesFilterValue).toBeTruthy()

        const categoryFiltersOutwear = {
          type: 'categoryFilters',
          name: 'Outwear'
        }
        const outwearFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(categoryFiltersOutwear)
        )
        const ourtwearFilterValue = outwearFilterState.getIn([
          categoryFiltersOutwear.type,
          categoryFiltersOutwear.name
        ])
        expect(ourtwearFilterValue).toBeTruthy()

        const categoryFiltersRacesuits = {
          type: 'categoryFilters',
          name: 'Racesuits'
        }
        const racesuitsFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(categoryFiltersRacesuits)
        )
        const racesuitsFilterValue = racesuitsFilterState.getIn([
          categoryFiltersRacesuits.type,
          categoryFiltersRacesuits.name
        ])
        expect(racesuitsFilterValue).toBeTruthy()
      })

      // tslint:disable-next-line
      it('Handles false value in category filters (Jersey & Tops, Shorts & Bibs, Suits, Accessories, Outwear, Racesuits)', () => {
        initialState.setIn(['categoryFilters', 'Jerseys & Tops'], true)
        const categoryFiltersJerseyTops = {
          type: 'categoryFilters',
          name: 'Jerseys & Tops'
        }
        const jerseyTopsFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(categoryFiltersJerseyTops)
        )
        const jerseyTopsFilterValue = jerseyTopsFilterState.getIn([
          categoryFiltersJerseyTops.type,
          categoryFiltersJerseyTops.name
        ])
        expect(!jerseyTopsFilterValue).toBeFalsy()

        initialState.setIn(['categoryFilters', 'Shorts & Bibs'], true)
        const categoryFiltersShortsBibs = {
          type: 'categoryFilters',
          name: 'Shorts & Bibs'
        }
        const shortBibsFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(categoryFiltersShortsBibs)
        )
        const shortBibsFilterValue = shortBibsFilterState.getIn([
          categoryFiltersShortsBibs.type,
          categoryFiltersShortsBibs.name
        ])
        expect(!shortBibsFilterValue).toBeFalsy()

        initialState.setIn(['categoryFilters', 'Suits'], true)
        const categoryFiltersSuits = {
          type: 'categoryFilters',
          name: 'Suits'
        }
        const suitsFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(categoryFiltersSuits)
        )
        const suitsFilterValue = suitsFilterState.getIn([
          categoryFiltersSuits.type,
          categoryFiltersSuits.name
        ])
        expect(!suitsFilterValue).toBeFalsy()

        initialState.setIn(['categoryFilters', 'Accessories'], true)
        const categoryFiltersAccessories = {
          type: 'categoryFilters',
          name: 'Accessories'
        }
        const accessoriesFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(categoryFiltersAccessories)
        )
        const accessoriesFilterValue = accessoriesFilterState.getIn([
          categoryFiltersAccessories.type,
          categoryFiltersAccessories.name
        ])
        expect(!accessoriesFilterValue).toBeFalsy()

        initialState.setIn(['categoryFilters', 'Outwear'], true)
        const categoryFiltersOutwear = {
          type: 'categoryFilters',
          name: 'Outwear'
        }
        const outwearFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(categoryFiltersOutwear)
        )
        const ourtwearFilterValue = outwearFilterState.getIn([
          categoryFiltersOutwear.type,
          categoryFiltersOutwear.name
        ])
        expect(!ourtwearFilterValue).toBeFalsy()

        initialState.setIn(['categoryFilters', 'Racesuits'], true)
        const categoryFiltersRacesuits = {
          type: 'categoryFilters',
          name: 'Racesuits'
        }
        const racesuitsFilterState = productCatalogReducer(
          initialState,
          setSelectedFilters(categoryFiltersRacesuits)
        )
        const racesuitsFilterValue = racesuitsFilterState.getIn([
          categoryFiltersRacesuits.type,
          categoryFiltersRacesuits.name
        ])
        expect(!racesuitsFilterValue).toBeFalsy()
      })
    })
  })
})
