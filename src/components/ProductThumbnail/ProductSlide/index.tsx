/**
 * ProductSlide Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import Responsive from 'react-responsive'
import {
  ImageContainer,
  ImageTop,
  TopContainer,
  TopText,
  Image,
  ButtonContainer,
  Page,
  QuickView,
  ThumbnailImage,
  CustomizeButton,
  CheckboxContainer,
  ProStatus,
  ProLabel,
  DeleteButton,
  StatusFlag
} from './styledComponents'
import JackrooLogo from '../../../assets/Jackroologo.svg'
import quickViewIcon from '../../../assets/quickview.svg'
import ProFlag from '../../../assets/pro_flag.png'
import ProCertFlag from '../../../assets/procert_flag.png'
import WarningQualityFlag from '../../../assets/warning_flag.png'
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { ImageType } from '../../../types/common'
import { BLUE_STATUS, GREEN_STATUS, ORANGE_STATUS, WHITE } from '../../../theme/colors'
import { CUSTOMER_PREVIEW, CUSTOMER_APPROVED, PREFLIGHT_STATUS, IN_DESIGN, itemLabels } from '../../../constants'

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
  isProDesign?: boolean
  proStatus?: string
  qualityWarning?: boolean
  onPressBack: () => void
  onPressNext: () => void
  onPressQuickView: () => void
  onPressCustomize: () => void
  deleteItem: () => void
  onPressThumbnail: () => void
  handleCheckChange: (event: CheckboxChangeEvent) => void
}

const imagesOrder = ['thumbnail', 'front', 'left', 'right', 'back']

const ProductSlide = ({
  onMouseEnter,
  onMouseLeave,
  isProDesign,
  proStatus,
  isHovered,
  deleteItem,
  isTopProduct,
  images,
  image,
  labelButton = 'CUSTOMIZE',
  currentImage,
  onPressCustomize,
  onPressQuickView,
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
  fitContainer = false,
  qualityWarning = false
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
        {proDesign &&
          <StatusFlag src={proDesignAssigned ? ProFlag : ProCertFlag} />
        }
        {qualityWarning &&
          <StatusFlag src={WarningQualityFlag} />
        }
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
  let statusColor = null
  if (isProDesign && proStatus) {
    switch (proStatus) {
      case PREFLIGHT_STATUS:
        statusColor = WHITE
        break
      case CUSTOMER_APPROVED:
        statusColor = GREEN_STATUS
        break
      case CUSTOMER_PREVIEW:
        statusColor = ORANGE_STATUS
        break
      default:
        statusColor = BLUE_STATUS
        break
    }
  }
  let thumbnail = images
    ? images[imagesOrder.find(key => images[key]) || 'thumbnail']
    : JackrooLogo
  return (
    <ImageContainer {...{ onMouseEnter, onMouseLeave, isTopProduct, selectProduct }}>
      <ImageTop {...{ selectProduct, isProDesign, selectedIndex }}>
        <AboveTablet>
          {!hideQuickView && (
            <QuickView onClick={onPressQuickView}>
              <img src={quickViewIcon} />
            </QuickView>)
          }
        </AboveTablet>
        {(isProDesign && proStatus === PREFLIGHT_STATUS) &&
          <DeleteButton onClick={deleteItem} type="delete" />
        }
        {selectProduct && <BelowTablet><QuickView onClick={onPressQuickView}>
          <img src={quickViewIcon} />
        </QuickView></BelowTablet>}
        {(selectProduct && !fromIntakeForm) && <CheckboxContainer {...{ selectedIndex }}>
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
      {isProDesign && proStatus ?
        <ProLabel>
          <ProStatus backgroundColor={statusColor}>
            {itemLabels[proStatus] || itemLabels[IN_DESIGN]}
          </ProStatus>
        </ProLabel>
        : null
      }
      <ThumbnailImage
        onClick={!selectProduct ? onPressThumbnail : undefined}
        src={thumbnail}
        {...{ fitContainer, isProDesign }}
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
