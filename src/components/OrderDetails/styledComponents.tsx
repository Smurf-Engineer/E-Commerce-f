/**
 * Styled Components - Created by jorge on 23/07/18.
 */
import styled from 'styled-components'

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
    margin-bottom: 24px;
  }
`
export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
`
export const Button = styled.button`
  background-color: #4a90e2;
  border-radius: 2px;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  height: 40px;
  letter-spacing: 0.11px;
  line-height: 22px;
  padding: 9px 22.8px;
`
export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 42px;
  padding-right: 34px;
`
export const OrderDelivery = styled.div``
export const DeliveryDate = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
`
export const DeliveryLabels = styled.div`
  color: #5f6062;
  display: inline-block;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-top: 10px;
  width: 137px;
`
export const DeliveryLabel = styled.div`
  margin-top: 12px;
`
export const DeliveryInfo = styled.div`
  color: #5f6062;
  display: inline-block;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-left: 110px;
  margin-top: 10px;
  width: 220px;
`
export const Info = styled.div`
  height: 22px;
  margin-top: 12px;
`
export const OrderSummaryContainer = styled.div`
  width: 222px;
`
export const Items = styled.div`
  margin-top: 40px;
  padding-right: 34px;
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
export const ReorderButton = styled.button`
  align-self: flex-end;
  background-color: #4a90e2;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  padding: 9px;
  text-align: center;
  width: 145px;
`
export const CartList = styled.ul`
  padding: 0;
`
