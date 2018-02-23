/**
 * ImagesGrid Component - Created by gustavomedina on 22/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { QueryProps, HomePageBatch } from '../../types/common'
import {
  Container,
  Text,
  DetailsContent,
  TestimonialsContent
} from './styledComponents'
import { productsHomeQuery } from './data'

interface Data extends QueryProps {
  productsHome: HomePageBatch[]
}

interface Props {
  data: Data
}

export class ImagesGrid extends React.Component<Props, {}> {
  static defaultProps: Data
  render() {
    const { data: { productsHome, loading, error } } = this.props

    let totalProducst = 0
    let socialImages: string = ''
    let reviews: string = ''

    if (!loading && productsHome) {
      socialImages =
        productsHome && productsHome[1] ? productsHome[1].result : ''
      reviews = productsHome && productsHome[2] ? productsHome[2].result : ''
    }

    return (
      <Container>
        <DetailsContent
          dangerouslySetInnerHTML={{
            __html: `
            <div class="yotpo yotpo-pictures-gallery">
            </div>`
          }}
        />
        <TestimonialsContent
          dangerouslySetInnerHTML={{
            __html: `
            <div class="yotpo yotpo-reviews-carousel">
            </div>`
          }}
        />
      </Container>
    )
  }
}

const productsEnhance = compose(
  graphql<Data>(productsHomeQuery, {
    options: () => ({
      fetchPolicy: 'network-only',
      variables: {}
    })
  })
)(ImagesGrid)
export default productsEnhance
