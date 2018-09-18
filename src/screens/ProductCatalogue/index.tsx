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
import get from 'lodash/get'
import has from 'lodash/has'
import trimEnd from 'lodash/trimEnd'
import upperFirst from 'lodash/upperFirst'
import queryString from 'query-string'
import Layout from '../../components/MainLayout'
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
import { QueryProps, ClickParam, Filter } from '../../types/common'
import { GetFiltersQuery } from './data'
import { filtersNames } from './constants'

import config from '../../config/index'
import { RED } from '../../theme/colors'

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
  setFilterAction: (filter: {}) => void
  clearFiltersAction: () => void
  openQuickViewAction: (index: number) => void
  setSelectedFilters: (filter: object) => void
  sortBySelected: (sortBy: string) => void
  setSkipValue: (skip: number, page: number) => void
  openSidebarMobile: (open: boolean) => void
  resetReducerAction: () => void
}

export class ProductCatalog extends React.Component<Props, StateProps> {
  state = {
    showTypeFilters: false,
    filters: []
  }

  componentWillMount() {
    this.checkFilters()
  }

  componentWillUnmount() {
    const { resetReducerAction } = this.props
    resetReducerAction()
  }

  checkFilters() {
    const {
      location: { search, state },
      setSelectedFilters,
      clearFiltersAction
    } = this.props

    const { gender, category, sport } = queryString.parse(search)

    clearFiltersAction()

    if (gender) {
      this.setState({ ['showgenderFilters']: true } as any)
      const filterObject = {
        type: 'genderFilters',
        name: upperFirst(gender),
        firstGenderSet: true
      }
      setSelectedFilters(filterObject)
    }

    if (category) {
      const categoryName = this.getFormattedFilterName(category, '&')

      const filterObject = {
        type: 'categoryFilters',
        name: categoryName,
        firstGenderSet: true
      }
      setSelectedFilters(filterObject)
    }

    if (sport) {
      const sportName = this.getFormattedFilterName(sport)

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
      currentPage,
      fakeWidth,
      openSidebar,
      openQuickViewAction: openQuickView,
      currentCurrency,
      data: { loading, filters: filtersGraph }
    } = this.props

    let sortByLabel = ''
    if (loading || !filtersGraph.length) {
      return null
    }

    const {
      location: { state }
    } = history

    const forced = get(state, 'forced', false)

    if (forced) {
      this.checkFilters()
    }

    switch (orderBy) {
      case 'pricelow':
        sortByLabel = intl.formatMessage(messages.lowestPriceLabel)
        break
      case 'pricehigh':
        sortByLabel = intl.formatMessage(messages.hightestPriceLabel)
        break
      default:
        sortByLabel = intl.formatMessage(messages.topSellerLabel)
        break
    }

    const filters = [
      collectionFilters,
      genderFilters,
      sportFilters,
      categoryFilters,
      seasonFilters,
      fitStyleFilters,
      typeFilters
    ]

    const renderFilters = filtersGraph.map(
      (filter: FilterType, index: number) => {
        const filterToShow = this.state[`show${filter.name}Filters`]
        const activeFilters = filters[index]
        return (
          <div key={index}>
            <FilterComponent
              key={filter.id}
              id={filter.name}
              title={UpperCase(filter.name)}
              options={filter.options}
              showOptions={filterToShow}
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
                  <Layout {...{ history, intl }}>
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
                          currentCurrency={
                            currentCurrency || config.defaultCurrency
                          }
                          {...{
                            skip,
                            orderBy,
                            limit,
                            openQuickView,
                            history,
                            sortByLabel,
                            currentPage
                          }}
                        />
                      </ResultsColumn>
                    </Container>
                  </Layout>
                </Drawer>
              </div>
            )
          } else {
            return (
              <Layout {...{ history, intl }}>
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
                      currentCurrency={
                        currentCurrency || config.defaultCurrency
                      }
                      {...{
                        skip,
                        orderBy,
                        limit,
                        openQuickView,
                        history,
                        sortByLabel,
                        currentPage
                      }}
                    />
                  </ResultsColumn>
                </Container>
              </Layout>
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
      target: { name, value }
    } = evt
    const noSpacesValue = value.replace(/\s/g, '')
    const filterObject = {
      type: `${noSpacesValue}Filters`,
      name
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
  const productCatalogue = state.get('productCatalog').toJS()
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