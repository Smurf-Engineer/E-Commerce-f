/**
 * SearchResults Component - Created by cazarez on 14/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
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
import messages from './messages'
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
  quickViewAction: () => void
  history: any
  currentCurrency: string
}

export class SearchResults extends React.Component<Props, {}> {
  static defaultProps: Data

  componentWillUnmount() {
    const { closeResults } = this.props
    closeResults()
  }

  render() {
    const {
      searchParam,
      showResults,
      closeResults,
      quickViewAction,
      currentCurrency,
      data: { productSearch, loading }
    } = this.props

    let list: JSX.Element[] = []
    let totalProducst = 0

    if (!loading && productSearch) {
      totalProducst = productSearch.length
      list = productSearch.map((product, key) => {
        const {
          id,
          yotpoId,
          description,
          collections,
          type,
          isTopProduct,
          customizable
        } = product
        // TODO: filter by gender
        const productImages = product.images ? product.images[0] : {}
        return (
          <ProductThumbnail
            {...{ currentCurrency, customizable }}
            key={key}
            onPressCustomize={this.gotoCustomize}
            id={id}
            yotpoId={yotpoId}
            description={description}
            collections={collections}
            images={productImages}
            type={type}
            isTopProduct={isTopProduct}
            onPressQuickView={quickViewAction}
            labelButton={
              customizable ? (
                <FormattedMessage {...messages.customizeLabel} />
              ) : (
                <FormattedMessage {...messages.fullDetailsLabel} />
              )
            }
          />
        )
      })
    }

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
  gotoCustomize = (id: string) => {
    const { history } = this.props
    history.push(`/design-center?id=${id}`)
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
