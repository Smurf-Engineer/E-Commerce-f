/**
 * AboutUs Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  Container,
  Separator,
  SlideImageContainer,
  SlideVideo,
  SlideImage,
  ImageContainer,
  RelatedProductsContainer,
  SlideImageMobile
} from './styledComponents'
import messages from './messages'
import config from '../../config/index'
import YotpoReviews from '../YotpoReviews'
import { ProductFile, Product, QueryProps } from '../../types/common'
import { getFileExtension } from '../../utils/utilsFiles'
import { RelatedProducts } from '../RelatedProducts'
import { MP4_EXTENSION } from '../../constants'
import { History } from 'history'
import { compose, graphql } from 'react-apollo'
import { getRelatedProducts } from './data'
import { connect } from 'react-redux'
import get from 'lodash/get'

interface Data extends QueryProps {
  products: [Product]
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  yotpoId: string
  mediaFiles: ProductFile[]
  data: Data
  name: string
  dispatch: any
  history: History
  currentCurrency: string
  moreTag?: string
}
const YotpoSection = ({
  yotpoId,
  mediaFiles,
  data,
  moreTag,
  name,
  history,
  formatMessage,
  dispatch,
  currentCurrency
}: Props) => {
  const products = get(data, 'products', [])
  return (
    <Container>
      <YotpoReviews {...{ yotpoId, name }}>
        {mediaFiles && !!mediaFiles.length && (
          <div>
            <Separator>
              <FormattedMessage {...messages.features} values={{ name }} />
            </Separator>
            {mediaFiles.map(image => (
              <SlideImageContainer>
                {getFileExtension(image.url) === MP4_EXTENSION ? (
                  <SlideVideo controls={true}>
                    <source src={image.url} type="video/mp4" />
                  </SlideVideo>
                ) : (
                  <ImageContainer>
                    <SlideImage src={image.url} />
                    <SlideImageMobile src={image.urlMobile} />
                  </ImageContainer>
                )}
              </SlideImageContainer>
            ))}
          </div>
        )}
        {!!products.length && (
          <RelatedProductsContainer>
            <RelatedProducts
              products={data.products}
              title={`${formatMessage(messages.more)} ${moreTag}`}
              currentCurrency={currentCurrency || config.defaultCurrency}
              {...{ history, formatMessage, dispatch }}
            />
          </RelatedProductsContainer>
        )}
        <Separator>
          <FormattedMessage {...messages.customerReview} />
        </Separator>
      </YotpoReviews>
    </Container>
  )
}

type OwnProps = {
  productId?: number
  relatedItemTag?: string
}

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const YotpoSectionEnhance = compose(
  graphql<Data>(getRelatedProducts, {
    options: ({ productId, relatedItemTag }: OwnProps) => ({
      variables: {
        productId,
        relatedItemTag
      },
      skip: !productId || !relatedItemTag
    })
  }),
  connect(mapDispatchToProps)
)(YotpoSection)

export default YotpoSectionEnhance
