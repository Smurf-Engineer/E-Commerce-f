/**
 * MenuGender Component - Created by david on 09/02/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
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

interface Data extends QueryProps {
  categories: Filter[]
}

interface Props {
  data: Data
  type: number
  onPressSeeAll: (type: number) => void
  onPressCustomize: (id: number) => void
  onPressQuickView: (id: number) => void
  setSportAction: (sport: number) => void
  setCategoryAction: (category: number) => void
  sportSelected: number
  categorySelected: number
  genders?: Filter[]
  sports?: Filter[]
  visible: boolean
  formatMessage: (messageDescriptor: any) => string
}

export class MenuGender extends React.PureComponent<Props, {}> {
  handleOnHoverFilter = (filterSelected: number, id: number) => {
    const { setSportAction } = this.props
    setSportAction(filterSelected)
  }

  handleOnHoverCategory = (categorySelected: number, id: number) => {
    const { setCategoryAction } = this.props
    setCategoryAction(categorySelected)
  }

  handleOnPressSeeAll = () => {
    const { onPressSeeAll, type } = this.props
    onPressSeeAll(type)
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
          <SeeAllButton
            withFilterWord={true}
            onClick={this.handleOnPressSeeAll}
            {...{ formatMessage }}
          />
        </Filters>
        <Divider type="vertical" />
        {categoriesContent}
        <Divider type="vertical" />
        {loading ? null : (
          <ProductList
            {...{
              onPressCustomize,
              onPressQuickView,
              genderFilter,
              sportFilter,
              categoryFilter,
              formatMessage
            }}
            onPressSeeAll={this.handleOnPressSeeAll}
          />
        )}
      </Container>
    )
  }
}

type OwnProps = {
  sportSelected?: number
  sports?: Filter[]
  genders?: Filter[]
  type?: number
}

const mapStateToProps = (state: any) => state.get('menuGender').toJS()

const MenuGenderEnhance = compose(
  graphql<Data>(categoriesQuery, {
    options: ({
      sportSelected,
      sports,
      genders,
      type: genderSelected
    }: OwnProps) => {
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
