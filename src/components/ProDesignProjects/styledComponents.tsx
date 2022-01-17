/**
 * Styled Components - Created by eduardoquintero on 17/12/20.
 */
import styled from 'styled-components'
import Badge from 'antd/lib/badge'
import {
  BLACK,
  BLUE,
  COLOR_IN_DESIGN,
  GRAY,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_STRONG,
  RED,
  RED_TRANSPARENT,
  WHITE,
  WHITE_TRANSPARENT
} from '../../theme/colors'
import Icon from 'antd/lib/icon'
import { AVENIR_NEXT } from '../../theme/fonts'
import Tooltip from 'antd/lib/tooltip'
import Checkbox from 'antd/lib/checkbox/Checkbox'

interface ContainerProps {
  withoutPadding?: boolean
}

interface HeaderProps {
  textAlign?: string
  width?: string
}

interface CellProps {
  bold?: boolean
  width?: string
  secondary?: boolean
  codeColor?: string
}

export const Container = styled.div`
  padding-bottom: 36px;
  width: 100%;
  margin-top: -64px;
  position: relative;
  @media (max-width: 768px) {
    margin-top: -14px;
  }
`

export const ModalTitle = styled.div`
  color: ${GRAY_DARK};
  font-family: Avenir;
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

export const StyledBadge = styled(Badge)``

export const Subtitle = styled.div`
  max-width: 866px;
  width: 100%;
  margin-right: 28px;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`

export const Title = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 18px;
`

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 32px;
  align-items: center;
  @media (max-width: 768px) {
    padding-left: 12px;
  }
  @media (max-width: 425px) {
    flex-flow: column;
    text-align: center;
  }
`

export const AddButton = styled.div`
  width: 100%;
  padding: 10px 6px;
  max-width: 128px;
  border: 2px solid ${BLUE};
  color: ${BLUE};
  transition: all .25s;
  margin-left: 28px;
  @media (max-width: 425px) {
    margin-top: 28px;
  }
  &:hover {
    cursor: pointer;
    background: ${BLUE};
    color: ${WHITE};
  }
`

export const CarouselContainer = styled.div`
  margin-top: 38px;
  margin-bottom: 28px;
  margin-right: 34px;
  @media (max-width: 768px) {
    margin-right: 0px;
  }
  img {
    object-fit: contain !important;
    width: 100% !important;
    border-radius: 3px !important;
  }
  & .slick-prev {
    margin-left: 30px;
  }
  & .slick-next {
    margin-right: 20px;
  }
  .slick-dots {
    bottom: 25px;
    li {
      button {
        opacity: 0.6;
        background: none !important;
      }
      button:before {
        opacity: 1;
        color: #e7e7e7;
        filter: drop-shadow(0px 0px 1px white);
        font-size: 12px !important;
      }
      &.slick-active {
        button {
          opacity: 1;
          color: #3e3d3d !important;
        }
      }
    }
  }
`

export const BackContainer = styled.div`
  display: none;
  align-items: center;
  margin-bottom: 24px;
  position: absolute;
  left: 18px;
  top: -48px;
  width: 76px;
  font-size: 14px;
  color: ${RED};
  @media (max-width: 768px) {
    display: flex;
  }
  &:hover {
    cursor: pointer;
  }
`

export const ScreenTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`

export const FAQSection = styled.div`
  text-align: center;
  margin-top: 56px;
  margin-right: 28px;
  @media (max-width: 767px) {
    margin-right: 0;
  }
`

export const FAQBody = styled.div`
  text-align: left;
  font-size: 15px;
  margin-bottom: 54px;
  b {
    display: block;
  }
`

