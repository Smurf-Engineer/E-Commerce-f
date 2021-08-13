/**
 * Styled Components - Created by miguelcanobbio on 18/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { BLUE, GRAY_DARK } from '../../theme/colors'
import Icon from 'antd/lib/icon'

export const Container = styled.div`
  width: 100%;
  padding-top: 24px;
`

export const CartContent = styled.div`
  width: 100%;
`

export const Text = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin: 6px 0;
`

export const CartList = styled.ul`
  padding: 0;
  height: 100%;
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 24px;
`

export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10%;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    margin-right: 0;
  }
`

export const CardNumber = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0;
`

export const InfoContainer = styled.div`
  @media (max-width: 768px) {
    width: 50%;
    margin-bottom: 20px;
  }
`

export const PaymentText = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const StyledImage = styled.img`
  margin-left: 8px;
  width: 42px;
  height: 25.5px;
`

export const EditInfoButton = styled(Button)`
  height: 40px;
  width: 138.23px;
  border-radius: 2px;
  background-color: #4a90e2;
  color: #fff;
  margin: 8px 0;
  margin-left: 0.5px;

  &:hover {
    border-color: #4a90e2;
    background-color: #4a90e2;
    color: #fff;
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