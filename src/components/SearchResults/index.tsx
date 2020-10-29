/**
 * SearchResults Component - Created by cazarez on 14/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import AnimateHeight from 'react-animate-height'
import CloseIcon from '../../assets/cancel-button.svg'
import { QueryProps, Product, IProfileSettings, User } from '../../types/common'
import { profileSettingsQuery, searchResultsQuery } from './data'
import {
  Container,
  Text,
  TitleContainer,
  CloseImg,
  Results,
  ResultDiv
} from './styledComponents'
import messages from './messages'
import ProductThumbnail from '../ProductThumbnail'
import get from 'lodash/get'
import { APPROVED } from '../../constants'

interface Data extends QueryProps {
  productSearch: Product[]
}

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
}

interface Props {
  data: Data
  searchParam: string
  profileData: ProfileData
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
      profileData,
      quickViewAction,
      currentCurrency,
      data: { productSearch, loading }
    } = this.props

    // TODO: REMOVE IT LATER
    if (this.props.data && this.props.data.error) {
      return <div>ERROR</div>
    }

    let list: JSX.Element[] = []
    let totalProducts = 0
    const reseller = get(profileData, 'profileData.reseller', {})
    const { status, inline = 0, comission = 0 } = reseller || {}
    const isReseller = status === APPROVED
    if (!loading && productSearch) {
      totalProducts = productSearch.length
      list = productSearch.map((productData, key) => {
        let product = productData
        if (isReseller) {
          const originalPriceRange = get(productData, 'priceRange', [])
          const comissionToApply = product.customizable ? comission : inline
          const purchasePrices = originalPriceRange.map((priceItem) => {
            const price = (priceItem.price * (1 - (comissionToApply / 100))).toFixed(2)
            return { ...priceItem, price }
          })
          product = { ...product, priceRange: purchasePrices }
        }
        const {
          id,
          yotpoId,
          description,
          type,
          isTopProduct,
          customizable,
          priceRange,
          colors,
          images
        } = product
        // TODO: filter by gender
        const productImages = !!images ? images[0] : {}
        return (
          <ResultDiv {...{ key }}>
            <ProductThumbnail
              {...{
                id,
                yotpoId,
                description,
                type,
                isTopProduct,
                currentCurrency,
                customizable,
                colors,
                priceRange
              }}
              onPressCustomize={this.gotoCustomize}
              onPressThumbnail={closeResults}
              images={productImages}
              product={product}
              onPressQuickView={quickViewAction}
              customizableLabel={
                <FormattedMessage {...messages.customizable} />
              }
              labelButton={
                customizable ? (
                  <FormattedMessage {...messages.customizeLabel} />
                ) : (
                    <FormattedMessage {...messages.fullDetailsLabel} />
                  )
              }
            />
          </ResultDiv>
        )
      })
    }

    return (
      <AnimateHeight duration={500} height={showResults ? 'auto' : 0}>
        <Container>
          <TitleContainer>
            <Text>{`We Found ${totalProducts} Items with "${searchParam}"`}</Text>
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
  user?: User
}

const searchEnhance = compose(
  graphql(profileSettingsQuery, {
    options: ({ user }: OwnProps) => ({
      fetchPolicy: 'network-only',
      skip: !user
    }),
    name: 'profileData',
  }),
  graphql<Data>(searchResultsQuery, {
    options: ({ searchParam }: OwnProps) => ({
      fetchPolicy: 'network-only',
      variables: { search: searchParam }
    })
  })
)(SearchResults)
export default searchEnhance
