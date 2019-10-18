/**
 * MainHeader Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import Divider from 'antd/lib/divider'
import Uploader from './Uploader'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import AddMoreButton from '../../Button'
import Select from 'antd/lib/select'
import {
  Container,
  UploadersContainer,
  Title,
  ButtonContainer,
  Subtitle,
  SlideOptions,
  SlideTitle,
  OptionContainer,
  SlideOptionsContainer,
  ButtonWrapper,
  StyledButton
} from './styledComponents'
import messages from './messages'
import { VIDEO_TYPE, IMAGE_TYPE } from '../constants'
import { isNumberValue } from '../../../utils/utilsAddressValidation'
import { CarouselSettings } from '../../../types/common'

const animationTypes = ['slide', 'fade']

const Option = Select.Option
interface Props {
  desktopImage: string
  mainHeader: any
  loading: any
  saving: boolean
  carouselSettings: CarouselSettings
  formatMessage: (messageDescriptor: any) => string
  onUploadFile: (file: any, section: string, imageType: string) => void
  setUrl: (value: string, index: number, section: string) => void
  onSaveHeader: () => void
  handleAddMoreImages: (itemType: string) => void
  removeImage: (index: number, type: string) => void
  openPreview: () => void
  onSetDuration: (section: string, duration: string) => void
  setTransition: (section: string, transition: string) => void
}

class MainHeader extends React.Component<Props, {}> {
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
    onSetDuration('mainHeaderCarousel', value)
  }
  setTransition = (transition: string) => {
    const { setTransition } = this.props
    setTransition('mainHeaderCarousel', transition)
  }
  render() {
    const {
      mainHeader,
      loading,
      formatMessage,
      saving,
      onSaveHeader,
      removeImage,
      setUrl,
      onUploadFile,
      openPreview,
      carouselSettings: { transition, duration }
    } = this.props

    const uploadItems = mainHeader.map((item: any, index: number) => (
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
          label={formatMessage(messages.addImage)}
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
                  onClick={openPreview}
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

export default MainHeader
