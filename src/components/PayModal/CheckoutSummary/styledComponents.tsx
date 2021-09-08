/**
 * Styled Components - Created by miguelcanobbio on 03/09/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { BLUE, WHITE, WHITE_TRANSPARENT } from '../../../theme/colors'
import Spin from 'antd/lib/spin'

export const Container = styled.div`
  position: relative;
`

export const OrderSummary = styled.div``

export const PlaceOrderButton = styled(Button)`
  height: 40px;
  width: 100%;
  border-radius: 2px;
  background-color: ${BLUE};
  color: ${WHITE};

  &:hover {
    border-color: ${BLUE};
    background-color: ${BLUE};
    color: ${WHITE};
  }
`

export const TotalDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 17px;
  margin-bottom: 28px;
`

export const TotalLabel = styled.div`
  font-weight: bold;
  font-size: 16px;
`

export const TotalValue = styled.div`
  font-weight: bold;
  font-size: 16px;
`

export const LoadingPaypal = styled.div`
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 56px;
  background: ${WHITE_TRANSPARENT};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const paypalButtonStyle = {
  label: 'paypal',
  size: 'responsive',
  color: 'blue',
  shape: 'rect',
  tagline: false
}