export const FaqTitle = styled.div`
  font-weight: bold;
  margin-bottom: 28px;
  font-size: 18px;
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  align-items: flex-end;
  padding-right: ${({ withoutPadding }: ContainerProps) =>
    withoutPadding ? '0' : '32px'};
  @media (min-width: 320px) and (max-width: 768px) {
    padding-right: 0;
    align-items: center;
  }
`

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom 24px;
`

export const Row = styled.tr``

export const Header = styled.th`
  border-bottom: 1px solid #818181;
  text-align: left;
  padding: 8px 0;
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  width: ${({ width }: HeaderProps) => width ? width : 'auto'};
  text-align: ${({ textAlign }: HeaderProps) =>
    textAlign ? textAlign : 'start'};

  @media (min-width: 320px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 11px;
    line-height: 15px;
    padding-right: 5px;
  }
  @media (max-width: 604px) {
    font-size: 10px;
  }
`

export const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #e6e6e5;
  }
`

export const Cell = styled.td`
  border-bottom: 1px solid ${GRAY_LIGHT};
  text-align: left;
  padding: 4px 0;
  width: ${({ width }: HeaderProps) => width ? width : 'auto'};
  color: ${GRAY_DARK};
  font-size: 14px;
  letter-spacing: 0.1px;
  text-transform: capitalize;
  line-height: 35px;
  text-align: ${({ textAlign }: HeaderProps) =>
    textAlign ? textAlign : 'start'};
  font-weight: ${({ bold }: CellProps) => bold ? 'bold' : 'normal'};
  &.error {
    color: ${RED};
  }
  @media (max-width: 1024px) {
    line-height: 24px;
  }
  @media (max-width: 768px) {
    font-size: 11px;
    line-height: 20px;
  }
  @media (max-width: 604px) {
    font-size: 10px;
    padding-right: 8px;
    ${({ secondary }: CellProps) => secondary ? `
      display: flex;
      flex-direction: column-reverse;
    ` : ''} 
  }
`

export const DeleteButton = styled(Icon)`
  font-size: 14px;
  display: block;
  z-index: 9;
  margin-right: 8px;
  max-width: 30px;
  width: 100%;
  transition: all .25s;
  padding: 8px 0px;
  border-radius: 50%;
  &:hover {
    color: ${WHITE};
    background: ${RED};
  }
`

export const LoadingContainer = styled.div`
  position: fixed;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: ${WHITE_TRANSPARENT};
`

export const InfoSection = styled.div`
  display: flex;
  flex-flow: column;
  margin: 54px 0;
  height: 64px;
  font-style: italic;
  justify-content: space-between;
`

export const Arrow = styled.img`
  height: 60px !important;
  width: 50px !important;
  padding: 20px !important;
  text-align: center !important;
  z-index: 1 !important;
  background-color: ${BLACK} !important;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07) !important;
  &:hover {
    opacity: 0.7;
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
  display: flex;
  align-items: center;
`

export const CircleMember = styled.div`
  color: ${WHITE};
  padding-top: 3px;
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
  margin-left: ${({ secondary }: CellProps) => secondary ? '-7px' : '0'};
  background: ${({ codeColor }: CellProps) => codeColor || COLOR_IN_DESIGN};
`

export const StyledPopOver = styled(Tooltip)`
  cursor: pointer;
`

export const PopoverText = styled.div`
  font-size: 12px;
  color: ${BLACK};
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

export const StatusTitleIcon = styled.img`
  max-width: 60px;
  @media (max-width: 1023px) {
    max-width: 54px;
    margin-top: -8px;
    margin-bottom: 12px;
  }
`

export const CardIcon = styled.img`
  max-width: 30px;
  margin-right: 12px;
`

export const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export const MobileContainer = styled.div`
  height: calc(100vh - 30px);
  position: fixed;
  @media (max-height: 1023px) {
    font-size: 14px !important;
  }
  @media (max-height: 768px) {
    font-size: 11px !important;
  }
`

export const StatusTitle = styled.div`
  font-size: 17px;
  font-weight: 900;
  font-family: Avenir-Medium;
  text-align: center;
  margin-bottom: 24px;
  color: ${BLACK};
  @media (max-width: 1023px) {
    color: ${WHITE};
  }
