/**
 * Styled Components - Created by miguelcanobbio on 23/05/18.
 */
import styled from 'styled-components'
import Checkbox from 'antd/lib/checkbox'
import { BLACK, BLUE, GRAY, GRAY_DARK, RED, WHITE } from '../../theme/colors'
import Icon from 'antd/lib/icon'

interface DivProps {
  invoice?: boolean
  savingPdf?: boolean
  secondary?: boolean
}

export const Container = styled.div`
  position: relative;
`

export const Content = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  @media (min-width: 320px) and (max-width: 768px) {
    flex-wrap: wrap;
    margin-top: ${({ invoice, savingPdf }: DivProps) => invoice && !savingPdf ? '78px' : 'auto'};
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
  ${({ secondary }: DivProps) => secondary ? `
    @media (max-width: 1023px) {
      margin-bottom: 60px;
    }
  ` : ''}
`

export const InfoContainer = styled.div`
  width: 70%;
  @media (max-width: 1090px) {
    width: unset;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    width: ${({ savingPdf }: DivProps) => savingPdf ? '70%' : '100%'};
  }
`

export const FAQSection = styled.div`
  text-align: center;
  margin-top: 44px;
`

export const DownloadInvoice = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  border: 1px solid ${RED};
  color: ${RED};
  padding: 7px 12px;
  text-align: center;
  height: 33px;
  border-radius: 3px;
  min-width: 165.38px;
  transition: all .25s;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    top: 50px;
  }
`

export const DownloadIcon = styled(Icon)`
  margin-right: 10px;
`

export const FAQBody = styled.div`
  text-align: left;
  font-size: 15px;
  margin-bottom: 54px;
  b {
    display: block;
  }
`

export const SummaryContainer = styled.div`
  width: 25%;
  padding-left: 20px;
  margin-top: -6px;
  @media (max-width: 1375px) and (min-width: 769px) {
    width: 308px;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    padding-left: ${({ savingPdf }: DivProps) => savingPdf ? '30px' : '8px'};
    width: ${({ savingPdf }: DivProps) => savingPdf ? '30%' : '100%'};
    margin-top: ${({ savingPdf }: DivProps) => savingPdf ? '-30px' : 'auto'};
  }
`

export const SubTitle = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 24px;
`

export const ShippingBillingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 10% 24px 0;

  @media (min-width: 320px) and (max-width: 768px) {
    flex-wrap: wrap;
    margin-right: 0px;
  }
`

export const StyledImage = styled.img`
  margin-left: 8px;
  width: 42px;
  height: 25.5px;
`

export const OrderNumberContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  @media (min-width: 320px) and (max-width: 768px) {
    justify-content: ${({ savingPdf }: DivProps) => savingPdf ? 'flex-start' : 'space-between'};
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
  max-width: 32px;
  object-fit: contain;
  margin-left: 8px;
  margin-bottom: 2px;
`

export const TitleStyled = styled.div`
  width: 300px;
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 14px;

  @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 18px;
  }
`

interface TextProps {
  redColor?: boolean
}

export const StyledText = styled.div`
  color: ${({ redColor }: TextProps) => (redColor ? RED : GRAY_DARK)};
  letter-spacing: 0.11px;
  line-height: 23px;
  font-size: 16px;
  @media (min-width: 320px) and (max-width: 768px) {
    text-align: right;
    margin-bottom: 10px;
  }
`

export const StyledInfoText = styled.div`
  color: ${({ redColor }: TextProps) => (redColor ? RED : GRAY_DARK)};
  letter-spacing: 0.11px;
  line-height: 23px;
  font-size: 16px;
`

export const StyledDropText = styled.div`
  color: #8c8c8c;
  letter-spacing: 0.11px;
  line-height: 23px;
  font-size: 16px;
  white-space: pre;
`

export const CartList = styled.ul`
  padding: 0;
`

export const ContainerCheckBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
`

export const StyledCheckbox = styled(Checkbox)`
  height: 36px;
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const StyledEmailPhoneText = styled.div`
  color: #bebebe;
  letter-spacing: 0.11px;
  line-height: 23px;
  font-size: 16px;
  white-space: pre;
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

export const AboutCollab = styled.div`
  display: flex;
  align-items: center;
  color: ${BLUE};
  transition: all .25s;
  position: absolute;
  top: 24px;
  font-weight: bold;
  font-family: Avenir;
  font-size: 13.5px;
  cursor: pointer;
  @media (max-width: 1023px) {
    top: 44px;
  }
`

export const CollabIcon = styled(Icon)`
  margin-right: 13px;
  margin-left: 2px;
`

export const StatusIcon = styled(Icon)`
  font-size: 18px;
  width: 100%;
  filter: drop-shadow(0px 2px 1px lightgray);
  @media (max-width: 1023px) {
    font-size: 28px;
  }
`

export const StatusLabel = styled.div`
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

export const TopSection = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 1090px) {
    justify-content: space-between;
    margin-bottom: 24px;
  }
`

export const BottomSection = styled.div`
  width: 95%;
`

export const PaymentLink = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #8782ff;
  border-radius: 5px;
  padding: 9px 0;
  padding-top: 6px;
`

export const StripeIcon = styled.img`
  max-width: 58px;
`
