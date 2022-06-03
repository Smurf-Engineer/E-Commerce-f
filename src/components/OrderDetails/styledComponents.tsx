/**
 * Styled Components - Created by jorge on 23/07/18.
 */
import styled from 'styled-components'
import AntdButton from 'antd/lib/button'
import {
  RED,
  BLUE,
  GRAY_DARK,
  RED_TRANSPARENT_LIGHT,
  GRAY_STRONG,
  GRAY,
  WHITE,
  BLACK,
  GRAY_SOFT
} from '../../theme/colors'
import Icon from 'antd/lib/icon'
import { AVENIR_NEXT } from '../../theme/fonts'
import Tooltip from 'antd/lib/tooltip'

interface DivProps {
  savingPdf?: boolean
  secondary?: boolean
}

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 35em;
`

export const Container = styled.div`
  position: relative;
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
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: -38px;
  a {
    color: ${BLUE};
    text-decoration: underline;
  }
`

export const WarningIcon = styled(Icon)``

export const buttonStyle = {
  background: BLUE,
  border: 'none',
}

export const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
  cursor: pointer;
  &:hover {
    color: #e61737;
  }
`
export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 34px;
  margin-top: 68px;
  padding-right: 34px;
  position: relative;
  @media (max-width: 1023px) {
    margin-top: ${({ secondary }: DivProps) => secondary ? '58px' : '75px'};
  }
  @media (max-width: 768px) and (min-width: 320px) {
    align-items: center;
    margin-bottom: 24px;
    padding-right: 0px;
    margin-top: 118px;
  }
  @media (max-width: 408px) {
    margin-top: 162px;
  }
`

export const DownloadInvoice = styled.div`
  position: absolute;
  right: 34px;
  top: 0;
  border: 1px solid ${RED};
  color: ${RED};
  padding: 7px 12px;
  text-align: center;
  height: 33px;
  border-radius: 3px;
  min-width: 90px;
  transition: all .25s;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    right: 0;
    top: 0;
  }
`

export const DownloadIcon = styled(Icon)`
  margin-right: 10px;
`

export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
`
export const ButtonWrapper = styled.span`
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;

  .ant-btn-primary {
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
  .ant-btn-primary:hover {
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
`
export const Button = styled(AntdButton)`
  height: 40px;
  width: 93px;
`

export const DataDiv = styled.div`
  margin-right: ${({ savingPdf }: DivProps) => savingPdf ? 'unset' : '22px'};
  @media (max-width: 1024px) {
    margin-right: none;
  }
`

export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 34px;
  flex-direction: row;

  @media (max-width: 658px) and (min-width: 320px) {
    display: ${({ savingPdf }: DivProps) => savingPdf ? 'flex' : 'block'};
    margin-top: ${({ savingPdf }: DivProps) => savingPdf ? '0' : '42px'};
    padding-right: 0px;
  }
`
export const OrderDelivery = styled.div`
  @media (max-width: 963px) and (min-width: 659px) {
    width: 50%;
  }
`

export const DeliveryDate = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-bottom: 25px;

  @media (max-width: 768px) and (min-width: 320px) {
    display: flex;
    justify-content: space-between;
  }
`
export const DeliveryInfo = styled.div`
  @media (max-width: 963px) and (min-width: 320px) {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  @media (max-width: 658px) {
    margin-top: 42px;
  }
`
export const DeliveryLabels = styled.div`
  color: ${GRAY_DARK};
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  width: ${({ savingPdf }: DivProps) => savingPdf ? '300px' : '202px'};
`
export const DeliveryLabel = styled.div`
  margin-bottom: 12px;
  @media (max-width: 768px) {
    margin-bottom: 16px;
    white-space: nowrap;
  }
`

export const DeliveryLabelSecondary = styled.div`
  margin-bottom: 12px;
  white-space: nowrap;
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`

export const DeliveryData = styled.div`
  color: #5f6062;
  display: inline-block;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-left: 60px;
  width: 220px;
  @media (max-width: 1039px) {
    margin-left: 0px;
  }
  @media (max-width: 963px) and (min-width: 320px) {
    margin-left: 9%;
    width: 160px;
  }
`

interface InfoProps {
  redColor?: boolean
  savingPdf?: boolean
  statusColor?: string
}

export const Info = styled.div`
  color: ${({ redColor }: InfoProps) => redColor ? RED : GRAY_DARK};
  height: 22px;
  margin-bottom: 12px;
  @media (max-width: 768px) {
    text-align: ${({ savingPdf }: InfoProps) => savingPdf ? 'left' : 'right'};
    margin-bottom: 16px;
  }
  white-space: nowrap;
`

