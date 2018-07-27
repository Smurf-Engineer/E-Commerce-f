/**
 * ImagesList Component - Created by miguelcanobbio on 25/07/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { imagesQuery } from './data'
import messages from './messages'
import { Container, EmptyMessage, EmptyContainer } from './styledComponents'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { QueryProps, ImageFile } from '../../../types/common'
import ImageItem from '../ImageItem'

interface Data extends QueryProps {
  images: ImageFile[]
}

interface Props {
  data: Data
  formatMessage: (messageDescriptor: any) => string
  onClickDelete: (id: number) => void
}

const ImagesList = ({
  data: { images },
  formatMessage,
  onClickDelete
}: Props) => {
  if (images && !images.length) {
    return (
      <EmptyContainer>
        <EmptyMessage>{formatMessage(messages.emptyImages)}</EmptyMessage>
      </EmptyContainer>
    )
  }
  const list = images.map((image, index) => (
    <ImageItem key={index} {...{ image, formatMessage, onClickDelete }} />
  ))
  return <Container>{list}</Container>
}

const ImagesListEnhance = compose(
  graphql(imagesQuery),
  withError,
  withLoading
)(ImagesList)

export default ImagesListEnhance
