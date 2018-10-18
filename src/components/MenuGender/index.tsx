/**
 * MenuGender Component - Created by david on 09/02/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import * as menuGenderActions from './actions'
import FilterList from '../FilterList'
import SeeAllButton from '../SeeAllButton'
import ProductList from '../ProductHorizontalList'
import {
  Container,
  Filters,
  Categories,
  Divider,
  LoadingContainer
} from './styledComponents'
import { Filter, QueryProps } from '../../types/common'
import { categoriesQuery } from './data'
import Spin from 'antd/lib/spin'

const MEN_GENDER = 'men'
const WOMEN_GENDER = 'women'

interface Data extends QueryProps {
  categories: Filter[]
}

interface Props extends RouteComponentProps<any> {
  data: Data
  type: number
  history: any
  onPressSeeAll: (type: number, category: string, sport: string) => void
  onPressCustomize: (id: number) => void
  onPressQuickView: (id: number, yotpoId: string, gender: number) => void
  onPressThumbnail: (visible: boolean, index: number) => void
  setSportAction: (sport: number) => void
  setCategoryAction: (category: number) => void
  sportSelected: number
  categorySelected: number
  genders: Filter[]
  sports: Filter[]
  visible: boolean
  currentCurrency: string
  formatMessage: (messageDescriptor: any) => string
}

export class MenuGender extends React.Component<Props, {}> {
  handleOnHoverFilter = (filterSelected: number, id: number) => {
    const { setSportAction } = this.props
    setSportAction(filterSelected)
  }

  handleOnHoverCategory = (categorySelected: number, id: number) => {
    const { setCategoryAction } = this.props
    setCategoryAction(categorySelected)
  }

  onPressSeeAllFilters = () => {
    const { history, type } = this.props
    history.push(
      `/product-catalogue?gender=${type === 0 ? MEN_GENDER : WOMEN_GENDER}`
    )
  }

  onSeeAll = () => {
    const {
      onPressSeeAll,
      data: { categories },
      sports,
      type,
      categorySelected,
      sportSelected
    } = this.props

    onPressSeeAll(
      type,
      categories[categorySelected].name,
      sports[sportSelected].name
    )
  }

  onPressThumbnail = () => {
    const { visible, type, onPressThumbnail } = this.props
    onPressThumbnail(!visible, type)
  }

  getFilter = (array: any[], index: number) =>
    array && array.length && array[index]

  render() {
    const {
      type,
      visible,
      onPressCustomize,
      onPressQuickView,
      sportSelected,
      categorySelected,
      genders = [],
      sports = [],
      formatMessage,
      currentCurrency,
      data: { categories, loading }
    } = this.props

    if (!visible) {
      return null
    }

    const categoriesContent = loading ? (
      <LoadingContainer>
        <Spin />
      </LoadingContainer>
    ) : (
      <Categories>
        <FilterList
          onHoverFilter={this.handleOnHoverCategory}
          filters={categories}
          filterSelected={categorySelected}
        />
      </Categories>
    )

    const categoryFilter = this.getFilter(categories, categorySelected)
    const sportFilter = this.getFilter(sports, sportSelected)
    const genderFilter = this.getFilter(genders, type)

    return (
      <Container>
        <Filters>
          <FilterList
            filters={sports}
            filterSelected={sportSelected}
            onHoverFilter={this.handleOnHoverFilter}
          />
          {loading || (categories && !categories.length) ? null : (
            <SeeAllButton
              withFilterWord={true}
              onClick={this.onPressSeeAllFilters}
              {...{ formatMessage }}
            />
          )}
        </Filters>
        <Divider type="vertical" />
        {categoriesContent}
        <Divider type="vertical" />
        {loading || (categories && !categories.length) ? null : (
          <ProductList
            {...{
              onPressCustomize,
              onPressQuickView,
              genderFilter,
              sportFilter,
              categoryFilter,
              formatMessage,
              currentCurrency
            }}
            onPressThumbnail={this.onPressThumbnail}
            onPressSeeAll={this.onSeeAll}
          />
        )}
      </Container>
    )
  }
}

// TODO: REFACTOR TYPE
// type OwnProps = {
//   sportSelected?: number
//   sports?: Filter[]
//   genders?: Filter[]
//   type?: number
// }

const mapStateToProps = (state: any) => state.get('menuGender').toJS()

const MenuGenderEnhance = compose(
  graphql<Data>(categoriesQuery, {
    options: ({
      sportSelected,
      sports,
      genders,
      type: genderSelected
    }: any) => {
      // TODO: REFACTOR TYPE
      const sportId =
        sports !== undefined && sportSelected !== undefined
          ? sports[sportSelected].id
          : undefined
      const genderId =
        genders !== undefined && genderSelected !== undefined
          ? genders[genderSelected].id
          : undefined
      return {
        variables: {
          sportId: sportId !== undefined ? sportId : null,
          genderId: genderId !== undefined ? genderId : null
        }
      }
    }
  }),
  connect(
    mapStateToProps,
    { ...menuGenderActions }
  )
)(MenuGender)

export default MenuGenderEnhance
