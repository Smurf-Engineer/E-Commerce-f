/**
 * ProductCatalog Screen - Created by cazarez on 27/02/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import UpperCase from 'lodash/upperCase'
import MediaQuery from 'react-responsive'
import Drawer from 'rc-drawer'
import includes from 'lodash/includes'
import get from 'lodash/get'
import has from 'lodash/has'
import trimEnd from 'lodash/trimEnd'
import upperFirst from 'lodash/upperFirst'
import queryString from 'query-string'
import FilterComponent from '../../components/ProductCatalogFilterComponent'
import ProductsThumbnailList from '../../components/ProductCatalogueThumbnailsList'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import * as productCatalogActions from './actions'
import messages from './messages'
import {
  Container,
  FiltersColumn,
  FiltersTitle,
  ResultsColumn,
  Icon
} from './styledComponents'
import { QueryProps, ClickParam, Filter, Product } from '../../types/common'
import { GetFiltersQuery } from './data'
import { filtersNames, ALL_GENDERS } from './constants'

import config from '../../config/index'
import { RED } from '../../theme/colors'

const SELECTEED_ITEMS = 'selectedItems'

interface FilterOptions extends Filter {
  selected: boolean
  filterId: number
}

interface FilterType {
  index?: number
  id?: string
  name: string
  options: FilterOptions[]
}
interface Data extends QueryProps {
  filters: FilterType[]
}

interface StateProps {
  showTypeFilters: boolean
  filters: FilterType[]
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
  collectionFilters: FilterType
  genderFilters: FilterType
  sportFilters: FilterType
  categoryFilters: FilterType
  seasonFilters: FilterType
  fit_styleFilters: FilterType
  typeFilters: FilterType
  temperatureFilters: FilterType
  orderBy: string
  limit: number
  skip: number
  currentPage: number
  fakeWidth: number
  openSidebar: boolean
  currentCurrency: string
  selectedItems: Product[]
  hideFilters?: string []
  fromIntakeForm?: boolean
  isEdit?: boolean
  changeQuantity: (key: number) => void
  setFilterAction: (filter: {}) => void
  clearFiltersAction: () => void
  openQuickViewAction: (index: number) => void
  setSelectedFilters: (filter: object) => void
  sortBySelected: (sortBy: string) => void
  setSkipValue: (skip: number, page: number) => void
  openSidebarMobile: (open: boolean) => void
  setHomeSelectedFilters: () => void
  resetReducerAction: () => void
  setAllGendersAction: () => void
  onSelectProduct: (product: Product) => void
  onDeselectProduct: (productId: number, listName: string, key?: number) => void
}

export class ProductCatalog extends React.Component<Props, StateProps> {
  state = {
    showTypeFilters: false,
    showcollectionFilters: true,
    filters: []
  }

  componentWillUnmount() {
    const { resetReducerAction } = this.props
    resetReducerAction()
  }

  checkFilters() {
    const {
      location: { search, state },
      setSelectedFilters,
      clearFiltersAction,
      setHomeSelectedFilters,
      setAllGendersAction
    } = this.props

    const { gender, category, sport, filter } = queryString.parse(search)
    clearFiltersAction()

    if (filter) {
      this.setState({
        showcollectionFilters: true,
        showsportFilters: true,
        showcategoryFilters: true
      } as any)
      setHomeSelectedFilters()
    }

    if (gender && !filter) {
      this.setState({ showgenderFilters: true } as any)
      if (gender === ALL_GENDERS) {
        setAllGendersAction()
      } else {
        const filterObject = {
          type: 'genderFilters',
          name: upperFirst(gender),
          firstGenderSet: true
        }
        setSelectedFilters(filterObject)
      }
    }

    if (category && !filter) {
      const categoryName = this.getFormattedFilterName(category, '&')
      this.setState({ showcategoryFilters: true } as any)
      const filterObject = {
        type: 'categoryFilters',
        name: categoryName,
        firstGenderSet: true
      }
      setSelectedFilters(filterObject)
    }

    if (sport && !filter) {
      const sportName = this.getFormattedFilterName(sport)
      this.setState({ showsportFilters: true } as any)
      let filterObject = {
        type: 'sportFilters',
        name: sportName
      }
      setSelectedFilters(filterObject)
    }

    if (state) {
      state.forced = false
    }
  }

  onCheckChange = (product: Product, checked: boolean, key = 0) => {
    const { onSelectProduct, onDeselectProduct } = this.props
    if (checked) {
      onSelectProduct(product)
      return
    }
    onDeselectProduct(product.id, SELECTEED_ITEMS, key)
  }

  render() {
    const {
      history,
      intl,
      collectionFilters,
      genderFilters,
      sportFilters,
      categoryFilters,
      seasonFilters,
      fit_styleFilters: fitStyleFilters,
      typeFilters,
      orderBy,
      limit,
      skip,
      isEdit,
      changeQuantity,
      currentPage,
      fakeWidth,
      openSidebar,
      openQuickViewAction: openQuickView,
      currentCurrency,
      data: { loading, filters: filtersGraph },
      selectedItems,
      hideFilters = [],
      fromIntakeForm = false
    } = this.props
    if (loading || !filtersGraph || !filtersGraph.length) {
      return null
    }

    const {
      location: { search, state }
    } = history

    const queryParams = queryString.parse(search)
    const { contentTile } = queryParams

    const forced = get(state, 'forced', false)

    if (forced) {
      this.checkFilters()
    }

    const defaultGenders = {}
    const defaultSports = {}
    const defaultCategories = {}
    const defaultSeasons = {}
    const defaultFitStyles = {}

    selectedItems.forEach((item: Product) => {
      const { genders, sports, categoryName, season, fitStyles } = item
      if (genders.length) {
        genders.forEach(({ name: genderName }) => {
          defaultGenders[genderName] = true
        })
      }
      if (sports && sports.length) {
        sports.forEach(({ name: sportName }) => {
          defaultSports[sportName] = true
        })
      }
      if (fitStyles && fitStyles.length) {
        fitStyles.forEach(({ name: fitName }) => {
          defaultFitStyles[fitName] = true
        })
      }
      if (categoryName) {
        defaultCategories[categoryName] = true
      }
      if (season) {
        defaultSeasons[season] = true
      }
    })

    const gendersFiltered = {...defaultGenders, ...genderFilters}
    const sportsFiltered = {...defaultSports, ...sportFilters}
    const categoriesFiltered = {...defaultCategories, ...categoryFilters}
    const seasonsFiltered = {...defaultSeasons, ...seasonFilters}
    const stylesFiltered = {...defaultFitStyles, ...fitStyleFilters}
    const filters = [
      collectionFilters,
      gendersFiltered,
      sportsFiltered,
      categoriesFiltered,
      seasonsFiltered,
      stylesFiltered,
      typeFilters
    ]

    const renderFilters = filtersGraph.map(
      (filter: FilterType, index: number) => {
        const filterToShow = this.state[`show${filter.name}Filters`]
        const activeFilters = filters[index]

        return !includes(hideFilters, filter.name) && (
          <div key={index}>
            <FilterComponent
              key={filter.id}
              id={filter.name}
              title={UpperCase(filter.name)}
              options={filter.options}
              showOptions={fromIntakeForm && filterToShow === undefined ? true : filterToShow}
              toggleOptions={this.toggleFilter}
              selectOption={this.handleSelect}
              {...{ activeFilters }}
            />
          </div>
        )
      }
    )

    const sidebarFilters = (
      <div>
        <FiltersTitle showChildren={openSidebar} color={RED}>
          {intl.formatMessage(messages.filtersTitle)}
          <Icon type="down" />
        </FiltersTitle>
        {renderFilters}
      </div>
    )

    const {
      COLLECTION,
      CATEGORY,
      GENDER,
      SPORT,
      SEASON,
      FITSTYLE
    } = filtersNames

    const collectionFilter = filtersGraph.find(
      filter => filter.name === COLLECTION
    )
    const genderFilter = filtersGraph.find(filter => filter.name === GENDER)
    const sportFilter = filtersGraph.find(filter => filter.name === SPORT)
    const categoryFilter = filtersGraph.find(filter => filter.name === CATEGORY)
    const seasonFilter = filtersGraph.find(filter => filter.name === SEASON)
    const fitStyleFilter = filtersGraph.find(filter => filter.name === FITSTYLE)

    const collectionOptions = get(collectionFilter, 'options', [])
    const genderOptions = get(genderFilter, 'options', [])
    const sportOptions = get(sportFilter, 'options', [])
    const categoryOptions = get(categoryFilter, 'options', [])
    const seasonOptions = get(seasonFilter, 'options', [])
    const fitStyleOptions = get(fitStyleFilter, 'options', [])

    const collectionIndexes = this.getFilterIndexes(
      collectionOptions,
      collectionFilters
    )
    const genderIndexes = this.getFilterIndexes(genderOptions, genderFilters)
    const sportIndexes = this.getFilterIndexes(sportOptions, sportFilters)
    const categoryIndexes = this.getFilterIndexes(
      categoryOptions,
      categoryFilters
    )
    const seasonsIndexes = this.getFilterIndexes(seasonOptions, seasonFilters)
    const fitSizeIndexes = this.getFilterIndexes(
      fitStyleOptions,
      fitStyleFilters
    )

    const renderView = (
      <MediaQuery
        maxWidth={768}
        values={{ width: fakeWidth, deviceWidth: fakeWidth }}
      >
        {matches => {
          if (matches) {
            return (
              <div className="drawer-container">
                <Drawer
                  open={openSidebar}
                  sidebar={sidebarFilters}
                  position={'left'}
                  touch={true}
                  onOpenChange={this.handleOpenSidebar}
                >
                    <Container>
                      <ResultsColumn>
                        <FiltersTitle
                          onClick={this.handleOpenSidebar}
                          showChildren={true}
                        >
                          {intl.formatMessage(messages.filtersTitle)}
                          <Icon type="down" />
                        </FiltersTitle>
                        <ProductsThumbnailList
                          formatMessage={intl.formatMessage}
                          collectionFilters={collectionIndexes}
                          genderFilters={genderIndexes}
                          sportFilters={sportIndexes}
                          categoryFilters={categoryIndexes}
                          seasonFilters={seasonsIndexes}
                          fitFilters={fitSizeIndexes}
                          handleChangePage={this.handlechangePage}
                          handleOrderBy={this.handleOrderBy}
                          selectProduct={true}
                          handleCheckChange={this.onCheckChange}
                          currentCurrency={
                            currentCurrency || config.defaultCurrency
                          }
                          {...{
                            skip,
                            orderBy,
                            limit,
                            isEdit,
                            changeQuantity,
                            openQuickView,
                            history,
                            sortByLabel: '',
                            currentPage,
                            contentTile,
                            selectedItems,
                            fromIntakeForm
                          }}
                        />
                      </ResultsColumn>
                    </Container>
                </Drawer>
              </div>
            )
          } else {
            return (
              <Container>
                <FiltersColumn>
                  <FiltersTitle>
                    {intl.formatMessage(messages.filtersTitle)}
                  </FiltersTitle>
                  {renderFilters}
                </FiltersColumn>
                <ResultsColumn>
                  <ProductsThumbnailList
                    formatMessage={intl.formatMessage}
                    collectionFilters={collectionIndexes}
                    genderFilters={genderIndexes}
                    sportFilters={sportIndexes}
                    categoryFilters={categoryIndexes}
                    seasonFilters={seasonsIndexes}
                    fitFilters={fitSizeIndexes}
                    handleChangePage={this.handlechangePage}
                    handleOrderBy={this.handleOrderBy}
                    selectProduct={true}
                    handleCheckChange={this.onCheckChange}
                    currentCurrency={
                      currentCurrency || config.defaultCurrency
                    }
                    {...{
                      skip,
                      orderBy,
                      limit,
                      isEdit,
                      openQuickView,
                      history,
                      sortByLabel: '',
                      changeQuantity,
                      currentPage,
                      contentTile,
                      selectedItems,
                      fromIntakeForm
                    }}
                  />
                </ResultsColumn>
              </Container>
            )
          }
        }}
      </MediaQuery>
    )
    return renderView
  }

  handlechangePage = (pageNumber: number) => {
    const { setSkipValue, limit } = this.props
    const skip = (pageNumber - 1) * limit
    window.scrollTo(0, 0)
    setSkipValue(skip, pageNumber)
  }

  getFilterIndexes = (filterOptions: FilterOptions[], filters: object) => {
    let optionsIds = ''
    filterOptions.forEach(({ name, filterId }: FilterOptions) => {
      if (has(filters, name) && filters[name]) {
        optionsIds += `${filterId},`
      }
    })
    return trimEnd(optionsIds, ',')
  }

  handleOrderBy = (evt: ClickParam) => {
    const { sortBySelected } = this.props
    const { key } = evt

    sortBySelected(key)
  }

  toggleFilter = (evt: React.MouseEvent<HTMLImageElement>) => {
    const {
      currentTarget: { id }
    } = evt
    const stateValue = this.state[`show${id}Filters`]

    this.setState({ [`show${id}Filters`]: !stateValue } as any)
  }

  handleSelect = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { setSelectedFilters } = this.props
    const {
      target: { name, checked, value }
    } = evt
    const noSpacesValue = value.replace(/\s/g, '')
    const filterObject = {
      type: `${noSpacesValue}Filters`,
      name,
      value: checked
    }
    setSelectedFilters(filterObject)
  }

  handleOpenSidebar = () => {
    const { openSidebar, openSidebarMobile } = this.props
    openSidebarMobile(!openSidebar)
  }

  getFormattedFilterName = (
    name: string,
    separator?: string
  ): string | string[] => {
    if (!name.includes(' ')) {
      return upperFirst(name)
    }

    const array = name.split(' ')
    const first = upperFirst(array[0])
    const divider = separator ? ` ${separator} ` : ' '
    const second = upperFirst(array[1])

    return `${first}${divider}${second}`
  }
}

const mapStateToProps = (state: any) => {
  const productCatalogue = state.get('intakeProductCatalog').toJS()
  const responsive = state.get('responsive').toJS()
  const langProps = state.get('languageProvider').toJS()
  return { ...productCatalogue, ...responsive, ...langProps }
}

const ProductCatalogEnhance = compose(
  injectIntl,
  graphql<Data>(GetFiltersQuery, {}),
  connect(
    mapStateToProps,
    { ...productCatalogActions, openQuickViewAction }
  )
)(ProductCatalog)

export default ProductCatalogEnhance
