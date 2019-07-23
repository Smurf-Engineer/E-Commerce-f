/**
 * SecondaryHeader Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import {
  Container,
  ButtonContainer,
  Title,
  UploadersContainer
} from './styledComponents'
import Uploader from './Uploader'
import messages from './messages'
import AddMoreButton from '../../Button'

interface Props {
  loading: any
  saving: boolean
  secondaryHeader: any
  formatMessage: (messageDescriptor: any) => string
  onUploadFile: (
    file: any,
    section: string,
    imageType: string,
    index: number
  ) => void
  setUrl: (value: string, index: number) => void
  onSaveHeader: () => void
  removeImage: (index: number) => void
  handleAddMoreImages: () => void
}

class SecondaryHeader extends React.Component<Props, {}> {
  render() {
    const {
      secondaryHeader,
      loading,
      formatMessage,
      onSaveHeader,
      saving,
      onUploadFile,
      setUrl,
      removeImage,
      handleAddMoreImages
    } = this.props

    const uploadItems = secondaryHeader.map((item: any, index: number) => (
      <Uploader
        key={index}
        {...{
          item,
          formatMessage,
          index,
          loading: loading[index],
          onUploadFile,
          setUrl,
          removeImage
        }}
      />
    ))
    return (
      <Container>
        <Title>{formatMessage(messages.mainHeaderTitle)}</Title>
        <AddMoreButton
          label={formatMessage(messages.addMoreImagesLabel)}
          onClick={handleAddMoreImages}
        />
        <UploadersContainer>{uploadItems}</UploadersContainer>
        <ButtonContainer>
          <Button loading={saving} onClick={onSaveHeader}>
            {formatMessage(messages.saveChanges)}
          </Button>
        </ButtonContainer>
        <Divider />
      </Container>
    )
  }
}

export default SecondaryHeader