export const InfoSecondary = styled.div`
  color: ${({ redColor }: InfoProps) => redColor ? RED : GRAY_DARK};
  height: 22px;
  margin-bottom: 12px;
  white-space: nowrap;
  @media (max-width: 940px) {
    white-space: normal;
  }
  @media (max-width: 768px) {
    text-align: ${({ savingPdf }: InfoProps) => savingPdf ? 'left' : 'right'};
    margin-bottom: 16px;
  }
`

export const StatusLabel = styled.div`
  color: ${BLACK};
  height: 22px;
  margin-bottom: 12px;
  font-weight: bold;
  font-family: Avenir;
  display: inline-block;
  padding: 0 13px;
  font-size: 14px;
  border-radius: 45px;
  background: ${({ statusColor }: InfoProps) => statusColor || GRAY};
  @media (max-width: 768px) {
    text-align: ${({ savingPdf }: InfoProps) => savingPdf ? 'left' : 'right'};
    margin-bottom: 16px;
  }
`

export const StatusImage = styled.img`
  width: 30px;
  margin-right: 9px;
  color: ${BLACK};
  padding: 4px;
  border-radius: 12px;
  margin-left: -17px;
  padding-right: 9px;
  margin-top: -5px;
  background: ${WHITE};
`

export const IconStatus = styled(Icon)`
  margin-right: 9px;
  color: ${BLACK};
  background: ${WHITE};
  padding: 6px;
  border-radius: 12px;
  margin-left: -17px;
  padding-right: 8px;
  margin-top: -5px;
`

export const OrderSummaryContainer = styled.div`
  width: 25%;

  @media (max-width: 1375px) and (min-width: 659px) {
    width: 258px;
  }

  @media (max-width: 930px) {
    margin-top: 30px;
  }

  @media (max-width: 658px) and (min-width: 320px) {
    margin-top: ${({ savingPdf }: DivProps) => savingPdf ? '0' : '50px'};;
    width: ${({ savingPdf }: DivProps) => savingPdf ? '30%' : '100%'};
  }
`
export const Items = styled.div`
  margin-top: 48px;
  padding-right: 34px;

  @media (max-width: 658px) and (min-width: 320px) {
    padding-right: 0px;
  }
`

export const FedexLabel = styled.div`
  color: ${BLUE};
  text-decoration: underline;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`

export const OpenIcon = styled(Icon)`
  margin-left: 8px;
  transform: scaleX(-1);
  font-size: 12px;
`

export const FedexIcon = styled.img`
  max-width: 40px;
  object-fit: contain;
  margin-right: 5px;
  margin-bottom: 2px;
`

export const TitleStyled = styled.div`
  color: #5f6062;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: space-between;
  line-height: 22px;
  margin-bottom: 24px;
`
export const CartList = styled.ul`
  padding: 0;
`
export const ShippingBillingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 10% 0px 0;

  @media (max-width: 658px) and (min-width: 320px) {
    flex-wrap: wrap;
    margin-right: 0px;
  }
`
export const ShippingBillingCard = styled.div`
  @media (max-width: 658px) and (min-width: 320px) {
    margin-right: 5px;
  }
`
export const SubTitle = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 24px;
`
export const StyledImage = styled.img`
  margin-left: 8px;
  width: 42px;
  height: 25.5px;
`
export const Annotation = styled.div`
  margin: 80px 0px 66px;

  @media (max-width: 658px) and (min-width: 320px) {
    margin-bottom: 58px;
  }
`

export const OrderActions = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  margin-top: -57px;
  right: 60px;
  @media (max-width: 1023px) {
    top: 40px;
    right: 22px;
    margin-top: 0px;
  }
`

export const FAQSection = styled.div`
  text-align: center;
  margin-top: 44px;
  margin-right: 28px;
  @media (max-width: 767px) {
    margin-right: 0;
  }
`

export const Title = styled.div`
  height: 27px;
  color: #5f6062;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  margin-bottom: 40px;
`

export const FAQBody = styled.div`
  text-align: left;
  font-size: 15px;
  margin-bottom: 54px;
  b {
    display: block;
  }
`

export const DeleteButton = styled.div`
  color: ${GRAY_SOFT};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const StyledText = styled.div`
  color: ${GRAY_DARK};
  letter-spacing: 0.11px;
  line-height: 23px;
  font-size: 16px;
`

