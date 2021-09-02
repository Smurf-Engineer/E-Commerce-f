/**
 * Styled Components - Created by miguelcanobbio on 03/09/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { BLUE, WHITE } from '../../../theme/colors'

export const Container = styled.div``

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

export const paypalButtonStyle = {
  label: 'paypal',
  size: 'responsive',
  color: 'blue',
  shape: 'rect',
  tagline: false
}
