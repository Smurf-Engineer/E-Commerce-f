/**
 * Styled Components - Created by miguelcanobbio on 23/05/18.
 */
import styled from 'styled-components'
import Checkbox from 'antd/lib/checkbox'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

export const InfoContainer = styled.div`
  width: 70%;
`

export const SummaryContainer = styled.div`
  width: 25%;
  padding-left: 20px;
`

export const SubTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 24px;
`

export const CardNumber = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0;
`

export const ShippingBillingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin 24px 10% 24px 0;
`

export const PaymentText = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
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
`

export const TitleStyled = styled.div`
  width: 300px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 24px;
`

export const StyledText = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  letter-spacing: 0.11px;
  line-height: 23px;
  font-size: 16px;
`

export const StyledDropText = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  letter-spacing: 0.11px;
  line-height: 23px;
  font-size: 16px;
  white-space: pre;
`

export const CartList = styled.ul`
  padding: 0;
`

export const StyledCheckbox = styled(Checkbox)`
  height: 36px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 5px 0;
`
