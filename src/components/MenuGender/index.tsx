/**
 * MenuGender Component - Created by david on 09/02/18.
 */
import * as React from 'react'
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
    isTopProduct: false
  }
]

const filters = [
  { id: '0', label: 'Cycling' },
  { id: '1', label: 'Triathalon' },
  { id: '2', label: 'Nordic' },
  { id: '3', label: 'Active' }
]

const categories = [
  { id: '0', label: 'Tops' },
  { id: '1', label: 'Shorts' },
  { id: '2', label: 'MTB' },
  { id: '3', label: 'Skin suits' },
  { id: '4', label: 'Outerwear tops' },
  { id: '5', label: 'Outerwear bottoms' },
  { id: '6', label: 'Accesories' }
]

interface Props {}

class MenuGender extends React.Component<Props, {}> {
  state = {
    filterSelected: '0',
    categorySelected: '0'
  }

  handleOnHoverFilter = (filterSelected: string) =>
    this.setState({ filterSelected })

  handleOnHoverCategory = (categorySelected: string) =>
    this.setState({ categorySelected })

  render() {
    const { filterSelected, categorySelected } = this.state
    return (
      <Container>
        <Filters>
          <FilterList
            onHoverFilter={this.handleOnHoverFilter}
            filters={filters}
            filterSelected={filterSelected}
          />
          <SeeAllButton />
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
        <ProductList {...{ products }} />
      </Container>
    )
  }
}

export default MenuGender
