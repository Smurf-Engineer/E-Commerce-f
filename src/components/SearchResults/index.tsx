/**
 * SearchResults Component - Created by cazarez on 14/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import AnimateHeight from 'react-animate-height'
import CloseIcon from '../../assets/cancel-button.svg'
import { QueryProps, Product } from '../../types/common'
import { searchResultsQuery } from './data'
import {
  Container,
  Text,
  TitleContainer,
  CloseImg,
  Results
} from './styledComponents'
import ProductThumbnail from '../ProductThumbnail'

interface Data extends QueryProps {
  productSearch: [Product]
}

interface Props {
  data?: Data
  searchParam: string
  showResults: boolean
  closeResults: () => void
  history: any
}

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

class SearchResults extends React.Component<Props, {}> {
  render() {
    console.log('SEARRRRRCH ', this.props.data)
    const { searchParam, showResults, closeResults } = this.props
    const list = products.map((product, key) => (
      <ProductThumbnail onPressCustomize={this.press} {...{ product, key }} />
    ))
    return (
      <AnimateHeight duration={500} height={showResults ? 'auto' : 0}>
        <Container>
          <TitleContainer>
            <Text>{`We Found ${
              products.length
            } Items with "${searchParam}"`}</Text>
            <CloseImg src={CloseIcon} alt="close" onClick={closeResults} />
          </TitleContainer>
          <Results>{list}</Results>
        </Container>
      </AnimateHeight>
    )
  }
  press = () => {
    const { history } = this.props
    history.push('designer')
  }
}

type OwnProps = {
  searchParam?: string
}

const searchEnhance = compose(
  graphql<Data>(searchResultsQuery, {
    options: ({ searchParam }: OwnProps) => ({
      variables: { search: searchParam }
    })
  })
)(SearchResults)
export default searchEnhance
