import Collapse from 'antd/lib/collapse'
import Icon from 'antd/lib/icon'
import Spin from 'antd/lib/spin'
import Tooltip from 'antd/lib/tooltip'
import styled from 'styled-components'
import {
  BLACK,
  BLUE,
  COLOR_IN_DESIGN,
  GRAY,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_LIGHTEST,
  RED,
  RED_TRANSPARENT,
  RED_TRANSPARENT_BRIGHT,
  WHITE,
  WHITE_TRANSPARENT
} from '../../theme/colors'
import { AVENIR_NEXT } from '../../theme/fonts'

const Panel = Collapse.Panel

interface ImagePreviewProps {
  src: string
}

interface DivProps {
  fullWidth?: boolean
  disabled?: boolean
  secondary?: boolean
  codeColor?: string
}

export const Container = styled.div`
  width: 100%;
  background-color: ${WHITE};
  display: inline-flex;
  position: relative;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 0 8px;
  }
  .ant-collapse .ant-collapse-item .ant-collapse-header {
    display: flex;
    flex-direction: row;
    color: ${GRAY_DARK};
    font-size: 12px;
    letter-spacing: 0.15px;
    line-height: 16px;
    padding: 0 !important;
    max-width: 168px;
    width: 100%;
  }
  .ant-collapse .ant-collapse-item {
    border-bottom: none;
  }
  .ant-collapse-item .ant-collapse-header .arrow {
    position: absolute;
    left: calc(100% - 40px);
    display: inline-flex;
    border: 1px solid ${BLUE};
    height: 24px;
    align-items: center;
    width: 24px;
    justify-content: center;
    border-radius: 50%;
    color: ${BLUE};
    bottom: 0;
  }
  .ant-collapse-item .ant-collapse-content-box {
    padding: 32px 0 0 8px!important;
  }
`

export const StrongText = styled.div`
  color: ${GRAY_DARK};
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
  width: 100%;
`

export const MailLink = styled.a`
  color: ${BLUE};
  font-size: 15px;
  margin-bottom: 10px;
  margin-right: 8px;
  width: 100%;
`

export const LoadingContainer = styled.div`
  width: 100%;
  position: absolute;
  z-index: 10;
  height: 100%;
  background: ${WHITE_TRANSPARENT};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 54px;
  @media (max-width: 768px) {
    margin-top: 24px;
  }
`

export const InspirationName = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
`

export const Text = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
  word-break: break-word;
  width: 100%;
  @media (max-width: 768px) {
    max-width: ${({ fullWidth }: DivProps) => fullWidth ? '100%' : '198px'};
  }
`

export const ProjectDescriptor = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
  word-break: break-word;
  width: 100%;
  background: ${GRAY_LIGHTEST};
  padding: 11px;
`

export const ProjectContainer = styled.div`
  flex: 1;
  margin-right: 28px;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  max-width: ${({ fullWidth }: DivProps) => fullWidth ? '100%' : '230px'};
  width: auto;
  min-width: 140px;
  margin-bottom: 18px;
  @media (max-width: 768px) {
    flex-direction: row;
    max-width: 100%;
    width: 100%;
    flex: unset;
  }
`

export const ColumnTiny = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  margin-bottom: 18px;
  max-width: 92px;
  min-width: 90px;
  flex: 1;
  @media (max-width: 768px) {
    flex-direction: row;
    max-width: 100%;
    flex: unset;
  }
`

export const ColumnSmall = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  min-width: 86px;
  margin-bottom: 18px;
  max-width: ${({ fullWidth }: DivProps) => fullWidth ? '100%' : '148px'};
  width: 100%;
  flex: 1;
  @media (max-width: 768px) {
    flex-direction: row;
    max-width: 100%;
    flex: unset;
  }
`

export const PaletteName = styled.div``

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap:wrap;
  ${({ secondary }: DivProps) => secondary ? `
    position: absolute;
    right: -18px;
    top: 46px;
    @media (max-width: 960px) {
      position: unset;
    }
  ` : ''}
`

export const AboutCollab = styled.div`
  display: flex;
  align-items: center;
  color: ${BLUE};
  transition: all .25s;
  position: absolute;
  top: 16px;
  right: 80px;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
    img {
      opacity: 0.5;
    }
  }
  @media (max-width: 768px) {
    position: unset;
    margin-bottom: 20px;
  }
`

export const CollabIcon = styled.img`
  max-width: 20px;
  margin-right: 8px;
  opacity: 0.7;
  filter: brightness(1.25);
`

export const Notes = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
`

export const LockerGrid = styled.div`
  max-width: 446px;
  width: 100%;
`

export const CollapsePanel = styled(Collapse)`
  display: flex;
  justify-content: flex-start;
`

export const PanelDiv = styled(Panel)`
  width: 100%;
  border-bottom: none !important;
`

export const TitleDiv = styled.div`
  font-weight: bold;
  color: ${GRAY_DARK} !important;
  font-size: 15px;
`

export const Ideas = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`

export const Inspiration = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`

export const ModalTitle = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
`

export const InfoBody = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 12px 0 12px -38px;
`

export const Images = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  column-gap: 15px;
  row-gap: 10px;
  justify-items: flex-start;
  margin-top: 10px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`

export const ImageContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 768px) {
    width: 160px;
  }
