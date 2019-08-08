/**
 * ProductCatalog Test - Created by cazarez on 27/02/18.
 */

import productCatalogReducer, { initialState } from './reducer'
import {
  setSelectedFilters,
  sortBySelected,
  setSkipValue,
  openSidebarMobile,
  resetReducerAction,
  clearFiltersAction,
  setHomeSelectedFilters
} from './actions'
import {
  SET_SELECTED_FILTERS,
  ORDERBY_SELECTED,
  SET_SKIP_VALUE,
  OPEN_SIDEBAR_MOBILE,
  RESET_REDUCER_DATA,
  CLEAR_FILTERS,
  SET_SELECTED_HOME_FILTERS
} from './constants'

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

    it('sortBySelected', () => {
      const type = ORDERBY_SELECTED
      const orderBy = 'DESC'

      expect(sortBySelected(orderBy)).toEqual({
        type,
        orderBy
      })
    })

    it('setSkipValue', () => {
      const type = SET_SKIP_VALUE
      const skip = 0
      const page = 1

      expect(setSkipValue(skip, page)).toEqual({
        type,
        skip,
        page
      })
    })

    it('openSidebarMobile', () => {
      const type = OPEN_SIDEBAR_MOBILE
      const open = true
      expect(openSidebarMobile(open)).toEqual({
        type,
        open
      })
    })

    it('resetReducerAction', () => {
      const type = RESET_REDUCER_DATA
      expect(resetReducerAction()).toEqual({
        type
      })
    })

    it('clearFiltersAction', () => {
      const type = CLEAR_FILTERS
      expect(clearFiltersAction()).toEqual({
        type
      })
    })

    it('setHomeSelectedFilters', () => {
      const type = SET_SELECTED_HOME_FILTERS
      expect(setHomeSelectedFilters()).toEqual({
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
        let state = productCatalogReducer(initialState, { type: 'unknow' })
        expect(state).toEqual(initialState)
      })
    })
    describe('SET_SELECTED_FILTERS', () => {
      describe('Custom Filter', () => {
        it('Handles undefined value in Custom filter', () => {
          const customInitialValue = initialState.getIn([
            'collectionFilters',
            'Custom'
          ])
          expect(customInitialValue).toBeUndefined()
        })

        it('Handles true value in Custom filters', () => {
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
        })

        it('Handles false value in Custom filters', () => {
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
        })
      })

      describe('Inline filter', () => {
        it('Handles undefined initial value for Inline filter', () => {
          const inlineInitialValue = initialState.getIn([
            'collectionFilters',
            'Inline'
          ])
          expect(inlineInitialValue).toBeUndefined()
        })

        it('Handles true value in Inline Filter', () => {
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

        it('Handles false value in Inline filter', () => {
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
      })

      describe('Men filter', () => {
        it('Handles undefined initial value in men filter', () => {
          const menFilterInitialValue = initialState.getIn([
            'genderFilters',
            'Men'
          ])
          expect(menFilterInitialValue).toBeUndefined()
        })

        it('Handles true value in men filter', () => {
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
        })

        it('Handles false value in men filter', () => {
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
        })
      })

      describe('Women filter', () => {
        it('Handles undefined initial value in Women filter', () => {
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

        it('Handles true value in Women filter', () => {
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
        })

        it('Handles false value in Women filter', () => {
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
        })
      })

      describe('Unisex Filter', () => {
        it('Handles true value in Unisex filter', () => {
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

        it('Handles false value in Unisex filters', () => {
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

      describe('Triathlon filter', () => {
        it('Handles undefined value in sports filter', () => {
          const sportFilterInitialValue = initialState.getIn([
            'sportFilters',
            'Triathlon'
          ])
          expect(sportFilterInitialValue).toBeUndefined()
        })

        it('Handles true value in Triathlon filter', () => {
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
        })

        it('Handles false value in Triathlon filter', () => {
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
        })
      })

      describe('Active Filter', () => {
        it('Handles undefined initial value in Active filter', () => {
          const activeFilterInitialValue = initialState.getIn([
            'sportFilters',
            'Active'
          ])
          expect(activeFilterInitialValue).toBeUndefined()
        })

        it('Handles true value in Active filter', () => {
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
        })

        it('Handles false value in Active filter', () => {
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
        })
      })

      describe('Mountain Bike Filter', () => {
        it('Handles undefined initial value for Mountain Bike filter', () => {
          const mountainBikeFilterInitialValue = initialState.getIn([
            'sportFilters',
            'Mountain Bike'
          ])
          expect(mountainBikeFilterInitialValue).toBeUndefined()
        })

        it('Handles true value for Mountain Bike filter', () => {
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
        })

        it('Handles false value for Mountain Bike filter', () => {
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
        })
      })

      describe('Road Bike Filter', () => {
        it('Handles unidefined initial value for Road Bike filter', () => {
          const roadBikeFilterInitialValue = initialState.getIn([
            'sportFilters',
            'Road Bike'
          ])
          expect(roadBikeFilterInitialValue).toBeUndefined()
        })

        it('Handles true value in Road Bike filter', () => {
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

        it('Handles false value for Road Bike filter', () => {
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
      })

      describe('Jersey & Tops Filter', () => {
        it('Handles undefined initial value for Jersey & Tops filter', () => {
          const categoryFiltersJerseyAndTops = initialState.getIn([
            'categoryFiltes',
            'Jerseys & Tops'
          ])
          expect(categoryFiltersJerseyAndTops).toBeUndefined()
        })

        it('Handles true value for Jersey & Tops filter', () => {
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
        })

        it('Handles false value in Jersey & Tops filter', () => {
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
        })
      })

      describe('Shorts & Bibs Filter', () => {
        it('Handles undefined for Shorts & Bib filter', () => {
          const categoryFiltersShortsBibs = initialState.getIn([
            'categoryFilters',
            'Shorts & Bibs'
          ])
          expect(categoryFiltersShortsBibs).toBeUndefined()
        })
        it('Handles true value for Shorts & Bib', () => {
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
        })

        it('Handles false value for Shorts & Bib filter', () => {
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
        })
      })

      describe('Suits Filter', () => {
        it('Handles undefined value in Suits filter', () => {
          const categoryFiltersSuits = initialState.getIn([
            'categoryFilters',
            'Suits'
          ])
          expect(categoryFiltersSuits).toBeUndefined()
        })

        it('Handles true value in Suits filter', () => {
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
        })

        it('Handles false value for Suits filter', () => {
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
        })
      })

      describe('Category Filters', () => {
        it('Handles undefined value for Accessories filter', () => {
          const categoryFiltersAccessories = initialState.getIn([
            'cagtegoryFilters',
            'Accessories'
          ])
          expect(categoryFiltersAccessories).toBeUndefined()
        })

        it('Handles true value for Accessories filter', () => {
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
        })

        it('Handles false value for Accessories filter', () => {
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
        })
      })

      describe('Outwear Filter', () => {
        it('Handles undefined value for Outwear filter', () => {
          const categoryFiltersOutwear = initialState.getIn([
            'categoryFilters',
            'Outwear'
          ])
          expect(categoryFiltersOutwear).toBeUndefined()
        })

        it('Handles true value for Outwear filter', () => {
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
        })

        it('Handles false value for Outwear filter', () => {
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
        })
      })

      describe('Racesuits Filter', () => {
        it('Handles undefined for Racesuits filter', () => {
          const categoryFiltersRaceSuits = initialState.getIn([
            'categoryFilters',
            'Racesuits'
          ])
          expect(categoryFiltersRaceSuits).toBeUndefined()
        })

        it('Handles true value in Racesuits filter', () => {
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

        it('Handles false value in Racesuits filter', () => {
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

      describe('Spring/Summer Filter', () => {
        it('Handles undefined for Spring/Summer filter', () => {
          const springSummerInitialValue = initialState.getIn([
            'seasonFilters',
            'Spring/Summer'
          ])
          expect(springSummerInitialValue).toBeUndefined()
        })

        it('Handles true value in Spring/Summer filter', () => {
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
        })

        it('Handles false value in SPring/Summer', () => {
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
        })
      })

      describe('Fall/Winter Filter', () => {
        it('Handles unidefined value for Fall/Winter filter', () => {
          const fallWinterInitialValue = initialState.getIn([
            'seasonFilters',
            'Fall/Winter'
          ])
          expect(fallWinterInitialValue).toBeUndefined()
        })

        it('Handles true value for Fall/Winter', () => {
          it('Handles true value in Season Filters Fall/')
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
        })

        it('Handles false value for Fall/Winter filter', () => {
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
        })
      })

      describe('All Season Filter', () => {
        it('Handles undefined value for All Season filter', () => {
          const allSeasonsInitialValue = initialState.getIn([
            'seasonFilters',
            'All Season'
          ])
          expect(allSeasonsInitialValue).toBeUndefined()
        })

        it('Handles true value in All Season Filter', () => {
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

        it('Handles false value in All Season Filters', () => {
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
      })

      describe('Standard Filter', () => {
        it('Handles undefined value for Standard', () => {
          const standardFilterInitialValue = initialState.getIn([
            'fit_styleFilters',
            'Standard'
          ])
          expect(standardFilterInitialValue).toBeUndefined()
        })

        it('Handles true value for Standard filter', () => {
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
        })

        it('Handles false value for Standard filter', () => {
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
        })
      })

      describe('Relaxed Filter', () => {
        it('Handles undefined value for Relaxed filter', () => {
          const relaxedFilterInitialValue = initialState.getIn([
            'fit_styleFilters',
            'Relaxed'
          ])
          expect(relaxedFilterInitialValue).toBeUndefined()
        })

        it('Handles true value for Relaxed filter', () => {
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
        })

        it('Handles false value foor Relaxed filter', () => {
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
        })
      })

      describe('Slim Filter', () => {
        it('Handles undefined value for Slim filter', () => {
          const slimFilterInitialValue = initialState.getIn([
            'fit_styleFilters',
            'Slim'
          ])
          expect(slimFilterInitialValue).toBeUndefined()
        })

        it('Handles true value for Slim filter', () => {
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

        it('Handles false value for Slim filter', () => {
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

    describe('ORDERBY_SELECTED', () => {
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
})
