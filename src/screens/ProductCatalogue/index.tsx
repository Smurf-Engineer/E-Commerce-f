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
import { QueryProps, Product, Filter } from '../../types/common'
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
  genderFilters: FilterType[]
  setFilterAction: (filter: {}) => void
  openQuickViewAction: (index: number) => void
  setGenderFilters: (filter: object) => void
}

export class ProductCatalog extends React.Component<Props, StateProps> {
  state = {
    showTypeFilters: false,
    filters: []
  }
  componentDidMount() {}

  render() {
    const {
      history,
      intl,
      filtersArray,
      genderFilters,
      openQuickViewAction: openQuickView,
      data: { loading, filters: filtersGraph }
    } = this.props
    console.log('genderFilters ', genderFilters)
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

    const filters = filtersGraph.map((filter: FilterType, index: number) => {
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
    const { setFilterAction, genderFilters, setGenderFilters } = this.props
    const { filters } = this.state
    const { target: { name, value, checked, id } } = evt

    const filterObject = {
      type: name,
      filter: checked
    }
    console.log('CheCK ', name, value, id)
    setFilterAction(filterObject)
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