`

export const Image = styled.div`
  background-size: cover;
  background-position: center;
  background-image: url('${({ src }: ImagePreviewProps) => src || ''}');
  width: 200px;
  height: 200px;
  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
  background-color: ${GRAY_LIGHT};
`

export const DocIcon = styled(Icon)`
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 30px;
  color: ${GRAY_DARK};
  background: ${GRAY_LIGHTEST};
  &:hover {
    cursor: pointer;
    background: ${GRAY_LIGHT};
  }
  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
`

export const LogoImage = styled.img`
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 30px;
  color: ${GRAY_DARK};
  background: ${GRAY_LIGHTEST};
  padding: 34%;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
`

export const Color = styled.div`
  margin-bottom: 50px;
  display: flex;
  width: 70%;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 90%;
  }
`
export const Files = styled.div`
  display: flex;
  flex-direction: column;
`

export const ImageText = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  font-weight: 600;
  margin-top: 6px;
  overflow: hidden;
  white-space: nowrap;
`

export const Products = styled.div`
  margin: 42px 0;
  margin-right: 28px;
  display: flex;
  flex-direction: column;
  section {
    margin-right: 28px;
    @media (max-width: 768px) {
      margin-right: 0px;
    }
  }
  @media (max-width: 768px) {
    margin-right: 0px;
  }
`

export const Designs = styled.div`
  margin-top: 42px;
  display: flex;
  flex-direction: column;
`

export const BackContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 14px 0;
  color: ${BLUE};
  transition: all .25s;
  @media (max-width: 768px) {
    margin-top: 0;
    margin-bottom: 20px;
  }
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const ScreenTitle = styled.div`
  color: ${GRAY_DARK};
  display: flex;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 28px;
  align-items: center;
  @media (max-width: 768px) and (min-width: 320px) {
    justify-content: flex-start;
  }
`

export const ProjectHome = styled.img`
  max-width: 40px;
  margin-left: -6px;
  margin-right: 6px;
`

export const SpinContainer = styled.div`
  display: inline-flex;
  height: 60vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const AddProductButton = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed ${RED};
  height: 216px;
  margin-top: 13px;
  margin-left: 4px;
  max-width: 212px;
  width: 100%;
  border-radius: 3px;
  color: ${RED};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    background: ${RED_TRANSPARENT_BRIGHT};
  }
  @media (max-width: 480px) {
    margin: 0 auto;
    margin-top: 32px;
  }
`

export const AddLabel = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 32px;
    margin-bottom: 8px;
  }
`

export const buttonStyle = {
  background: RED_TRANSPARENT,
  color: WHITE,
  border: 'none',
  boxShadow: 'none'
}

export const cancelButtonStyle = {
  background: WHITE,
  color: GRAY_DARK,
  borderColor: GRAY_LIGHT,
  boxShadow: 'none'
}

export const MemberList = styled.div`
  display: inline-flex;
  align-items: center;
`

export const CircleMember = styled.div`
  color: ${WHITE};
  padding-top: 1px;
  padding-left: 1px;
  font-weight: bold;
  font-family: Avenir;
  border-radius: 25px;
  width: 24px;
  height: 24px;
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  margin-left: ${({ secondary }: DivProps) => secondary ? '-7px' : '0'};
  background: ${({ codeColor }: DivProps) => codeColor || COLOR_IN_DESIGN};
`

export const StyledPopOver = styled(Tooltip)`
  cursor: pointer;
`

export const PopoverText = styled.div`
  font-size: 12px;
  color: ${BLACK};
  font-family: Avenir;
  font-weight: normal;
`

export const PopOverValue = styled.div`
  margin: 7px 4px;
`

export const SharedIcon = styled(Icon)`
  font-size: 13px;
  display: inline-block;
  z-index: 9;
  margin-left: 4px;
  margin-right: 8px;
  max-width: 30px;
  width: 100%;
  color: #81afe5;
  transition: all .25s;
  padding: 8px 0px;
  border-radius: 50%;
  @media (max-width: 604px) {
    padding: 2px 0;
    max-width: 83%;
  }
`

export const AddMemberButton = styled.div`
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 25px;
  border: 1px dashed rgb(68, 104, 249);
  color: rgb(68, 104, 249);
  min-width: 110px;
  transition: all .25s;
  font-size: 11px;
  font-weight: normal;
  margin-top: -7px;
  margin-left: 14px;
  justify-content: center;
  &:hover {
    background: rgb(68, 104, 249);
    color: ${WHITE};
    border: 1px solid rgb(68, 104, 249);
    cursor: pointer;
  }
  @media (max-width: 480px) {
    margin-top: 10px;
    margin-left: 12px;
  }
`

export const InviteContainer = styled.div`
  margin: 22px 20px;
  font-family: Avenir;
  @media (max-width: 560px) {
    margin: 22px 0;
  }
`

export const InfoIcon = styled(Icon)`
  color: ${BLUE};
  transition: all .25s;
  margin-left: 8px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
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
    width: ${({ secondary }: DivProps) => secondary ? 'auto' : '100%'};
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
  ${({ disabled }: DivProps) => disabled ? `
    background: ${GRAY_LIGHT};
    &:hover {
      opacity: 1;
      cursor: not-allowed;
    }
  ` : ''}
`

export const BottomSection = styled.div`
  display: none;
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