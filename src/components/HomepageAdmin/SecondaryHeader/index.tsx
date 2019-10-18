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
  UploadersContainer,
  Subtitle,
  SlideOptions,
  SlideTitle,
  OptionContainer,
  SlideOptionsContainer,
  ButtonWrapper,
  StyledButton
} from './styledComponents'
import { VIDEO_TYPE, IMAGE_TYPE } from '../constants'
import Select from 'antd/lib/select'
import Uploader from './Uploader'
import messages from './messages'
import Input from 'antd/lib/input'
import AddMoreButton from '../../Button'
import { CarouselSettings } from '../../../types/common'
import { animationTypes, Sections } from '../constants'
import { isNumberValue } from '../../../utils/utilsAddressValidation'
const { SECONDARY_HEADER } = Sections

interface Props {
  loading: any
  saving: boolean
  secondaryHeader: any
  carouselSettings: CarouselSettings
  formatMessage: (messageDescriptor: any) => string
  onUploadFile: (
    file: any,
    section: string,
    imageType: string,
    index: number
  ) => void
  setUrl: (value: string, index: number, section: string) => void
  onSaveHeader: () => void
  removeImage: (index: number, type: string) => void
  handleAddMoreImages: (itemType: string) => void
  openPreview: (section: string) => void
  onSetDuration: (section: string, duration: string) => void
  setTransition: (section: string, transition: string) => void
}

class SecondaryHeader extends React.Component<Props, {}> {
  handleAddImage = () => {
    const { handleAddMoreImages } = this.props
    handleAddMoreImages(IMAGE_TYPE)
  }
  handleAddVideo = () => {
    const { handleAddMoreImages } = this.props
    handleAddMoreImages(VIDEO_TYPE)
  }
  setDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onSetDuration } = this.props
    const {
      currentTarget: { value }
    } = event

    if (value && !isNumberValue(value)) {
      return
    }
    onSetDuration('secondaryHeaderCarousel', value)
  }
  setTransition = (transition: string) => {
    const { setTransition } = this.props
    setTransition('secondaryHeaderCarousel', transition)
  }
  handleOnPreview = () => {
    const { openPreview } = this.props
    openPreview(SECONDARY_HEADER)
  }
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
      carouselSettings: { transition, duration }
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
          onClick={this.handleAddImage}
        />
        <AddMoreButton
          label={formatMessage(messages.addVideo)}
          onClick={this.handleAddVideo}
        />
        <UploadersContainer>{uploadItems}</UploadersContainer>
        <SlideOptionsContainer>
          <Subtitle>{formatMessage(messages.sliderSettings)}</Subtitle>
          <SlideOptions>
            <OptionContainer>
              <SlideTitle>{formatMessage(messages.animationType)}</SlideTitle>
              <Select
                style={{ width: '100%' }}
                placeholder={formatMessage(messages.transition)}
                onChange={this.setTransition}
                value={transition}
              >
                {animationTypes.map(value => {
                  return (
                    <Option key={value}>
                      {formatMessage(messages[value])} 
                    </Option>
                  )
                })}
              </Select>
            </OptionContainer>
            <OptionContainer>
              <SlideTitle>{formatMessage(messages.duration)}</SlideTitle>
              <Input
                value={duration}
                onChange={this.setDuration}
                suffix={'MS'}
              />
            </OptionContainer>
            <OptionContainer>
              <ButtonWrapper disabled={!transition}>
                <StyledButton
                  disabled={!transition}
                  type="primary"
                  onClick={this.handleOnPreview}
                >
                  {formatMessage(messages.preview)}
                </StyledButton>
              </ButtonWrapper>
            </OptionContainer>
          </SlideOptions>
        </SlideOptionsContainer>
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
