/**
 * MenuSports Component - Created by david on 13/02/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import * as menuSportActions from './actions'
import { Container, Divider, Filters } from './styledComponents'
import FilterList from '../FilterList'
import SeeAllButton from '../SeeAllButton'
import ProductList from '../ProductHorizontalList'
import { Filter } from '../../types/common'

interface Props {
  type: number
  onPressSeeAll: (type: number) => void
  onPressCustomize: (id: number) => void
  onPressQuickView: (id: number) => void
  setCategoryAction: (sport: number) => void
  categorySelected: number
  sports: Filter[]
  categories: Filter[]
  visible: boolean
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
      categories,
      sports
    } = this.props

    if (!visible) {
      return null
    }

    return (
      <Container>
        <Filters>
          <FilterList
            filters={categories}
            filterSelected={categorySelected}
            onHoverFilter={this.handleOnHoverCategory}
          />
          <SeeAllButton onClick={this.handleOnPressSeeAll} />
        </Filters>
        <Divider type="vertical" />
        <ProductList
          {...{ onPressCustomize, onPressQuickView }}
          width={'80%'}
          sportFilter={sports && sports[type]}
          category={categories && categories[categorySelected]}
          onPressSeeAll={this.handleOnPressSeeAll}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('menuSports').toJS()

const MenuGenderEnhance = compose(
  connect(mapStateToProps, { ...menuSportActions })
)(MenuSports)

export default MenuGenderEnhance
