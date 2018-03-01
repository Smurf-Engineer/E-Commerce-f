/**
 * ProductCatalog Screen - Created by cazarez on 27/02/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import UpperCase from 'lodash/upperCase'
import { ReducersObject } from '../../store/rootReducer'
import Layout from '../../components/MainLayout'
import Filter from '../../components/ProductCatalogFilterComponent'
import * as productCatalogActions from './actions'
import messages from './messages'
import {
  Container,
  Text,
  FiltersColumn,
  FiltersTitle,
  ResultsColumn
} from './styledComponents'
import { QueryProps, Product } from '../../types/common'
import { GetProductsQuery } from './data'

interface FilterOptions {
  name: string
  selected: boolean
}
interface Filter {
  index: number
  id: string
  name: string
  options: FilterOptions[]
}
interface Data extends QueryProps {
  product: Product[]
}

interface StateProps {
  showTypeFilters: boolean
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  filtersArray: Filter[]
  selectedFilterAction: (filter: {}) => void
}

export class ProductCatalog extends React.Component<Props, StateProps> {
  state = {
    showTypeFilters: false
  }
  render() {
    const { history, intl, filtersArray } = this.props

    const filters = filtersArray.map((filter: Filter, index: number) => {
      const filterToShow = this.state[`show${filter.name}Filters`]
      return (
        <Filter
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
        <Container>
          <FiltersColumn>
            <FiltersTitle>
              <FormattedMessage {...messages.filtersTitle} />
            </FiltersTitle>
            {filters}
          </FiltersColumn>
          <ResultsColumn>product List</ResultsColumn>
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
    const { selectedFilterAction } = this.props
    const { target: { name, value, checked } } = evt
    console.log(evt.target)
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
  connect(mapStateToProps, { ...productCatalogActions })
)(ProductCatalog)

export default ProductCatalogEnhance