export const ErrorMessage = styled.div`
  position: absolute;
  top: 0;
  border: 1px solid ${RED};
  background: ${RED_TRANSPARENT_LIGHT};
  right: 20px;
  padding: 20px;
  color: ${RED};
  width: 495px;
  text-align: center;
  @media (min-width: 320px) and (max-width: 800px) {
    position: relative;
    width: 100%;
    right: 0;
  }
`

export const Paragraph = styled.div`
  a {
    color: ${BLUE};
    text-decoration: underline;
  }
`

export const InvoiceDiv = styled.div`
  margin-bottom: 40px;
`

export const InvoiceTitle = styled.div`
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 12px;
  font-family: Avenir-Medium;
`

export const InvoiceSubtitle = styled.div`
  font-weight: bold;
  margin-bottom: 12px;
`

export const InvoiceIcon = styled(Icon)`
  margin-right: 8px;
  color: ${BLUE};
`

export const SavingContainer = styled.div`
  position: absolute;
  width: 100%;
  background: #ffffffc9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 29;
`

export const ButtonEdit = styled.div`
  border: 1px solid ${GRAY_SOFT};
  padding: 5px 10px;
  border-radius: 3px;
  margin-right: 12px;
  color: ${GRAY_STRONG};
  font-size: 12px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    background: ${GRAY_SOFT};
    color: ${WHITE};
  }
`

export const EditIcon = styled(Icon)`
  background: #ffd277;
  margin-right: 16px;
  font-size: 18px;
  padding: 5px;
  border-radius: 3px;
  color: ${WHITE};
  box-shadow: 1px 2px 3px 0px #d3d3d3;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const AboutCollab = styled.div`
  display: flex;
  align-items: center;
  color: ${BLUE};
  transition: all .25s;
  position: absolute;
  margin-top: -50px;
  margin-left: -4px;
  font-weight: bold;
  font-family: Avenir;
  font-size: 12px;
  cursor: pointer;
  @media (max-width: 1023px) {
    top: 94px;
    left: 22px;
  }
`

export const CollabIcon = styled(Icon)`
  margin-right: 8px;
`

export const StatusIcon = styled(Icon)`
  font-size: 18px;
  width: 100%;
  filter: drop-shadow(0px 2px 1px lightgray);
  @media (max-width: 1023px) {
    font-size: 28px;
  }
`

export const StatusTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-family: Avenir;
  font-size: 16px;
  margin-bottom: 24px;
  margin-top: 38px;
  @media (min-width: 1024px) {
    font-size: 16px;
  }
  @media (min-width: 1441px) {
    font-size: 18px;
  }
  @media (min-width: 1800px) {
    font-size: 20px;
    padding: 0;
  }
  @media (max-width: 1023px) {
    color: ${WHITE};
    padding: 0;
    font-size: 19px;
    margin-top: 54px;
  }
`

export const StatusDescription = styled.div`
  margin-bottom: 8px;
  text-align: center;
  @media (min-width: 1024px) {
    font-size: 14px;
  }
  @media (min-width: 1441px) {
    font-size: 16px;
  }
  @media (min-width: 1800px) {
    font-size: 18px;
    padding: 0;
  }
  @media (max-width: 1023px) {
    color: ${WHITE};
    padding: 9;
    font-size: 19px;
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
    bottom: 44px;
    z-index: 999;
  }
`

export const StatusTop = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  padding: 10px;
  background: #c7e777;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  font-weight: bold;
  font-family: Avenir;
  @media (max-width: 648px) {
    position: unset;
    border-top-left-radius: unset;
    border-top-right-radius: unset;  
  }
`

export const EditContent = styled.div`
  margin: 22px 0 28px -38px;
`

export const TitleEdit = styled.div`
  text-align: center;
  font-weight: bold;
  font-family: Avenir;
`

export const CloseButtonStatus = styled.div`
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 17px;
  font-size: 12px;
  color: ${WHITE};
  background: ${RED};
  box-shadow: 0px 2px 4px -1px ${GRAY};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  @media (min-width: 1441px) {
    font-size: 14px;
  }
  @media (min-width: 1800px) {
    font-size: 16px;
  }
  @media (max-width: 1023px) {
    box-shadow: none;
    border: 1px solid ${WHITE};
    color: ${WHITE};
    background: ${BLACK};
    margin-top: 0px;
  }
`

export const StyledPopOver = styled(Tooltip)`
  cursor: pointer;
`

export const InfoIcon = styled(Icon)`
  display: inline-flex;
  margin-left: 10px;
  font-size: 14px;
  margin-right: -10px;
`

export const PopoverText = styled.div`
  font-size: 12px;
  color: ${BLACK};
  font-family: Avenir;
  font-weight: normal;
`