`

export const StatusSubTitle = styled.div`
  margin-bottom: 28px;
  padding: 0 10px;
  @media (max-width: 1023px) {
    color: ${WHITE};
    margin-bottom: 50px;
    padding: 0 20px;
    margin-top: 26px;
  }
  @media (max-width: 767px) {
    margin-bottom: 30px;
  }
  @media (max-width: 648px) {
    margin-top: 0px;
  }
`

export const CheckboxStyled = styled(Checkbox)`
  color: ${GRAY_STRONG};
  display: flex;
  width: 100%;
  font-size: 12px !important;
  justify-content: center;
  &.ant-checkbox-wrapper {
    margin-left: 0px;
  }
  .ant-checkbox {
    font-size: 12px;
  }
  .ant-checkbox-inner {
    width: 14px;
    height: 14px;
  }
  .ant-checkbox-inner:after {
    left: 3px;
    top: 1px;
  }
  @media (max-width: 1023px) {
    margin-left: 0px;
    margin-bottom: 30px;
    color: ${WHITE};
  }
`

export const AboutCollab = styled.div`
  margin-top: 34px;
  display: flex;
  align-items: center;
  color: ${BLUE};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
    img {
      opacity: 0.5;
    }
  }
`

export const CollabIcon = styled.img`
  max-width: 20px;
  margin-right: 8px;
  opacity: 0.7;
  filter: brightness(1.25);
`

export const StatusCardsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
  padding: 0 10px;
  @media (max-width: 1023px) {
    color: ${WHITE};
    flex-flow: column;
    margin-bottom: 12px;
  }
`

export const StatusCard = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  margin-right: 12px;
  max-width: 286px;
  &:last-child {
    margin-right: 0px;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`

export const StatusCardMobile = styled.div`
  display: none;
  flex-flow: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 8px;
  @media (max-width: 1023px) {
    display: flex;
  }
`

export const StatusMobileBody = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 0;
  margin-bottom: 26px;
`

export const StatusCardLabel = styled.div`
  width: 100%;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: bold;
  font-family: Avenir;
  font-size: 12px;
  @media (max-width: 1023px) {
    justify-content: flex-start;
    font-size: 18px;
    margin-bottom: 6px;
  }
`

export const StatusImage = styled.img`
  max-width: 258px;
  width: 100%;
  margin: 22px 0;
  padding: 0 11px;
  box-shadow: 0px 3px 7px 2px ${GRAY_LIGHT};
  @media (max-width: 1023px) {
    margin: 0;
    margin-right: 10px;
    max-width: 90px;
    align-self: flex-start;
    box-shadow: none;
  }
  @media (max-width: 640px) {
    max-width: 74px;
    margin-right: 0;
    margin-left: -14px;
  }
`

export const StatusDescription = styled.div`
  padding: 0 14px;
  @media (min-width: 1024px) {
    font-size: 11px;
  }
  @media (max-width: 1023px) {
    color: ${WHITE};
    padding: 0;
  }
`

export const ArrowStatus = styled.img`
  max-width: 24px;
  margin-right: 12px;
  align-self: center;
  margin-bottom: 78px;
  @media (max-width: 1023px) {
    display: none;
  }
`

export const BottomSectionStatus = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-flow: column;
  align-items: center;
  @media (max-width: 1023px) {
    position: fixed;
    bottom: 16px;
    z-index: 999;
  }
`

export const ArrowLong = styled.img`
  max-width: 265px;
  margin-top: -24px;
  @media (max-width: 1023px) {
    display: none;
  }
`

export const CloseButtonStatus = styled.div`
  border: 1px solid ${GRAY};
  padding: 10px 12px;
  border-radius: 8px;
  margin-top: 17px;
  font-size: 12px;
  color: ${GRAY_STRONG};
  box-shadow: 0px 2px 4px -1px ${GRAY};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  @media (max-width: 1023px) {
    box-shadow: none;
    border: 1px solid ${WHITE};
    color: ${WHITE};
    background: ${BLACK};
    margin-top: 0px;
  }
`