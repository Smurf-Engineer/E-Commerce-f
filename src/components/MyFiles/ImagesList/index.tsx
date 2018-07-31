/**
 * ImagesList Component - Created by miguelcanobbio on 25/07/18.
 */
import * as React from 'react'
import messages from './messages'
import { Container, EmptyMessage, EmptyContainer } from './styledComponents'
import { ImageFile } from '../../../types/common'
import ImageItem from '../ImageItem'
import Spin from '../../../../node_modules/antd/lib/spin'

interface Props {
  images: ImageFile[]
  loading: boolean
  formatMessage: (messageDescriptor: any) => string
  onClickDelete: (id: number) => void
}

const ImagesList = ({
  images,
  formatMessage,
  onClickDelete,
  loading
}: Props) => {
  if (loading) {
    return (
      <EmptyContainer>
        <Spin />
      </EmptyContainer>
    )
  }
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

export default ImagesList
