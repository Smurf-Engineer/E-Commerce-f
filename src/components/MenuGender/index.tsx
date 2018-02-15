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
import {
  Container,
  Text,
  Filters,
  Categories,
  Divider
} from './styledComponents'
import { Product, Filter } from '../../types/common'

// TODO: Test data
const products: Product[] = [
  {
    id: '0',
    images: {
      front:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-01.png',
      back:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-18.png',
      left:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-10.png',
      right:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-27.png'
    },
    type: 'TOUR',
    description: 'SHORT SLEEVE JERSEY',
    priceRange: {
      from: 63,
      to: 119
    },
    collections: 5,
    isTopProduct: true
  },
  {
    id: '1',
    images: {
      front:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-01.png',
      back:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-18.png',
      left:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-10.png',
      right:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-27.png'
    },
    type: 'TOUR',
    description: 'SHORT SLEEVE JERSEY',
    priceRange: {
      from: 63,
      to: 119
    },
    collections: 5,
    isTopProduct: false
  },
  {
    id: '2',
    images: {
      front:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-01.png',
      back:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-18.png',
      left:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-10.png',
      right:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-27.png'
    },
    type: 'TOUR',
    description: 'SHORT SLEEVE JERSEY',
    priceRange: {
      from: 63,
      to: 119
    },
    collections: 5,
    isTopProduct: false
  },
  {
    id: '3',
    images: {
      front:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-01.png',
      back:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-18.png',
      left:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-10.png',
      right:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-27.png'
    },
    type: 'TOUR',
    description: 'SHORT SLEEVE JERSEY',
    priceRange: {
      from: 63,
      to: 119
    },
    collections: 5,
    isTopProduct: true
  },
  {
    id: '4',
    images: {
      front:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-01.png',
      back:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-18.png',
      left:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-10.png',
      right:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-27.png'
    },
    type: 'TOUR',
    description: 'SHORT SLEEVE JERSEY',
    priceRange: {
      from: 63,
      to: 119
    },
    collections: 5,
    isTopProduct: false
  },
  {
    id: '5',
    images: {
      front:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-01.png',
      back:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-18.png',
      left:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-10.png',
      right:
        'https://storage.googleapis.com/jakroo-storage/product-img-tour-27.png'
    },
    type: 'TOUR',
    description: 'SHORT SLEEVE JERSEY',
    priceRange: {
      from: 63,
      to: 119
    },
    collections: 5,
    isTopProduct: false
  }
]

interface Props {
  type: number
  onPressSeeAll: (type: number) => void
  onPressCustomize: (id: string) => void
  setSportAction: (sport: number) => void
  setCategoryAction: (category: number) => void
  sportSelected: number
  categorySelected: number
  sports: Filter[]
  categories: Filter[]
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
      onPressCustomize,
      sportSelected,
      categorySelected,
      sports,
      categories
    } = this.props
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
        {/* <ProductList
          {...{ products, onPressCustomize,  }}
          onPressSeeAll={this.handleOnPressSeeAll}
        /> */}
      </Container>
    )
  }
}

const mapStateToProps = ({ menuGender }: ReducersObject) => menuGender.toJS()

const MenuGenderEnhance = compose(
  connect(mapStateToProps, { ...menuGenderActions })
)(MenuGender)

export default MenuGenderEnhance
