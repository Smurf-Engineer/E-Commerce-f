/**
 * Tiles Component - Created by eduardoquintero on 13/06/19.
 */
import * as React from 'react'
import {
  Container,
  ScreenTitle,
  UploadersContainer,
  ButtonContainer
} from './styledComponents'
import Button from 'antd/lib/button'
import Uploader from './Uploader'
import messages from './messages'
import { ProductTiles } from '../../../types/common'

interface Props {
  productTiles: ProductTiles[]
  saving: boolean
  formatMessage: (messageDescriptor: any) => string
  onUploadFile: (file: any, index: number) => void
  onSave: () => void
  onChangeText: (index: number, section: string, value: string) => void
  removeImage: (index: number) => void
}

class Tiles extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      productTiles,
      onUploadFile,
      saving,
      onSave,
      onChangeText,
      removeImage
    } = this.props

    const uploadItems = productTiles.map(
      (item: ProductTiles, index: number) => (
        <Uploader
          key={index}
          {...{
            item,
            formatMessage,
            index,
            loading: null,
            onChangeText,
            onUploadFile,
            removeImage
          }}
        />
      )
    )

    return (
      <Container>
        <ScreenTitle>{formatMessage(messages.title)}</ScreenTitle>
        <UploadersContainer>{uploadItems}</UploadersContainer>
        <ButtonContainer>
          <Button loading={saving} onClick={onSave}>
            {formatMessage(messages.saveChanges)}
          </Button>
        </ButtonContainer>
      </Container>
    )
  }
}

export default Tiles
