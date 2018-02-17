/**
 * SearchResults Component - Created by cazarez on 14/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import AnimateHeight from 'react-animate-height'
import Spinner from 'antd/lib/spin'
import CloseIcon from '../../assets/cancel-button.svg'
import { QueryProps, Product } from '../../types/common'
import { searchResultsQuery } from './data'
import {
  Container,
  Text,
  TitleContainer,
  CloseImg,
  Results,
  EmptySearch
} from './styledComponents'
import ProductThumbnail from '../ProductThumbnail'

interface Data extends QueryProps {
  productSearch: Product[]
}

interface Props {
  data: Data
  searchParam: string
  showResults: boolean
  closeResults: () => void
  openResults: () => void
  history: any
}

export class SearchResults extends React.Component<Props, {}> {
  static defaultProps: Data
  render() {
    const {
      searchParam,
      showResults,
      closeResults,
      openResults,
      data: { productSearch, loading, error }
    } = this.props
    let list: JSX.Element[] = []
    let totalProducst = 0

    if (!loading && productSearch) {
      totalProducst = productSearch.length
      list = productSearch.map((product, key) => {
        return (
          <ProductThumbnail
            key={key}
            onPressCustomize={this.press}
            id={product.id}
            description={product.description}
            collections={product.collections}
            images={product.images}
            type={product.type}
            isTopProduct={product.isTopProduct}
          />
        )
      })
    }
    console.log(this.props.data)
    const renderResults = !error ? (
      <Results>{list}</Results>
    ) : (
      <EmptySearch>No hay resultados</EmptySearch>
    )

    return (
      <AnimateHeight duration={500} height={showResults ? 'auto' : 0}>
        <Container>
          <TitleContainer>
            <Text
            >{`We Found ${totalProducst} Items with "${searchParam}"`}</Text>
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
      fetchPolicy: 'network-only',
      variables: { search: searchParam }
    })
  })
)(SearchResults)
export default searchEnhance
