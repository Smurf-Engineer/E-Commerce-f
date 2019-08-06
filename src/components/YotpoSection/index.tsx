/**
 * AboutUs Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  Container,
  Separator,
  TitleName,
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
import { ProductFile, Product } from '../../types/common'
import { getFileExtension } from '../../utils/utilsFiles'
import { RelatedProducts } from '../RelatedProducts'
import { MP4_EXTENSION } from '../../constants'
import { History } from 'history'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  yotpoId: string
  mediaFiles: ProductFile[]
  products: Product[]
  name: string
  history: History
  currentCurrency: string
  moreTag?: string
}
const YotpoSection = ({
  yotpoId,
  mediaFiles,
  products,
  moreTag,
  name,
  history,
  formatMessage,
  currentCurrency
}: Props) => {
  return (
    <Container>
      <YotpoReviews {...{ yotpoId }}>
        {mediaFiles && !!mediaFiles.length && (
          <div>
            <Separator>
              <TitleName>{name}</TitleName>
              <FormattedMessage {...messages.featured} />
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
              title={`${formatMessage(messages.more)} ${moreTag}`}
              currentCurrency={currentCurrency || config.defaultCurrency}
              {...{ products, history, formatMessage }}
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

export default YotpoSection
