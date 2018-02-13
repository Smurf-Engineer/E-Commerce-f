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
import { Product } from '../../types/common'

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

const filters = [
  { id: '0', label: 'Tops' },
  { id: '1', label: 'Shorts' },
  { id: '2', label: 'MTB' },
  { id: '3', label: 'Skin suits' },
  { id: '4', label: 'Outerwear tops' },
  { id: '5', label: 'Outerwear bottoms' },
  { id: '6', label: 'Accesories' }
]

interface Props {
  type: string
  onPressSeeAll: (type: string) => void
  onPressCustomize: (id: string) => void
  setCategoryAction: (sport: number) => void
  categorySelected: number
}

export class MenuSports extends React.PureComponent<Props, {}> {
  handleOnHoverCategory = (categorySelected: number, id: string) => {
    const { setCategoryAction } = this.props
    setCategoryAction(categorySelected)
  }

  handleOnPressSeeAll = () => {
    const { onPressSeeAll, type } = this.props
    onPressSeeAll(type)
  }

  render() {
    const { onPressCustomize, categorySelected } = this.props
    return (
      <Container>
        <Filters>
          <FilterList
            {...{ filters }}
            filterSelected={categorySelected}
            onHoverFilter={this.handleOnHoverCategory}
          />
          <SeeAllButton onClick={this.handleOnPressSeeAll} />
        </Filters>
        <Divider type="vertical" />
        <ProductList
          {...{ products, onPressCustomize }}
          width={'80%'}
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
