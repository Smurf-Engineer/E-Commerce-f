/**
 * Styled Components - Created by jorge on 23/07/18.
 */
import styled from 'styled-components'
import AntdButton from 'antd/lib/button'

export const Container = styled.div``

export const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
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
  font-family: 'Avenir Next';
  justify-content: space-between;
  margin-bottom: 64px;
  margin-top: 48px;
  padding-right: 34px;

  @media (max-width: 768px) and (min-width: 320px) {
    align-items: center;
    margin-bottom: 24px;
    padding-right: 0px;
  }
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
    background-color: #4a90e2;
    border-color: #4a90e2;
  }
  .ant-btn-primary:hover {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }
`
export const Button = styled(AntdButton)`
  height: 40px;
  width: 93px;
`
export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 42px;
  padding-right: 34px;

  @media (max-width: 550px) and (min-width: 320px) {
    display: block;
    padding-right: 0px;
  }
`
export const OrderDelivery = styled.div`
  @media (max-width: 963px) and (min-width: 551px) {
    width: 50%;
  }
`
export const DeliveryDate = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
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
`
export const DeliveryLabels = styled.div`
  color: #5f6062;
  display: inline-block;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  width: 137px;
`
export const DeliveryLabel = styled.div`
  margin-bottom: 12px;
`
export const DeliveryData = styled.div`
  color: #5f6062;
  display: inline-block;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-left: 110px;
  width: 220px;

  @media (max-width: 963px) and (min-width: 320px) {
    margin-left: 9%;
    width: 100px;
  }
`

interface InfoProps {
  tracking?: boolean
}

export const Info = styled.div`
  color: ${({ tracking }: InfoProps) => (tracking ? '#e61737' : '#5f6062')};
  height: 22px;
  margin-bottom: 12px;
`
export const OrderSummaryContainer = styled.div`
  width: 222px;

  @media (max-width: 550px) and (min-width: 320px) {
    margin-top: 50px;
    width: 100%;
  }
`
export const Items = styled.div`
  margin-top: 100px;
  padding-right: 34px;

  @media (max-width: 550px) and (min-width: 320px) {
    padding-right: 0px;
  }
`
export const TitleStyled = styled.div`
  color: #5f6062;
  display: flex;
  font-family: 'Avenir Next';
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
  margin: 40px 10% 126px 0;

  @media (max-width: 425px) and (min-width: 320px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 58px;
    margin-right: 0px;
  }
`
export const SubTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 24px;
`
export const PaymentText = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
`
export const CardNumber = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0;
`
export const StyledImage = styled.img`
  margin-left: 8px;
  width: 42px;
  height: 25.5px;
`
