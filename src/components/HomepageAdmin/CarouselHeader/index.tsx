/**
 * CarouselHeader Component - Created by eduardoquintero on 30/05/19.
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
import { animationTypes, CarouselSections, Sections } from '../constants'
import { HeaderImagePlaceHolder } from '../../../types/common'

const Option = Select.Option
interface Props {
  section: string
  desktopImage: string
  items: HeaderImagePlaceHolder[]
  loading: any
  saving: boolean
  carouselSettings: CarouselSettings
  formatMessage: (messageDescriptor: any) => string
  onUploadFile: (file: File, section: string, imageType: string) => void
  setUrl: (value: string, index: number, section: string) => void
  onSaveHeader: () => void
  handleAddMoreImages: (itemType: string, section: string) => void
  removeImage: (index: number, type: string, section: string) => void
  openPreview: (section: string) => void
  onSetDuration: (section: string, duration: string) => void
  setTransition: (section: string, transition: string) => void
}

class CarouselHeader extends React.Component<Props, {}> {
  handleAddImage = () => {
    const { handleAddMoreImages, section } = this.props
    handleAddMoreImages(IMAGE_TYPE, section)
  }
  handleAddVideo = () => {
    const { handleAddMoreImages, section } = this.props
    handleAddMoreImages(VIDEO_TYPE, section)
  }
  setDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onSetDuration, section } = this.props
    const carouselSection =
      section === Sections.MAIN_HEADER
        ? CarouselSections.MAIN_HEADER_CAROUSEL
        : CarouselSections.SECONDARY_HEADER_CAROUSEL
    const {
      currentTarget: { value }
    } = event

    if (value && !isNumberValue(value)) {
      return
    }
    onSetDuration(carouselSection, value)
  }
  setTransition = (transition: string) => {
    const { setTransition, section } = this.props
    const carouselSection =
      section === Sections.MAIN_HEADER
        ? CarouselSections.MAIN_HEADER_CAROUSEL
        : CarouselSections.SECONDARY_HEADER_CAROUSEL
    setTransition(carouselSection, transition)
  }
  handleOnPreview = () => {
    const { openPreview, section } = this.props
    openPreview(section)
  }
  render() {
    const {
      items,
      loading,
      formatMessage,
      saving,
      onSaveHeader,
      removeImage,
      setUrl,
      onUploadFile,
      carouselSettings: { transition, duration },
      section
    } = this.props

    const uploadItems = items.map(
      (item: HeaderImagePlaceHolder, index: number) => (
        <Uploader
          key={index}
          {...{
            item,
            formatMessage,
            index,
            loading: loading[index],
            onUploadFile,
            setUrl,
            removeImage,
            section
          }}
        />
      )
    )

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

export default CarouselHeader
