/**
 * ProductCatalog Screen - Created by cazarez on 27/02/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import UpperCase from 'lodash/upperCase'
import get from 'lodash/get'
import has from 'lodash/has'
import trimEnd from 'lodash/trimEnd'

import { ClickParam } from 'antd/lib/menu'
import { ReducersObject } from '../../store/rootReducer'
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
  ResultsColumn
} from './styledComponents'
import { QueryProps } from '../../types/common'
import { GetFiltersQuery } from './data'

interface FilterOptions {
  name: string
  selected: boolean
}
interface FilterType {
  index: number
  id: string
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
  genderFilters: FilterType
  sportFilters: FilterType
  categoryFilters: FilterType
  fitstyleFilters: FilterType
  temperatureFilters: FilterType
  orderBy: string
  limit: number
  skip: number
  currentPage: number
  setFilterAction: (filter: {}) => void
  openQuickViewAction: (index: number) => void
  setSelectedFilters: (filter: object) => void
  sortBySelected: (sortBy: string) => void
  setSkipValue: (skip: number, page: number) => void
}

export class ProductCatalog extends React.Component<Props, StateProps> {
  state = {
    showTypeFilters: false,
    filters: []
  }

  render() {
    const {
      history,
      intl,
      genderFilters,
      sportFilters,
      categoryFilters,
      fitstyleFilters,
      temperatureFilters,
      orderBy,
      limit,
      skip,
      currentPage,
      openQuickViewAction: openQuickView,
      data: { loading, filters: filtersGraph }
    } = this.props
    let sortByLabel = ''
    if (loading) {
      return null
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

    const renderFilters = filtersGraph.map(
      (filter: FilterType, index: number) => {
        const filterToShow = this.state[`show${filter.name}Filters`]
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
            />
          </div>
        )
      }
    )

    const genderOptions = get(filtersGraph, '0.options')
    const sportOptions = get(filtersGraph, '1.options')
    const categoryOptions = get(filtersGraph, '2.options')
    const fitOptions = get(filtersGraph, '3.options')
    const tempOptions = get(filtersGraph, '4.options')

    const genderIndexes = this.getFilterIndexes(genderOptions, genderFilters)
    const sportIndexes = this.getFilterIndexes(sportOptions, sportFilters)
    const categoryIndexes = this.getFilterIndexes(
      categoryOptions,
      categoryFilters
    )
    const fitIndexes = this.getFilterIndexes(fitOptions, fitstyleFilters)
    const temperatureIndexes = this.getFilterIndexes(
      tempOptions,
      temperatureFilters
    )

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
              genderFilters={genderIndexes}
              sportFilters={sportIndexes}
              categoryFilters={categoryIndexes}
              fitFilters={fitIndexes}
              temperatureFilters={temperatureIndexes}
              handleChangePage={this.handlechangePage}
              handleOrderBy={this.handleOrderBy}
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

  handlechangePage = (pageNumber: number) => {
    const { setSkipValue, limit } = this.props
    const skip = (pageNumber - 1) * limit

    setSkipValue(skip, pageNumber)
  }

  getFilterIndexes = (filterOptions: FilterOptions[], filters: object) => {
    let indexes = ''
    filterOptions.forEach((option: FilterOptions, index: number) => {
      if (has(filters, option.name) && filters[option.name]) {
        indexes += `${index + 1},`
      }
    })
    return trimEnd(indexes, ',')
  }

  handleOrderBy = (evt: ClickParam) => {
    const { sortBySelected } = this.props
    const { key } = evt

    sortBySelected(key)
  }

  toggleFilter = (evt: React.MouseEvent<HTMLImageElement>) => {
    const { currentTarget: { id } } = evt
    const stateValue = this.state[`show${id}Filters`]

    this.setState({ [`show${id}Filters`]: !stateValue } as any)
  }

  handleSelect = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { setSelectedFilters } = this.props
    const { target: { name, value } } = evt

    const noSpacesValue = value.replace(/\s/g, '')
    const filterObject = {
      type: `${noSpacesValue}Filters`,
      name
    }
    setSelectedFilters(filterObject)
  }
}

const mapStateToProps = ({ productCatalog }: ReducersObject) =>
  productCatalog.toJS()

const ProductCatalogEnhance = compose(
  injectIntl,
  graphql<Data>(GetFiltersQuery, {}),
  connect(mapStateToProps, { ...productCatalogActions, openQuickViewAction })
)(ProductCatalog)

export default ProductCatalogEnhance
