/**
 * Styled Components - Created by david on 27/03/18.
 */
import styled from 'styled-components'
import AntdTabs from 'antd/lib/tabs'
import Select from 'antd/lib/select'
import Collapse from 'antd/lib/collapse'
import {
  BLUE,
  GRAY_LIGHT,
  GRAY_LIGHTEST,
  GRAY_SOFT,
  GRAY_STRONG,
  GREEN,
  GREEN_SELECTED,
  ORANGE,
  ORANGE_SELECTED,
  WHITE,
  RED_TRANSPARENT,
  RED,
  RED_DARK,
  WHITE_TRANSPARENT,
  GRAY_DARK,
  GRAY,
  BLACK,
  GREEN_PAYDAY,
  BLACK_LABEL,
  GREEN_STATUS,
  BLUE_SOFT,
  GRAY_SKELETON,
  COLOR_IN_DESIGN,
  DARKER_GRAY,
  GRAY_SNOW
} from '../../theme/colors'
import TextArea from 'antd/lib/input/TextArea'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import Tooltip from 'antd/lib/tooltip'
import Popover from 'antd/lib/popover'
import Spin from 'antd/lib/spin'
import DraggableModal from 'react-modal-resizable-draggable'
import { AVENIR_MEDIUM } from '../../theme/fonts'

const Panel = Collapse.Panel

interface RowProps {
  margin?: string
  borderBottom?: string
  paddingBottom?: string
  height?: string
  secondary?: boolean
  isAdmin?: boolean
  noMargin?: boolean
  marginTop?: boolean
  codeColor?: string
  backgroundColor?: string
  disabled?: boolean
  highlight?: boolean
  selected?: boolean
}

interface ColorProps {
  color?: string
}

export const Container = styled.div`
  background-color: ${WHITE};
  display: flex;
  flex-flow: column;
  @media (max-width: 1023px) {
    height: calc(100vh - 70px);
    position: relative;
    z-index: 11;
  }
  .flexible-modal-mask {
    z-index: 10;
    position: absolute;
    height: 100vh;
  }
`

export const CollapseWrapper = styled.div`
  display: none;
  z-index: 9;
  .ant-collapse .ant-collapse-item .ant-collapse-header {
    display: flex;
    flex-direction: row;
    color: ${GRAY_DARK};
    font-size: 12px;
    letter-spacing: 0.15px;
    line-height: 16px;
    padding: 14px 0 12px 0;
  }
  .ant-collapse .ant-collapse-item {
    border-bottom: none;
  }
  .ant-collapse-item-active {
    display: block;
    position: fixed;
    left: 0;
    top: 0px;
    z-index: 1;
    width: 100vw;
    height: calc(100vh - 163px);
    background: ${WHITE};
    .ant-collapse-header {
      background: #ededed;
    }
    .counter {
      right: 40%;
    }
  }
  .ant-collapse-item .ant-collapse-header .arrow {
    display: none;
  }
  .ant-collapse-item-active .ant-collapse-header .arrow {
    position: absolute;
    left: calc(100% - 40px);
    display: inline-flex;
    border: 1px solid ${GRAY_DARK};
    height: 24px;
    align-items: center;
    width: 24px;
    justify-content: center;
    border-radius: 50%;
    color: ${GRAY_DARK};
    top: unset;
    bottom: 0;
  }

  .ant-collapse-borderless .ant-collapse-item .ant-collapse-content {
    padding: 0 0 0 0;
  }
  @media (max-width: 1023px) {
    display: block;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 8;
  }
`

export const CollapseMobile = styled(Collapse)`
  display: flex;
  justify-content: space-evenly;
`

export const PanelMobile = styled(Panel)``

export const PanelTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  width: 100%;
  flex-flow: column;
  justify-content: flex-end;
  height: 56px;
  @media(max-width: 546px) {
    font-size: 10px;
  }
`

export const PanelIcon = styled.img`
  max-width: 32px;
  width: 100%;
  margin-bottom: 8px;
  object-fit: contain;
  filter: ${({ secondary }: RowProps) => (secondary ? `contrast(0.15) drop-shadow(0px 0px 1px ${GRAY})` : 'unset')};
`

export const ContainerError = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export const LayoutLeft = styled.div``

export const LeftArrow = styled(Icon)`
  margin-right: 10px;
`

export const WarningIcon = styled(Icon)`
  margin-right: 8px;
  color: ${ORANGE};
`

export const ApprovedIcon = styled(Icon)`
  margin-right: 8px;
  color: ${GREEN};
`

export const BlackBar = styled.div`
  background: ${BLACK};
  color: ${WHITE};
  display: flex;
  height: 38px;
  justify-content: center;
  padding: 0 28px;
  align-items: center;
  margin-top: 2px;
  z-index: 3;
  @media (max-width: 1023px) {
    display: none;
  }
`

export const BlackBarMobile = styled.div`
  background: ${BLACK};
  color: ${WHITE};
  display: none;
  height: 38px;
  justify-content: space-between;
  padding: 0 12px;
  align-items: center;
  margin-top: 2px;
  z-index: 3;
  @media (max-width: 1023px) {
    display: flex;
  }
`

export const JakrooProDesign = styled.img`
  max-width: 112px;
  object-fit: contain;
  width: 100%;
`

export const BackButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 28px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1023px) {
    left: 18px;
  }
`

