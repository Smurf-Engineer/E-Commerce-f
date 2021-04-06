/**
 * Styled Components - Created by david on 27/03/18.
 */
import styled from 'styled-components'
import AntdTabs from 'antd/lib/tabs'
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
  BLUE_SOFT
} from '../../theme/colors'
import TextArea from 'antd/lib/input/TextArea'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
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
  }
  .flexible-modal-mask {
    z-index: 10;
    position: absolute;
    height: 100vh;
  }
`

export const CollapseWrapper = styled.div`
  margin-bottom: 10px;
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
    top: 72px;
    z-index: 9;
    width: 100vw;
    height: calc(100vh - 158px);
    background: ${WHITE};
  }
  .ant-collapse-item .ant-collapse-header .arrow {
    display: none;
  }
  .ant-collapse-item-active .ant-collapse-header .arrow {
    position: absolute;
    left: calc(100% - 40px);
    display: inline;
    width: auto;
  }

  .ant-collapse-borderless .ant-collapse-item .ant-collapse-content {
    padding: 0 0 0 0;
  }
  @media (max-width: 1023px) {
    display: block;
    position: absolute;
    bottom: 0px;
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
`

export const PanelIcon = styled.img`
  max-width: 32px;
  width: 100%;
  margin-bottom: 8px;
  filter: contrast(0.15);
  object-fit: contain;
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
  background: ${({ color }: ColorProps) => color || GRAY_STRONG};
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

export const Layouts = styled.div`
  display: flex;
  @media (max-width: 1023px) {
    flex: 1;
  }
`

export const Variants = styled.div`
  display: flex;
  flex-flow: column;
  top: ${({ secondary }: RowProps) => (secondary ? '92px' : '38px')};
  z-index: 4;
  left: 28px;
  position: absolute;
  @media (max-width: 1023px) {
    top: ${({ secondary }: RowProps) => (secondary ? '92px' : '42px')};
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
  background: ${RED_TRANSPARENT};
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  font-size: 10px;
  border-radius: 50%;
  position: absolute;
  right: 4px;
  top: 6px;
  color: ${WHITE};
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
    width: 50%;
    margin: 0;
  }
  .ant-tabs-ink-bar {
    width: 50%;
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
  margin: 12px 2px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

export const RequestEdit = styled(Button)`
  display: flex;
  height: auto;
  flex-flow: column;
  border: 1px solid ${RED};
  width: 90%;
  padding: 4px;
  font-size: 12px;
  align-items: center;
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
  max-height: 366px;
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
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
  height: calc(100vh - 221px);
  flex-flow: column;
`

export const LayoutRight = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-flow: column;
`

export const Products = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
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
  height: auto;
  margin-bottom: 12px;
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
`

export const RenderSection = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 28px;
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
`

export const ParentText = styled.div`
  border-left: 2px solid ${RED_TRANSPARENT};
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 12px;
  color: ${GRAY_STRONG};
  background: ${GRAY_LIGHTEST};
`

export const MessageBody = styled.div`
  display: inline-flex;
  text-align: start;
  width: 100%;
  word-break: break-word;
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

export const ButtonWrapper = styled.div`
  margin-bottom: ${({ noMargin}: RowProps) => noMargin ? 'unset' : '16px'};
  margin-top: ${({ marginTop }: RowProps) => marginTop ? '-4px' : 'unset'};
  .ant-btn-primary  {
    background-color: ${({ secondary }: RowProps) => secondary  ? WHITE : BLUE};
    border-color: ${({ secondary }: RowProps) => secondary  ? GRAY_STRONG : BLUE};
    width: 138px;
    color: ${({ selected }: RowProps) => selected ? WHITE : GRAY_DARK};
  }
  .ant-btn-primary:hover {
    background-color: ${({ secondary }: RowProps) => secondary  ? GRAY_LIGHT : BLUE};
    border-color: ${({ secondary }: RowProps) => secondary  ? GRAY_LIGHT : BLUE};
  }
`

export const okButtonStyles = {
  background: BLUE,
  border: 'none',
  borderRadius: '2px'
}
