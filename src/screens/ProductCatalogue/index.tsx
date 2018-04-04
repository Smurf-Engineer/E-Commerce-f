/**
 * ProductCatalog Screen - Created by cazarez on 27/02/18.
 */
import 'rc-drawer/assets/index.css'
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
import { ClickParam } from 'antd/lib/menu'
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
  seasonFilters: FilterType
  fitstyleFilters: FilterType
  temperatureFilters: FilterType
  orderBy: string
  limit: number
  skip: number
  currentPage: number
  fakeWidth: number
  openSidebar: boolean
  setFilterAction: (filter: {}) => void
  openQuickViewAction: (index: number) => void
  setSelectedFilters: (filter: object) => void
  sortBySelected: (sortBy: string) => void
  setSkipValue: (skip: number, page: number) => void
  openSidebarMobile: (open: boolean) => void
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
      sportFilters,
      categoryFilters,
      seasonFilters,
      orderBy,
      limit,
      skip,
      currentPage,
      fakeWidth,
      openSidebar,
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

    const sidebarFilters = (
      <div>
        <FiltersTitle showChildren={openSidebar}>
          {intl.formatMessage(messages.filtersTitle)}
        </FiltersTitle>
        {renderFilters}
      </div>
    )

    const sportOptions = get(filtersGraph, '0.options', [])
    const categoryOptions = get(filtersGraph, '1.options', [])
    const seasonOptions = get(filtersGraph, '2.options', [])

    const sportIndexes = this.getFilterIndexes(sportOptions, sportFilters)
    const categoryIndexes = this.getFilterIndexes(
      categoryOptions,
      categoryFilters
    )
    const seasonsIndexes = this.getFilterIndexes(seasonOptions, seasonFilters)

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
                        </FiltersTitle>
                        <ProductsThumbnailList
                          formatMessage={intl.formatMessage}
                          sportFilters={sportIndexes}
                          categoryFilters={categoryIndexes}
                          seasonFilters={seasonsIndexes}
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
                </Drawer>
              </div>
            )
          } else {
            return (
              <Layout {...{ history, intl }}>
                <Container>
                  <FiltersColumn>
                    <FiltersTitle
                      onClick={this.handleOpenSidebar}
                      showChildren={true}
                    >
                      {intl.formatMessage(messages.filtersTitle)}
                    </FiltersTitle>
                    {renderFilters}
                  </FiltersColumn>
                  <ResultsColumn>
                    <ProductsThumbnailList
                      formatMessage={intl.formatMessage}
                      sportFilters={sportIndexes}
                      categoryFilters={categoryIndexes}
                      seasonFilters={seasonsIndexes}
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

  handleOpenSidebar = () => {
    console.log('onopenchange')
    const { openSidebar, openSidebarMobile } = this.props
    openSidebarMobile(!openSidebar)
  }
}

const mapStateToProps = (state: any) => {
  const productCatalogue = state.get('productCatalog').toJS()
  const responsive = state.get('responsive').toJS()
  return { ...productCatalogue, ...responsive }
}

const ProductCatalogEnhance = compose(
  injectIntl,
  graphql<Data>(GetFiltersQuery, {}),
  connect(mapStateToProps, { ...productCatalogActions, openQuickViewAction })
)(ProductCatalog)

export default ProductCatalogEnhance