export const RequestsTitle = styled.div`
  font-size: 12px;
  color: ${GRAY_DARK};
  display: flex;
  justify-content: flex-end;
  margin-top: -18px;
  margin-bottom: 28px;
  font-weight: bold;
  align-items: center;
`

export const AvailableLabel = styled.div``

export const AvailableCircle = styled.div`
  background: ${GRAY_DARK};
  width: 26px;
  height: 26px;
  margin-left: 12px;
  display: flex;
  font-size: 14px;
  justify-content: center;
  border-radius: 50%;
  align-items: center;
  color: ${WHITE};
`

export const StatusLabel = styled.div`
  background: ${({ color }: ColorProps) => color || GRAY_STRONG};
  border-radius: 2px;
  text-transform: uppercase;
  font-size: 12px;
  position: absolute !important;
  top: 12px;
  right: 28px;
  padding: 9px;
  height: auto;
  color: white;
  font-weight: bold;
  max-width: 142px;
  text-align: center;
  width: 100%;
`

export const PrintPreviewLabel = styled.div`
  z-index: 8;
  max-width: 124px;
  width: 100%;
  right: 0px;
  position: absolute;
  top: 83px;
  padding: 8px;
  background: ${WHITE};
  border-radius: 5px;
  border-top-right-radius: 0px
  border-bottom-right-radius: 0px
  box-shadow: 1px 1px 3px 0px #a7a7a7;
  transition: all .25s;
  ${({ selected }: RowProps) => selected ? `
    box-shadow: inset 1px 1px 4px 0px #9f9f9f;
    background: #ebebeb;
  ` : ''}
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
  @media (max-width: 768px) {
    top: 128px;
    right: -16px;
  }
`

export const PrintPreviewIcon = styled.img`
  max-width: 86px;
`

export const PreviewDiv = styled.div`
  z-index: 13;
  height: calc(100% - 72px);
  background: ${WHITE};
  top: 60px;
  padding: 32px 12px;
  padding-bottom: 8px;
  position: absolute;
  border-radius: 3px;
  box-shadow: 1px 2px 7px 0px #a7a7a7;
  transition: all .25s;
  display: ${({ selected }: RowProps) => selected ? 'auto' : 'none'};
  animation: fade-in-right 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  @keyframes fade-in-right {
    0% {
      transform: translateX(20px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @media (max-width: 1023px) {
    margin: 0 28px;
    max-height: calc(100% - 158px);
    height: auto;
  }
`

export const DownloadDiv = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  position: absolute;
  top: 14px;
  left: calc(50% - 50px);
  z-index: 17;
  color: ${BLUE};
  text-decoration: underline;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`

export const DownloadIcon = styled(Icon)`
  margin-left: 6px;
`

export const CloseIcon = styled(Icon)`
  right: 15px;
  position: absolute;
  top: 15px;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
`

export const PreviewImg = styled.img`
  height: 100%;
  object-fit: contain;
  width: 100%;
`

export const Layouts = styled.div`
  display: flex;
  @media (max-width: 1023px) {
    flex: 1;
  }
`

export const Variants = styled.div`
  display: flex;
  flex-flow: column;
  top: ${({ secondary, selected }: RowProps) => selected && secondary ? '192px' : (secondary ? '92px' : '38px')};
  z-index: 4;
  left: 28px;
  position: absolute;
  @media (max-width: 1023px) {
    top: ${({ secondary, selected }: RowProps) => selected && secondary ? '192px' : (secondary ? '92px' : '42px')};
    left: 18px;
  }
`

export const VariantButton = styled.img`
  width: 40px;
  object-fit: contain;
  max-height: 40px;
  border: 1px solid ${({ selected }: RowProps) => (selected ? RED : GRAY_LIGHT)};
  border-radius: 3px;
  transition: all 0.25s;
  padding: 5px;
  margin-bottom: 8px;
  cursor: pointer;
  &:hover {
    background: ${GRAY_LIGHTEST};
  }
