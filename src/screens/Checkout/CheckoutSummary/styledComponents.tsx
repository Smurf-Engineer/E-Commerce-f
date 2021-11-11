/**
 * Styled Components - Created by miguelcanobbio on 03/09/18.
 */
import styled from 'styled-components'
import { BLUE, BLUE_BRIGHT, WHITE } from '../../../theme/colors'
import Icon from 'antd/lib/icon'

export const Container = styled.div``

export const PlaceOrderButton = styled.div`
  display: flex;
  margin-top: 28px;
  justify-content: center;
  align-items: center;
  background: ${BLUE};
  border-radius: 25px;
  padding: 12px;
  color: ${WHITE};
  box-shadow: 0px 2px 4px 1px #c3c3c3;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    background: ${BLUE_BRIGHT};
  }
`

export const ContinueButton = styled.div`
  display: flex;
  margin-top: 28px;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 25px;
  border: 1px solid #4a90e282;
  padding: 12px;
  color: ${BLUE};
  box-shadow: 0px 2px 7px -1px lightgrey;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    background: #69a1e3;
    color: ${WHITE};
  }
`

export const ContinueIcon = styled(Icon)`
  font-size: 10px;
  margin-right: -12px;
  margin-left: 6px;
`

export const PlaceIcon = styled(Icon)`
  font-size: 14px;
  margin-right: 8px;
  margin-top: -1px;
`

export const paypalButtonStyle = {
  label: 'paypal',
  size: 'responsive',
  color: 'blue',
  shape: 'rect',
  tagline: false
}
