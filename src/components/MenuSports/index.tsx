/**
 * MenuSports Component - Created by david on 13/02/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import * as menuSportActions from './actions'
import { ReducersObject } from '../../store/rootReducer'
import { Container, Divider, Filters } from './styledComponents'
import FilterList from '../FilterList'
import SeeAllButton from '../SeeAllButton'
import ProductList from '../ProductHorizontalList'
import { Filter } from '../../types/common'

interface Props {
  type: number
  onPressSeeAll: (type: number) => void
  onPressCustomize: (id: string) => void
  setCategoryAction: (sport: number) => void
  categorySelected: number
  sports: Filter[]
  categories: Filter[]
  visible: boolean
}

export class MenuSports extends React.PureComponent<Props, {}> {
  handleOnHoverCategory = (categorySelected: number) => {
    const { setCategoryAction, categories } = this.props
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
          {...{ onPressCustomize }}
          width={'80%'}
          sportFilter={sports[type]}
          category={categories[categorySelected]}
          onPressSeeAll={this.handleOnPressSeeAll}
        />
      </Container>
    )
  }
}

const mapStateToProps = ({ menuSports }: ReducersObject) => menuSports.toJS()

const MenuGenderEnhance = compose(
  connect(mapStateToProps, { ...menuSportActions })
)(MenuSports)

export default MenuGenderEnhance
