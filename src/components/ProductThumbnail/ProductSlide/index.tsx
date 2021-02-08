/**
 * ProductSlide Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import Responsive from 'react-responsive'
import { FormattedMessage } from 'react-intl'
import {
  ImageContainer,
  ImageTop,
  TopContainer,
  TopText,
  Image,
  ButtonContainer,
  Page,
  QuickView,
  ProApproved,
  ThumbnailImage,
  CustomizeButton,
  CheckboxContainer,
  QuantityLabel
} from './styledComponents'
import messages from './messages'
import JackrooLogo from '../../../assets/Jackroologo.svg'
import quickViewIcon from '../../../assets/quickview.svg'
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { ImageType } from '../../../types/common'

const AboveTablet = (props: any) => <Responsive {...props} minWidth={768} />
const BelowTablet = (props: any) => <Responsive {...props} maxWidth={767} />

interface Props {
  onMouseEnter: () => void
  onMouseLeave: () => void
  isHovered: boolean
  isTopProduct: boolean
  images?: ImageType
  image?: string
  currentImage: number
  labelButton?: string | React.ReactNode
  hideCustomButton?: boolean
  hideQuickView?: boolean
  urlProduct: string
  myLockerList?: boolean
  currentCurrency: string
  disableSlider?: boolean
  customizable?: boolean
  backgroundColor?: string
  proDesign: boolean
  proDesignAssigned: boolean
  selectProduct?: boolean
  isSelected?: boolean
  selectedIndex?: number
  fitContainer?: boolean
  fromIntakeForm?: boolean
  quantity?: number
  onPressBack: () => void
  onPressNext: () => void
  onPressQuickView: () => void
  onPressCustomize: () => void
  onPressThumbnail: () => void
  handleCheckChange: (event: CheckboxChangeEvent) => void
}

const imagesOrder = ['thumbnail', 'front', 'left', 'right', 'back']

const ProductSlide = ({
  onMouseEnter,
  onMouseLeave,
  isHovered,
  isTopProduct,
  images,
  image,
  labelButton = 'CUSTOMIZE',
  currentImage,
  onPressCustomize,
  onPressQuickView,
  quantity,
  onPressBack,
  onPressNext,
  onPressThumbnail,
  hideCustomButton,
  hideQuickView,
  // urlProduct, TODO: WIP new way to right click
  myLockerList,
  disableSlider = false,
  customizable,
  backgroundColor,
  proDesign,
  proDesignAssigned,
  selectProduct,
  fromIntakeForm = false,
  isSelected = false,
  selectedIndex,
  handleCheckChange,
  fitContainer = false
}: Props) => {
  if (image) {
    return (
      <ImageContainer
        {...{
          onMouseEnter,
          onMouseLeave,
          isTopProduct,
          hideCustomButton,
          backgroundColor,
          selectProduct
        }}
      >
        {proDesign && (
          <ProApproved proAssigned={proDesignAssigned}>
            {
              <FormattedMessage
                {...messages[proDesignAssigned ? 'proAssigned' : 'approved']}
              />
            }
          </ProApproved>
        )}
        <ImageTop>
          <AboveTablet>
            {!hideQuickView && (
              <QuickView onClick={onPressQuickView}>
                <img src={quickViewIcon} />
              </QuickView>
            )}
          </AboveTablet>
          {isTopProduct && (
            <TopContainer>
              <TopText>TOP</TopText>
            </TopContainer>
          )}
        </ImageTop>
        <Page>
          {/* <a href={urlProduct}> TODO: WIP new way to right click */}
          <Image src={image} onClick={!selectProduct ? onPressThumbnail : undefined} />
          {/* </a> TODO: WIP new way to right click */}
        </Page>
        <AboveTablet>
          {isHovered && (!selectProduct && !hideCustomButton) && (
            <ButtonContainer {...{ myLockerList }} onClick={onPressCustomize}>
              {labelButton}
            </ButtonContainer>
          )}
        </AboveTablet>
      </ImageContainer>
    )
  }
  let thumbnail = images
    ? images[imagesOrder.find(key => images[key]) || 'thumbnail']
    : JackrooLogo
  return (
    <ImageContainer {...{ onMouseEnter, onMouseLeave, isTopProduct, selectProduct }}>
      {quantity && <QuantityLabel>x{quantity}</QuantityLabel>}
      <ImageTop {...{selectProduct, selectedIndex}}>
        <AboveTablet>
        {!hideQuickView && (
          <QuickView onClick={onPressQuickView}>
            <img src={quickViewIcon} />
          </QuickView>)
        }
        </AboveTablet>
        {selectProduct && <BelowTablet><QuickView onClick={onPressQuickView}>
          <img src={quickViewIcon} />
        </QuickView></BelowTablet>}
        {(selectProduct && !fromIntakeForm) && <CheckboxContainer {...{selectedIndex}}>
          <Checkbox
          {...{ indeterminate: false }}
          onChange={handleCheckChange}
          checked={isSelected}
        /></CheckboxContainer>}
        {isTopProduct && (
          <TopContainer>
            <TopText>TOP</TopText>
          </TopContainer>
        )}
      </ImageTop>
      <ThumbnailImage
        onClick={!selectProduct ? onPressThumbnail : undefined}
        src={thumbnail}
        {...{fitContainer}}
      />
      {isHovered && (!selectProduct && !hideCustomButton) && (
        <ButtonContainer
          {...{ myLockerList }}
          onClick={customizable ? onPressCustomize : onPressThumbnail}
        >
          <CustomizeButton>{labelButton}</CustomizeButton>
        </ButtonContainer>
      )}
    </ImageContainer>
  )
}

export default ProductSlide
