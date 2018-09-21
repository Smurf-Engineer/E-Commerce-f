/**
 * MenuSports Component - Created by david on 13/02/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import * as menuSportActions from './actions'
import {
  Container,
  Divider,
  Filters,
  LoadingContainer
} from './styledComponents'
import FilterList from '../FilterList'
import SeeAllButton from '../SeeAllButton'
import ProductList from '../ProductHorizontalList'
import { Filter, QueryProps } from '../../types/common'
import { categoriesQuery } from './data'
import Spin from 'antd/lib/spin'

interface Data extends QueryProps {
  categories: Filter[]
}

interface Props {
  data: Data
  type: number
  history: any
  onPressSeeAll: (
    gender: number | undefined,
    category: string,
    sport: string
  ) => void
  onPressCustomize: (id: number) => void
  onPressQuickView: (id: number, yotpoId: string, gender: number) => void
  onPressThumbnail: (visible: boolean, index: number) => void
  setCategoryAction: (sport: number) => void
  categorySelected: number
  sports: Filter[]
  visible: boolean
  currentCurrency: string
  formatMessage: (messageDescriptor: any) => string
}

export class MenuSports extends React.PureComponent<Props, {}> {
  handleOnHoverCategory = (categorySelected: number) => {
    const { setCategoryAction } = this.props
    setCategoryAction(categorySelected)
  }

  onSeeAllFilters = () => {
    const { sports, type } = this.props
    window.location.replace(`/product-catalogue?sport=${sports[type].name}`)
  }

  onPressSeeAll = () => {
    const {
      data: { categories },
      sports,
      onPressSeeAll,
      type,
      categorySelected
    } = this.props
    onPressSeeAll(
      undefined,
      categories[categorySelected].name,
      sports[type].name
    )
  }

  onPressThumbnail = () => {
    const { visible, type, onPressThumbnail } = this.props
    onPressThumbnail(visible, type)
  }

  getFilter = (array: any[], index: number) =>
    array && array.length && array[index]

  render() {
    const {
      type,
      visible,
      onPressCustomize,
      onPressQuickView,
      categorySelected,
      sports,
      formatMessage,
      currentCurrency,
      data: { categories, loading }
    } = this.props

    if (!visible) {
      return null
    }

    if (loading) {
      return (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    }

    const sportFilter = this.getFilter(sports, type)
    const categoryFilter = this.getFilter(categories, categorySelected)

    return (
      <Container>
        <Filters>
          <FilterList
            filters={categories}
            filterSelected={categorySelected}
            onHoverFilter={this.handleOnHoverCategory}
          />
          {loading || (categories && !categories.length) ? null : (
            <SeeAllButton
              onClick={this.onSeeAllFilters}
              {...{ formatMessage }}
            />
          )}
        </Filters>
        <Divider type="vertical" />
        {loading || (categories && !categories.length) ? null : (
          <ProductList
            {...{
              sportFilter,
              categoryFilter,
              onPressCustomize,
              onPressQuickView,
              formatMessage,
              currentCurrency
            }}
            onPressThumbnail={this.onPressThumbnail}
            width={'80%'}
            onPressSeeAll={this.onPressSeeAll}
          />
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('menuSports').toJS()

type OwnProps = {
  type?: number
  sports?: Filter[]
}

const MenuGenderEnhance = compose(
  graphql<Data>(categoriesQuery, {
    options: ({ type, sports }: OwnProps) => {
      const sportId =
        sports !== undefined && type !== undefined ? sports[type].id : undefined
      return {
        variables: {
          sportId: sportId !== undefined ? sportId : null
        }
      }
    }
  }),
  connect(
    mapStateToProps,
    { ...menuSportActions }
  )
)(MenuSports)

export default MenuGenderEnhance
