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
  onPressSeeAll: (type: number) => void
  onPressCustomize: (id: number) => void
  onPressQuickView: (id: number) => void
  setCategoryAction: (sport: number) => void
  categorySelected: number
  sports: Filter[]
  visible: boolean
  formatMessage: (messageDescriptor: any) => string
}

export class MenuSports extends React.PureComponent<Props, {}> {
  handleOnHoverCategory = (categorySelected: number) => {
    const { setCategoryAction } = this.props
    setCategoryAction(categorySelected)
  }

  handleOnPressSeeAll = () => {
    const { onPressSeeAll, type } = this.props
    onPressSeeAll(type)
  }

  render() {
    const {
      type,
      visible,
      onPressCustomize,
      onPressQuickView,
      categorySelected,
      sports,
      formatMessage,
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

    return (
      <Container>
        <Filters>
          <FilterList
            filters={categories}
            filterSelected={categorySelected}
            onHoverFilter={this.handleOnHoverCategory}
          />
          <SeeAllButton
            onClick={this.handleOnPressSeeAll}
            {...{ formatMessage }}
          />
        </Filters>
        <Divider type="vertical" />
        <ProductList
          {...{ onPressCustomize, onPressQuickView, formatMessage }}
          width={'80%'}
          sportFilter={sports && sports[type]}
          category={
            categories && categories.length && categories[categorySelected]
          }
          onPressSeeAll={this.handleOnPressSeeAll}
        />
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
      const sportId = (sports as Filter[])[type as number].id
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