`

export const ChatCount = styled.div`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  display: flex;
`

export const CountCircle = styled.div`
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  font-size: 12px;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  top: 6px;
`

export const BottomSheetWrapper = styled.div`
  z-index: 8;
  .react-swipeable-view-container {
    box-shadow: rgba(0, 0, 0, 0.157) 0px -1px 5px !important;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`

export const StyledTitle = styled.div`
  background-color: ${WHITE};
  padding: 16px 0;
  box-sizing: border-box;
  color: black;
  min-height: 64px;
  font-size: 24px;
  text-align: left;
  flex: 1;
  margin-left: 15px;
  cursor: pointer;
  color: ${BLUE};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  text-align: center;
`

export const StyledTabs = styled(AntdTabs)`
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 2px 0px 8px 0px ${GRAY_LIGHT};
  .ant-tabs-nav {
    width: 100%;
  }
  .ant-tabs-tab {
    width: ${({ secondary }: RowProps) => secondary ? '25%' : '50%'};
    margin: 0;
  }
  .ant-tabs-ink-bar {
    width: ${({ secondary }: RowProps) => secondary ? '25%' : '50%'};
  }
  .ant-tabs-bar {
    margin: 0;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Message = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const RenderContainer = styled.div`
  width: 600px;
  position: relative;
`

export const InfoDiv = styled.div`
  margin-right: ${({ isAdmin }: RowProps) => isAdmin ? '8px' : '0'};
  margin-left: ${({ isAdmin }: RowProps) => isAdmin ? '0' : '8px'};
  display: inline-flex;
  flex-flow: column;
`

export const RequestButtons = styled.div`
  display: flex;
  z-index: 7;
  position: absolute;
  max-width: 378px;
  width: 100%;
  bottom: 30px;
  align-items: center;
  justify-content: center;
  @media (max-width: 1023px) {
    display: none;
  }
`

export const PaidLabel = styled.div`
  background: ${({ secondary }: RowProps) => secondary ? '#9dd95b' : '#55c2eb'};
  color: ${WHITE};
  align-self: flex-start;
  padding: 2px 8px;
  margin-top: 6px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 3px;
  word-break: keep-all;
  transition: all .2s;
  max-width: 47px;
  width: 100%;
`

export const MobileRequestButtons = styled.div`
  display: none;
  bottom: 100px;
  position: fixed;
  left: 0;
  z-index: 8;
  width: 100%;
  padding: 0 28px;
  @media (max-width: 1023px) {
    display: flex;
  }
`

export const RequestEdit = styled(Button)`
  display: flex;
  height: 40px;
  flex-flow: column;
  border: 1px solid ${RED};
  width: 90%;
  padding: 4px;
  font-size: 12px;
  align-items: center;
  min-height: 42px;
  justify-content: center;
  border-radius: 3px;
  background: ${WHITE};
  transition: all .25s;
  &:hover {
    span {
      color: ${({ disabled }: RowProps) => disabled ? GRAY : WHITE};
    }
    cursor: pointer;
    background: ${RED};
    color: ${WHITE};
  }
  @media (max-width: 1023px) {
    height: auto;
  }
`

export const StyledTooltip = styled(Popover)`
  z-index: 12;
  position: absolute;
  right: -28px
  bottom: 14px;
  @media (max-width: 1023px) {
    right: -4px;
    left: unset;
  }
`

export const StyledTooltipMobile = styled(Popover)`
  z-index: 12;
  right: 30px;
  top: -28px;
  position: absolute;
`

export const InfoIconMobile = styled(Icon)`
  font-size: 18px;
  color: ${BLUE};
  z-index: 20;
`

export const IconTitle = styled(Icon)`
  margin: 0 auto;
  color: ${BLUE};
  width: 100%;
  font-size: 21px;
  margin-top: -8px;
  display: block;
  margin-bottom: 17px;
`

export const TextBody = styled.div``

export const TooltipBody = styled.div`
  padding-top: 16px;
  padding-left: 8px;
  padding-right: 10px;
  max-width: 376px;
  width: 100%;
  @media (max-width: 767px) {
    padding-top: 30px;
    padding-left: 19px;
    padding-right: 17px;
  }
`

export const InfoIcon = styled(Icon)`
  margin-left: 9px;
  font-size: 16px;
  vertical-align: sub;
  color: ${BLUE};
  z-index: 20;
  &:hover {
    cursor: pointer;
  }
`

export const EditsLabel = styled.div``

export const RequestText = styled.span`
  color: ${({ secondary }: RowProps) => secondary ? GRAY : RED};
  transition: all .25s;
`

export const PurchaseButton = styled.div`
  display: flex;
  flex-flow: column;
  color: ${WHITE};
  width: 90%;
  padding: 14px 4px;
  font-size: 12px;
  margin-top: 12px;
  align-items: center;
  border-radius: 3px;
  background: ${RED};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    background: ${RED_DARK};
  }
`

export const ModalTitle = styled.div`
  font-weight: 900;
  font-size: 16px;
  font-family: ${AVENIR_MEDIUM};
  margin-bottom: 22px;
  cursor: move;
`

export const DraggableModalStyled = styled(DraggableModal)`
  z-index: 10;
  padding: 27px;
  border-radius: 3px;
  max-width: 612px;
  width: 100% !important;
  max-height: 440px;
  height: 100% !important;
  align-self: center;
  box-shadow: 0px 2px 7px 0px ${GRAY_DARK};
  .flexible-modal-drag-area {
    background: unset;
  }
  @media (max-width: 612px) {
    left: 0;
  }
`

export const stylesDraggable = {
  top: 'calc(50vh - 183px)',
  left: 'calc(50vw - 306px)'
}

export const stylesDraggableMobile = {
  top: 'calc(50vh - 200px)',
  left: '0'
}

export const PromptTitle = styled.div`
  font-weight: 900;
  font-size: 16px;
  font-family: ${AVENIR_MEDIUM};
  margin-bottom: 10px;
`

export const ModalSubtitle = styled.div`
  font-size: 12px;
  color: ${GRAY_DARK};
  margin: 16px 0;
`

export const ApprovalTitle = styled.div`
  background: ${GRAY_LIGHTEST};
  width: 108%;
  margin-left: -14px;
  padding: 8px 18px;
  text-align: left;
  font-weight: bold;
  font-size: 13px;
  @media (max-width: 1023px) {
    display: none;
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  background: ${WHITE_TRANSPARENT};
  height: 100vh;
  z-index: 3;
  justify-content: center;
  align-items: center;
`

export const DesignChat = styled.div`
  padding: 0 14px;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
  flex: 1;
  @media (max-width: 1023px) {
    padding: 0;
    height: calc(100vh - 277px);
  }
`

export const TextAreaStyled = styled(TextArea)`
  border-radius: 0;
  outline: none;
  box-shadow: none;
  resize: none;
  &:hover {
    border: 1px solid ${GRAY_LIGHT};
  }
  &:focus {
    border: 1px solid ${GRAY_LIGHT};
    outline: none;
    box-shadow: none;
    resize: none;
  }
`

export const ButtonContainer = styled.div`
  margin-top: 22px;
  text-align: right;
  background: ${WHITE};
`

export const StyledUpload = styled(Upload)`
  margin-bottom: 16px;
  .ant-upload-select-picture-card {
    border: 1px solid ${RED};
    max-width: 128px;
    width: 100%;
    height: 36px;
    background: ${WHITE};
    border-radius: 1px;
    @media (max-width: 767px) {
      width: 100%;
    }
  }
`

export const UploadButton = styled.div`
  color: ${RED};
  display: flex;
  align-items: center;
  font-size: 12px;
  justify-content: center;
`

export const StyledIcon = styled(Icon)`
  margin-right: 16px;
`

export const Clip = styled(Icon)`
  color: ${RED};
  margin-right: 12px;
`

export const FileLabel = styled.div`
  display: flex;
`

export const MessageFile = styled.div`
  display: flex;
  margin-top: 6px;
  font-size: 12px;
  color: ${BLUE};
  text-decoration: underline;
  align-self: ${({ isAdmin }: RowProps) => isAdmin ? 'flex-end' : 'unset'};
  &:hover {
    cursor: pointer;
  }
`

export const TypeLabel = styled.div`
  font-size: 10px;
  background: ${GREEN_PAYDAY};
  padding: 2px 8px;
  margin-top: 8px;
  color: white;
  border-radius: 3px;
`

export const FileName = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const SaveButton = styled(Button)`
  border-radius: 2px;
  font-size: 12px;
  height: 34px;
  padding: 0 28px;
  margin-left: 4px;
  background: ${BLUE};
  color: ${WHITE};
  border: none;
`

export const CancelButton = styled(Button)`
  border-radius: 2px;
  font-size: 12px;
  height: 34px;
  padding: 0 28px;
  margin-right: 4px;
`

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: scroll;
  @media (min-width: 1024px) {
    max-height: calc(100% - 45px);
  }
  ${({ highlight }: RowProps) => highlight ? `
    animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) 1s both;
    @keyframes shake-horizontal {
      0% {
        transform: translateY(45px);
        animation-timing-function: ease-in;
        opacity: 1;
      }
      24% {
        opacity: 1;
      }
      40% {
        transform: translateY(24px);
        animation-timing-function: ease-in;
      }
      65% {
        transform: translateY(12px);
        animation-timing-function: ease-in;
      }
      82% {
        transform: translateY(6px);
        animation-timing-function: ease-in;
      }
      93% {
        transform: translateY(4px);
        animation-timing-function: ease-in;
      }
      25%,
      55%,
      75%,
      87% {
        transform: translateY(0px);
        animation-timing-function: ease-out;
      }
      100% {
        transform: translateY(0px);
        animation-timing-function: ease-out;
        opacity: 1;
      }
    }
  ` : ''}
`

export const IncomingMessage = styled.div`
  margin: 18px 0;
  display: flex;
  align-items: flex-start;
  flex-flow: ${({ isAdmin }: RowProps) => isAdmin ? 'row' : 'row-reverse'};
`

export const MessageHeader = styled.div`
  display: flex;
  margin-top: 4px;
  align-items: center;
  margin-right: ${({ isAdmin }: RowProps) => isAdmin ? '14px' : '0'};
  margin-left: ${({ isAdmin }: RowProps) => isAdmin ? '0' : '14px'};
`

export const TabContent = styled.div`
  display: flex;
  height: calc(100vh - 215px);
  flex-flow: column;
`

export const LayoutRight = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
`

export const Products = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  ${({ secondary }: RowProps) => secondary ? `
    height: calc(100vh - 210px);
    overflow-y: scroll;
  ` : ''}
`

export const ProjectDesign = styled.div`
  display: flex;
  position: relative;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  margin-left: 22px;
  z-index: 3;
  margin-bottom: 24px;
  transition: all .2s;
  opacity: 1;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  &:first-child {
    margin-left: 0;
  }
`

export const ProStatus = styled.div`
  width: 85%;
  padding: 8px 0;
  font-size: 10px;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  background: ${BLACK_LABEL};
  border-radius: 3px;
  color: ${({ backgroundColor }: RowProps) => backgroundColor || WHITE};
`

export const ProLabel = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  width: 100%;
  top: 32%;
`

export const DesignImage = styled.img`
  object-fit: cover;
  max-width: 130px;
  height: 130px;
  background: ${GRAY_LIGHTEST};
`

export const DesignName = styled.div`
  margin-top: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 12px;
  color: ${({ secondary }: RowProps) => secondary ? GRAY_SOFT : GRAY_DARK};
`

export const ProductName = styled.div`
  font-size: 12px;
  text-transform: uppercase;
`

export const FullTitle = styled.div`
  background: ${({ secondary }: RowProps) => secondary ? GREEN_STATUS : ORANGE};
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 4px;
  font-size: 14px;
  color: ${WHITE};
  font-weight: bold;
`

export const PromptBody = styled.div`
  margin-top: 32px;
  text-align: center;
  margin-left: -32px;
`

export const PromptSubtitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`

export const PromptLink = styled.div`
  margin-top: 20px;
  color: ${BLUE};
  font-weight: bold;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    color: ${BLUE_SOFT};
  }
`

export const PrompText = styled.div`
  margin-bottom: 20px;
`

export const buttonPrompt = {
  background: WHITE,
  color: GRAY_STRONG,
  boxShadow: 'none',
  textShadow: 'none',
  borderColor: GRAY_SOFT,
  fontSize: '12px',
}

export const ApproveButton = styled(Button)`
  padding: 9px;
  width: 90%;
  height: 40px;
  margin-right: 30px;
  border-radius: 2px;
  color: white;
  background: ${BLUE};
  border: 0;
  border: 1px solid ${BLUE};
  transition: all .25s;
  &:hover {
    border: 1px solid ${BLUE};
    background: ${WHITE};
    color: ${BLUE};
  }
  @media (max-width: 1023px) {
    height: auto;
  }
`

export const RenderSection = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 28px;
  height: calc(100% - 150px);
  margin-top: 88px;
  @media (max-width: 1023px) {
    margin-bottom: 168px;
    height: calc(100% - 207px);
  }
`

export const Initials = styled.div`
  width: 24px;
  font-size: 12px;
  height: 24px;
  background: ${BLUE};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`

export const UserName = styled.div`
  margin-left: 12px;
  font-weight: bold;
`

export const DateMessage = styled.div`
  color: ${GRAY_SOFT};
  font-size: 9px;
  text-align: right;
  margin-top: 6px;
  margin-right: 4px;
`

export const JakrooLogo = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
`

export const UserIcon = styled(Icon)`
  color: ${WHITE};
`

export const MessageBox = styled.div`
  background: ${WHITE};
  padding: 8px;
  box-shadow: 0px 2px 7px 0px ${GRAY_LIGHT};
  display: inline-flex;
  flex-flow: column;
  border-radius: 5px;
  justify-content: space-between;
  align-items: flex-end;
  ${({ highlight }: RowProps) => highlight ? `
    animation: blink-1 1.5s 2s 2 ease-in-out;
    @keyframes blink-1 {
      0% {
        box-shadow: 0 0 0 0 #ff6a6a;
      }
      100% {
        box-shadow: 0 0 0 16px #ffebebb8;
      }
    }
  ` : ''}
`

export const ParentText = styled.div`
  border-left: 2px solid ${({ codeColor }: RowProps) => codeColor || RED_TRANSPARENT};
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 12px;
  color: ${GRAY_STRONG};
  background: ${GRAY_LIGHTEST};
  text-align: left;
`

export const MessageBody = styled.div`
  display: inline-flex;
  text-align: start;
  width: 100%;
  word-break: break-word;
  flex-flow: column;
`

export const MessageComment = styled.div`
  display: inline-flex;
  text-align: start;
  width: 100%;
  word-break: break-word;
  flex-flow: column;
  min-width: 164px;
`

export const ColorName = styled.p`
  margin: 5px 0 0 0;
  font-size: 12px;
`

export const Accesories = styled.div`
  margin: 12px;
`

export const Color = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid
    ${({ color }: ColorProps) =>
    color && color.toLowerCase() !== WHITE.toLowerCase() ? color : GRAY};
  background-color: ${({ color }: ColorProps) => color || WHITE};
  align-self: center;
`

export const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`

export const Colors = styled.div`
  padding: 0 14px;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
  flex: 1;
`

export const ColorBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 23px;
  margin-left: 12px;
`

export const CodeLabel = styled.div`
  background: ${({ codeColor }: RowProps) => codeColor || GRAY_DARK};
  color: ${WHITE};
  align-self: ${({ isAdmin }: RowProps) => isAdmin ? 'flex-end' : 'flex-start'};
  padding: 2px 8px;
  margin-top: 8px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 3px;
  word-break: keep-all;
  transition: all .2s;
  ${({ secondary }: RowProps) => secondary && `
    border: 1px solid ${({ codeColor }: RowProps) => codeColor || GRAY_DARK};
    &:hover {
      cursor: pointer;
      background: ${WHITE};
      color: ${GRAY_DARK};
    }
  `};
`

export const CodeColor = styled.div`
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.23px;
  line-height: 25px;
`

export const MessageType = styled.div`
  text-transform: uppercase;
  color: ${({ secondary }: RowProps) => secondary ? ORANGE : GREEN};
  background: ${({ secondary }: RowProps) => secondary ? ORANGE_SELECTED : GREEN_SELECTED};
  padding: 0 8px;
  font-size: 12px;
  display: flex;
  font-weight: bold;
  border-radius: 2px;
  align-items: center;
  margin-left: ${({ isAdmin }: RowProps) => !isAdmin ? '0' : '6px'};
  margin-right: ${({ isAdmin }: RowProps) => !isAdmin ? '6px' : '0'};
  max-height: 22px;
`

export const RequiredText = styled.div`
  font-size: 10px;
  font-style: italic;
  max-width: 43px;
  width: 100%;
  font-weight: bold;
  color: ${BLUE};
  padding: 2px;
  &:hover {
    cursor: pointer;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 28px;
  top: 12px;
  z-index: 4;
  @media (min-width: 768px) and (max-width: 991px) {
    width: 25%;
  }

  @media (max-width: 1024px) {
    left: 18px;
    top: 14px;
  }
`

export const BottomButtons = styled.div`
  display: flex;
  z-index: 7;
  position: absolute;
  width: 100%;
  bottom: 28px;
  gap: 8px;
  align-items: center;
  justify-content: center;
  @media (max-width: 1023px) {
    bottom: 148px;
  }
`

export const NameLabel = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 22px;
  align-items: center;
  flex-flow: row;
  position: absolute;
  width: 100%;
  @media (min-width: 1024px) and (max-width: 1176px) {
    flex-flow: column;
  }
  @media (max-width: 767px) {
    right: 30px;
    flex-flow: column;
    top: 44px;
    align-items: flex-end;
    width: auto;
  }
`

export const DesignLabel = styled.div`
  display: flex;
  font-weight: bold;
  text-transform: uppercase;
  &:last-child {
    margin-left: 24px;
  }
  @media (max-width: 1024px) {
    margin-left: 0px;
  }
`

export const DescLabel = styled.div`
  font-weight: normal;
  margin-right: 10px;
`

export const ModelTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  user-select: none;
`

export const RowTitle = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 12px;
`

export const QuickView = styled.img`
  cursor: pointer;
  margin-left: 8px;
`

export const InfoText = styled.div`
  margin-left: -38px;
  margin-bottom: 4px;
`

export const EditSquares = styled.div`
  display: flex;
  flex-flow: column;
  animation: fade-in-left 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  @keyframes fade-in-left {
    0% {
      transform: translateX(-10px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

export const EditTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`

export const Squares = styled.div`
  display: flex;
`

export const EditSquareDiv = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`

export const UsedSquare = styled.div`
  width: 32px;
  height: 32px;
  font-weight: bold;
  color: white;
  background: #55c2eb;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const AvailableSquare = styled.div`
  width: 32px;
  height: 32px;
  font-weight: bold;
  color: #464646;
  background: ${({ secondary }: RowProps) => secondary ? '#f9c2c2' : '#e1e1e1'};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LabelSquare = styled.div`
  margin-top: 8px;
  font-size: 10px;
  font-weight: bold;
`

export const ButtonWrapper = styled.div`
  margin-bottom: ${({ noMargin }: RowProps) => noMargin ? 'unset' : '16px'};
  margin-top: ${({ marginTop }: RowProps) => marginTop ? '-4px' : 'unset'};
  .ant-btn-primary  {
    background-color: ${({ secondary }: RowProps) => secondary ? WHITE : BLUE};
    border-color: ${({ secondary }: RowProps) => secondary ? GRAY_STRONG : BLUE};
    width: 138px;
    color: ${({ selected }: RowProps) => selected ? WHITE : GRAY_DARK};
  }
  .ant-btn-primary:hover {
    background-color: ${({ secondary }: RowProps) => secondary ? GRAY_LIGHT : BLUE};
    border-color: ${({ secondary }: RowProps) => secondary ? GRAY_LIGHT : BLUE};
  }
`

export const okButtonStyles = {
  background: BLUE,
  border: 'none',
  borderRadius: '2px'
}

export const FileContainer = styled.div`

`

export const DeleteFile = styled(Icon)`
  color: ${RED};
  margin-left: 10px;
  padding-top: 2px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

export const Collaboration = styled.div`
  padding: 0 14px;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
  flex: 1;
  font-family: Avenir;
  overflow-y: scroll;
  overflow-x: hidden;
  @media (max-width: 1023px) {
    padding: 0;
    height: calc(100vh - 210px);
  }
`

export const CollabInfo = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  margin-top: 14px;
`

export const CollabTitle = styled.div`
  text-align: left;
  font-weight: bold;
`

export const CollabDescription = styled.div`
  text-align: left;
  margin-top: 8px;
`

export const AddMemberButton = styled.div`
  padding: 6px 12px;
  border-radius: 4px;
  background: rgb(68, 104, 249);
  margin-top: 12px;
  color: ${WHITE};
  min-width: 136px;
  transition: all .25s;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  ${({ disabled }: RowProps) => disabled ? `
    background: ${GRAY_LIGHT};
    &:hover {
      opacity: 1;
      cursor: not-allowed;
    }
  ` : ''}
`

export const CollabMembers = styled.div`
  margin-top: 22px;
  padding-top: 22px;
  border-top: 1px solid ${GRAY_SKELETON};
`

export const MembersList = styled.div`
  margin-top: 24px;
  @media (max-width: 1023px) {
    max-width: 472px;
    width: 100%;
  }
`

export const Member = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 24px;
  position: relative;
`

export const MemberImage = styled(Icon)`
  background: ${({ codeColor }: RowProps) => codeColor || COLOR_IN_DESIGN};
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  font-size: 20px;
  margin-right: 18px;
  opacity: 0.75;
  color: ${WHITE};
  @media(max-width: 767px) {
    font-size: 16px;
    padding: 10px;
  }
`

export const MemberData = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column;
  align-items: flex-start;
  font-size: 12px;
  flex: 1;
`

export const MemberName = styled.div`
  font-weight: bold;
  text-align: left;
`

export const MemberEmail = styled.div`
  text-align: left;
  word-break: break-all;
  margin-right: 6px;
`

export const MemberDate = styled.div`
  color: ${DARKER_GRAY};
  text-align: left;
  font-size: 11px;
`

export const MemberType = styled(Select)`
  min-width: 108px;
  margin-right: 10px;
  font-size: 12px;
`

export const MemberDelete = styled(Icon)`
  transition: all .25s;
  &:hover {
    cursor: pointer;
    color: ${RED};
  }
`

export const PendingDiv = styled.div`
  display: flex;
  margin-top: 2px;
`

export const PendingLabel = styled.div`
  font-style: italic;
  color: ${RED};
`

export const Resend = styled.div`
  margin-left: 32px;
  color: ${BLUE};
  font-weight: bold;
  transition: all .25s;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`

export const InviteContainer = styled.div`
  margin: 22px 20px;
  font-family: Avenir;
`

export const InviteTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  font-family: Avenir;
`

export const MailsContainer = styled.div`
  margin-top: 22px;
`

export const EmailsLabel = styled.div`
  font-weight: bold;
`

export const StyledEmailTags = styled.div`
  margin-top: 16px;
  border: 1px solid #d4d5d6;
  padding: 10px 8px;
  border-radius: 5px;
  min-height: 100px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  &:hover {
    cursor: text;
  }
  .input {
    display: inline-block;
    width: ${({ secondary }: RowProps) => secondary ? 'auto' : '100%'};
    height: 28px;
    flex: 1;
    box-sizing: border-box;
    font: inherit;
    border-radius: 0.2rem;
    border: none;
    color: #565656;
    -webkit-appearance: none;
  }

  .input:focus {
    border-color: cornflowerblue;
    outline: none;
  }

  .input.has-error {
    border-color: tomato;
  }

  .input:disabled {
    background: unset;
  }

  .error {
    margin: 0;
    font-size: 90%;
    color: tomato;
  }

  .tag-item {
    background-color: #d4d5d6;
    display: inline-block;
    font-size: 12px;
    border-radius: 30px;
    height: 30px;
    padding: 0 4px 0 1rem;
    display: inline-flex;
    align-items: center;
    margin: 0 0.3rem 0.3rem 0;
    &:hover {
      cursor: default;
    }
  }

  .tag-item > .button {
    background-color: white;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font: inherit;
    margin-left: 10px;
    font-weight: bold;
    padding: 0;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const SendInvitationButton = styled.div`
  display: inline-block;
  padding: 10px 18px;
  border-radius: 4px;
  background: rgb(68, 104, 249);
  margin-top: 18px;
  color: ${WHITE};
  transition: all .25s;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  ${({ disabled }: RowProps) => disabled ? `
    background: ${GRAY_LIGHT};
    &:hover {
      opacity: 1;
      cursor: not-allowed;
    }
  ` : ''}
`

export const BottomSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;
  padding-top: 18px;
  border-top: 1px solid ${GRAY_LIGHT};
`

export const InviteLink = styled.div`
  display: flex;
  font-weight: bold;
  align-items: center;
`

export const InviteLinkLabel = styled.div`
  margin-left: 10px;
  transition: all .25s;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
    text-decoration: underline;
  }
`

export const CopyLinkButton = styled.div`
  display: inline-block;
  padding: 6px 10px;
  font-size: 12px;
  border-radius: 4px;
  color: rgb(68,104,249);
  background: ${WHITE};
  border: 1px solid rgb(68,104,249);
  transition: all .25s;
  &:hover {
    background: rgb(68,104,249);
    color: ${WHITE};
    cursor: pointer;
  }
`

export const GearIcon = styled(Icon)`
  color: ${BLACK};
  transition: all .25s;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
    text-decoration: underline;
  }
`

export const InfoIconLink = styled(Icon)`
  margin-left: 10px;
  color: ${GRAY};
`

export const ConfirmEmailTags = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: flex-start;
  flex-flow: column;
  flex-wrap: wrap;
  max-height: 256px;
  .tag-item {
    background-color: #d4d5d6;
    display: inline-block;
    font-size: 12px;
    border-radius: 30px;
    height: 30px;
    padding: 0 4px 0 1rem;
    display: inline-flex;
    align-items: center;
    margin: 0 0.3rem 0.3rem 0;
    &:hover {
      cursor: default;
    }
  }

  .tag-item > .button {
    background-color: white;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font: inherit;
    margin-left: 10px;
    font-weight: bold;
    padding: 0;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const InfoConfirmation = styled.div`
  margin: 0 4px;
`

export const ConfirmBottom = styled.div`
  display: flex;
`

export const CancelInvitation = styled.div`
  margin-top: 18px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  padding: 7px 18px;
  border-radius: 4px;
  color: rgb(68,104,249);
  background: ${WHITE};
  border: 1px solid rgb(68,104,249);
  transition: all .25s;
  &:hover {
    background: rgb(68,104,249);
    color: ${WHITE};
    cursor: pointer;
  }
`

export const StyledSpinInvitation = styled(Spin)`
  width: 79px;
  height: 15px;
`

export const CollabWarning = styled.div`
  text-align: left;
  color: red;
  margin-top: 4px;
`

export const MemberOwnerLabel = styled.div`
  font-weight: bold;
  flex: 1;
  text-align: center;
  padding: ${({ secondary }: RowProps) => secondary ? '0px' : '8px'};
  font-size: 12px;
`

export const StarIcon = styled(Icon)`
  position: absolute;
  left: 30px;
  bottom: 0;
  color: #ffca00;
  z-index: 2;
  @media(max-width: 767px) {
    left: 23px;
  }
`

export const StyledPopOver = styled(Tooltip)`
  cursor: pointer;
`

export const PopoverText = styled.div`
  max-width: 256px;
  width: 100%;
  font-size: 12px;
  color: ${BLACK};
`

export const CommentSection = styled.div`
  padding: 0 14px;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
  flex: 1;
  font-family: Avenir;
  @media (max-width: 1023px) {
    padding: 0;
    height: calc(100vh - 200px);
  }
`

export const ChatComments = styled.div`
  flex: 1;
  overflow-y: scroll;
  @media (min-width: 1024px) {
    max-height: calc(100% - 45px);
  }
`

export const CommentMessage = styled.div`
  background: ${({ isAdmin }: RowProps) => isAdmin ? WHITE : '#fafff7'};
  padding: 8px;
  box-shadow: 0px 2px 7px 0px ${GRAY_LIGHT};
  display: inline-flex;
  flex-flow: column;
  border-radius: 5px;
  justify-content: space-between;
  align-items: flex-start;
  ${({ highlight }: RowProps) => highlight ? `
    animation: blink-1 1.5s 2s 2 ease-in-out;
    @keyframes blink-1 {
      0% {
        box-shadow: 0 0 0 0 #ff6a6a;
      }
      100% {
        box-shadow: 0 0 0 16px #ffebebb8;
      }
    }
  ` : ''}
`

export const MemberInitials = styled.div`
  width: 24px;
  font-size: 12px;
  height: 24px;
  background: ${({ codeColor }: RowProps) => codeColor || BLUE};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`

export const CommentHeader = styled.div`
  margin-left: 2px;
  font-size: 14px;
  font-weight: bold;
  font-family: Avenir;
  margin-bottom: 4px;
  text-align: left;
  color: ${({ codeColor }: RowProps) => codeColor || BLUE};
  filter: contrast(0.5);
`

export const ImageMessage = styled.img`
  width: 100%;
  max-height: 278px;
`

export const ActionsIcons = styled.div`
  display: flex;
  margin-top: -11px;
  margin-left: 8px;
`

export const LikeAction = styled.div`
  margin-right: 14px;
  font-size: 12px;
`

export const HeartAction = styled.div`
  margin-right: 12px;
  font-size: 12px;
`

export const LikeIcon = styled(Icon)`
  margin-right: 8px;
  font-size: 14px;
  color: ${BLUE};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const HeartIcon = styled(Icon)`
  margin-right: 8px;
  font-size: 14px;
  color: ${RED_TRANSPARENT};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const CommentInput = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  align-items: flex-start;
  margin-left: -14px;
  margin-right: -14px;
  background: ${GRAY_SNOW};
  margin-top: 0px;
  margin-bottom: 0;
  min-height: 45px;
  padding: 6px 14px;
  flex-wrap: wrap;
  transition: all .4s;
`

export const InputComment = styled(TextArea)`
  border-radius: 25px;
  outline: none;
  box-shadow: none;
  resize: none;
  &:hover {
    border: 1px solid ${GRAY_LIGHT};
  }
  &:focus {
    border: 1px solid ${GRAY_LIGHT};
    outline: none;
    box-shadow: none;
    resize: none;
  }
`

export const SendCommentButton = styled.div`
  font-family: Avenir-Medium;
  margin-left: 10px;
  color: ${({ disabled }: RowProps) => disabled ? GRAY : BLUE};
  transition: all .25s;
  &:hover {
    cursor: ${({ disabled }: RowProps) => disabled ? 'not-allowed' : 'pointer'};
    opacity: 0.7;
  }
`

export const ClipComment = styled(Icon)`
  margin-right: 10px;
  margin-bottom: 2px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const FullResponse = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex: 1;
`

export const FileComment = styled.div`
  display: flex;
  margin-top: 8px;
  align-items: center;
  text-decoration: underline;
  color: ${BLUE};
  width: 100%;
  margin-bottom: 6px;
  transition: all .25s;
`

export const ReplyComment = styled.div`
  text-align: right;
  width: 100%;
  margin-top: 6px;
  padding-right: 6px;
  font-size: 12px;
  color: ${BLUE};
  font-style: italic;
  font-family: Avenir-Medium;
  font-weight: 500;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const ReplyIcon = styled(Icon)`
  margin-left: 6px;
`

export const RemoveParent = styled(Icon)`
  font-size: 12px;
  margin-left: 11px;
  flex: 1;
  text-align: left;
  margin-bottom: 4px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const UploadFileComment = styled(Upload)`
  .ant-upload-select-picture-card {
    border: none;
    width: auto;
    height: auto;
    margin: 0;
    @media (max-width: 767px) {
      width: 100%;
    }
  }
  span.ant-upload {
    padding: 0 !important;
    margin: 0 !important;
  }
  .ant-spin-spinning {
    margin-right: 10px !important;
  }
`

export const RemoveFileIcon = styled(Icon)`
  margin-left: 8px;
  color: ${RED};
  font-size: 11px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`