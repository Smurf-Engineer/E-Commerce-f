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
  StatusFlag,
  InfoIcon,
  StyledTooltip,
  TooltipContent,
  StatusIcon,
  TooltipBody,
  buttonStyle,
  TooltipContentModal,
  ScheduledDate,
  DateIcon,
} from './styledComponents'
import Modal from 'antd/lib/modal'
import JackrooLogo from '../../../assets/Jackroologo.svg'
import quickViewIcon from '../../../assets/quickview.svg'
import ProFlag from '../../../assets/pro_flag.png'
import infoIcon from '../../../assets/helpicon.png'
import ProCertFlag from '../../../assets/procert_flag.png'
import WarningQualityFlag from '../../../assets/warning_flag.png'
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { ImageType, Message } from '../../../types/common'
import { BLUE_STATUS, GREEN_STATUS, ORANGE_STATUS, WHITE } from '../../../theme/colors'
import { CUSTOMER_PREVIEW, CUSTOMER_APPROVED, PREFLIGHT_STATUS, IN_DESIGN, itemLabels } from '../../../constants'
import messages from './messages'
import moment from 'moment'

const { info } = Modal
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
  isOwner?: boolean
  hideQuickView?: boolean
  urlProduct: string
  myLockerList?: boolean
  fromTop?: boolean
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
  showTooltips?: boolean
  proStatus?: string
  proCertified?: boolean
  qualityWarning?: boolean
  designLab?: boolean
  lastTask?: any
  onPressBack: () => void
  onPressNext: () => void
  onPressQuickView: () => void
  onPressCustomize: () => void
  deleteItem: () => void
  onPressThumbnail: () => void
  setSeen: () => void
  selectProductToDesign: () => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
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
  fromTop,
  isTopProduct,
  images,
  image,
  designLab,
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
  isOwner = true,
  formatMessage,
  showTooltips,
  setSeen,
  selectProductToDesign = () => {},
  proDesignAssigned,
  selectProduct,
  lastTask,
  fromIntakeForm = false,
  isSelected = false,
  selectedIndex,
  handleCheckChange,
  fitContainer = false,
  proCertified = false,
  qualityWarning = false
}: Props) => {
  const openInfo = () => {
    let infoMessage = ''
    let imageShow = ''
    if (proDesign) {
      imageShow = ProFlag
      infoMessage = 'tooltipProdesign'
    } else if (proCertified) {
      imageShow = ProCertFlag
      infoMessage = 'tooltipProCert'
    } else if (qualityWarning) {
      imageShow = WarningQualityFlag
      infoMessage = 'tooltipQuality'
    }
    setSeen()
    info({
      title: ' ',
      icon: ' ',
      okText: formatMessage(messages.close),
      className: 'tightModal',
      okButtonProps: {
        style: buttonStyle
      },
      content: 
        <TooltipContentModal>
          <StatusIcon src={imageShow} />
          <TooltipBody
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages[infoMessage])
            }}
          />
        </TooltipContentModal>
    })
  }
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
        {showTooltips && (proDesign || proCertified || qualityWarning ) &&
          <InfoIcon src={infoIcon} />
        }
        <BelowTablet>
          {proDesign && <StatusFlag onClick={openInfo} {...{ showTooltips }} src={ProFlag} />}
          {proCertified && !proDesign && <StatusFlag onClick={openInfo} {...{ showTooltips }} src={ProCertFlag} />}
          {qualityWarning && <StatusFlag onClick={openInfo} {...{ showTooltips }} src={WarningQualityFlag} />}
        </BelowTablet>
        <AboveTablet>
          {proDesign &&
            <StyledTooltip
              overlayClassName="arrowEnabled"
              onVisibleChange={setSeen}
              content={
                <TooltipContent>
                  <StatusIcon src={ProFlag} />
                  <TooltipBody
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.tooltipProdesign)
                    }}
                  />
                </TooltipContent>
              }
            >
              <StatusFlag {...{ showTooltips }} src={ProFlag} />
            </StyledTooltip>
          }
          {proCertified && !proDesign &&
            <StyledTooltip
              overlayClassName="arrowEnabled"
              onVisibleChange={setSeen}
              content={
                <TooltipContent>
                  <StatusIcon src={ProCertFlag} />
                  <TooltipBody
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.tooltipProCert)
                    }}
                  />
                </TooltipContent>
              }
            >
              <StatusFlag {...{ showTooltips }} src={ProCertFlag} />
            </StyledTooltip>
          }
          {qualityWarning &&
            <StyledTooltip
              overlayClassName="arrowEnabled"
              onVisibleChange={setSeen}
              content={
                <TooltipContent>
                  <StatusIcon src={WarningQualityFlag} />
                  <TooltipBody
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.tooltipQuality)
                    }}
                  />
                </TooltipContent>
              }
            >
              <StatusFlag {...{ showTooltips }} src={WarningQualityFlag} />
            </StyledTooltip>
          }
        </AboveTablet>
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
          <Image
            src={image} 
            onClick={!selectProduct ? (designLab ? selectProductToDesign : onPressThumbnail) : undefined}
          />
          {/* </a> TODO: WIP new way to right click */}
        </Page>
        <AboveTablet>
          {isHovered && (!selectProduct && !hideCustomButton) && !designLab && (
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
    <ImageContainer {...{ designLab, onMouseEnter, onMouseLeave, isTopProduct, selectProduct }}>
      <ImageTop {...{ selectProduct, isProDesign, selectedIndex }}>
        <AboveTablet>
          {!hideQuickView && (
            <QuickView onClick={onPressQuickView}>
              <img src={quickViewIcon} />
            </QuickView>)
          }
        </AboveTablet>
        {(isProDesign && proStatus === PREFLIGHT_STATUS) && isOwner &&
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
        <ProLabel onClick={onPressThumbnail}>
          <ProStatus backgroundColor={statusColor}>
            {itemLabels[proStatus] || itemLabels[IN_DESIGN]}
          </ProStatus>
        </ProLabel>
        : null
      }
      {lastTask && lastTask.date && proStatus === IN_DESIGN && (
        <ScheduledDate>
          <DateIcon type="calendar" />
          {moment(lastTask.date).format('M/D')}
        </ScheduledDate>
      )}
      <ThumbnailImage
        onClick={!selectProduct ? (designLab ? selectProductToDesign : onPressThumbnail) : undefined}
        src={thumbnail}
        {...{ fitContainer, isProDesign, fromTop }}
      />
      {isHovered && (!selectProduct && !hideCustomButton) && !designLab && (
        <ButtonContainer
          {...{ myLockerList, fromTop }}
          onClick={customizable ? onPressCustomize : onPressThumbnail}
        >
          <CustomizeButton>{labelButton}</CustomizeButton>
        </ButtonContainer>
      )}
    </ImageContainer>
  )
}

export default ProductSlide
