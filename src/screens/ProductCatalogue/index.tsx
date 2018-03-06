/**
 * ProductCatalog Screen - Created by cazarez on 27/02/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import UpperCase from 'lodash/upperCase'
import Breadcrumb from 'antd/lib/breadcrumb'
import { ReducersObject } from '../../store/rootReducer'
import Layout from '../../components/MainLayout'
import FilterComponent from '../../components/ProductCatalogFilterComponent'
import ProductsThumbnailList from '../../components/ProductCatalogueThumbnailsList'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import * as productCatalogActions from './actions'
import messages from './messages'
import {
  Container,
  Text,
  FiltersColumn,
  FiltersTitle,
  ResultsColumn,
  StyledBreadcrumb
} from './styledComponents'
import { QueryProps, Product } from '../../types/common'
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
  filtersArray: FilterType[]
  data: Data
  selectedFilters: FilterType[]
  selectedFilterAction: (filter: {}) => void
  openQuickViewAction: (index: number) => void
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
      filtersArray,
      openQuickViewAction: openQuickView,
      data: { loading, filters: filtersGraph },
      selectedFilters
    } = this.props
    console.log(this.props)
    if (loading) {
      return null
    }

    const breadCrumb = (
      <StyledBreadcrumb>
        <Breadcrumb.Item>Men</Breadcrumb.Item>
        <Breadcrumb.Item>Cycling</Breadcrumb.Item>
        <Breadcrumb.Item>Tops</Breadcrumb.Item>
      </StyledBreadcrumb>
    )

    // const filters = filtersArray.map((filter: FilterType, index: number) => {
    const filters = filtersGraph.map((filter: FilterType, index: number) => {
      const filterToShow = this.state[`show${filter.name}Filters`]
      return (
        <FilterComponent
          key={index}
          id={filter.name}
          title={UpperCase(filter.name)}
          options={filter.options}
          showOptions={filterToShow}
          toggleOptions={this.toggleFilter}
          selectOption={this.handleSelect}
        />
      )
    })
    return (
      <Layout {...{ history, intl }}>
        {breadCrumb}
        <Container>
          <FiltersColumn>
            <FiltersTitle>
              <FormattedMessage {...messages.filtersTitle} />
            </FiltersTitle>
            {filters}
          </FiltersColumn>
          <ResultsColumn>
            <ProductsThumbnailList
              formatMessage={intl.formatMessage}
              {...{ openQuickView, history }}
            />
          </ResultsColumn>
        </Container>
      </Layout>
    )
  }

  toggleFilter = (evt: React.MouseEvent<HTMLImageElement>) => {
    const { currentTarget: { id } } = evt
    const stateValue = this.state[`show${id}Filters`]

    this.setState({ [`show${id}Filters`]: !stateValue } as any)
  }

  handleSelect = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { selectedFilterAction, selectedFilters } = this.props
    const { filters } = this.state
    const { target: { name, value, checked } } = evt

    const filter = {
      id: value,
      name,
      checked
    }

    selectedFilterAction(filter)
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
