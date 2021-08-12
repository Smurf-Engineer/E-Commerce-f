/**
 * Styled Components - Created by miguelcanobbio on 23/05/18.
 */
import styled from 'styled-components'
import Checkbox from 'antd/lib/checkbox'
import { BLUE, GRAY_DARK, RED } from '../../theme/colors'
import Icon from 'antd/lib/icon'

export const Container = styled.div``

export const Content = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: 320px) and (max-width: 768px) {
    flex-wrap: wrap;
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

export const InfoContainer = styled.div`
  width: 70%;

  @media (min-width: 320px) and (max-width: 768px) {
    width: 100%;
  }
`

export const FAQSection = styled.div`
  text-align: center;
  margin-top: 44px;
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

  @media (max-width: 1375px) and (min-width: 769px) {
    width: 308px;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    padding-left: 8px;
    width: 100%;
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
    justify-content: space-between;
  }
`

export const TitleStyled = styled.div`
  width: 300px;
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 24px;

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