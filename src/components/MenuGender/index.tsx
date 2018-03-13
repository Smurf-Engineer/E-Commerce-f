/**
 * MenuGender Component - Created by david on 09/02/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import * as menuGenderActions from './actions'
import { ReducersObject } from '../../store/rootReducer'
import FilterList from '../FilterList'
import SeeAllButton from '../SeeAllButton'
import ProductList from '../ProductHorizontalList'
import { Container, Filters, Categories, Divider } from './styledComponents'
import { Filter } from '../../types/common'

interface Props {
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
  categories?: Filter[]
  visible: boolean
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
      categories = []
    } = this.props

    if (!visible) {
      return null
    }

    return (
      <Container>
        <Filters>
          <FilterList
            filters={sports}
            filterSelected={sportSelected}
            onHoverFilter={this.handleOnHoverFilter}
          />
          <SeeAllButton onClick={this.handleOnPressSeeAll} />
        </Filters>
        <Divider type="vertical" />
        <Categories>
          <FilterList
            onHoverFilter={this.handleOnHoverCategory}
            filters={categories}
            filterSelected={categorySelected}
          />
        </Categories>
        <Divider type="vertical" />
        <ProductList
          {...{ onPressCustomize, onPressQuickView }}
          genderFilter={genders[type]}
          sportFilter={sports[sportSelected]}
          category={categories[categorySelected]}
          onPressSeeAll={this.handleOnPressSeeAll}
        />
      </Container>
    )
  }
}

const mapStateToProps = ({ menuGender }: ReducersObject) => menuGender.toJS()

const MenuGenderEnhance = compose(
  connect(mapStateToProps, { ...menuGenderActions })
)(MenuGender)

export default MenuGenderEnhance
