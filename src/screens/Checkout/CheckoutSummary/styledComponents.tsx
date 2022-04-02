/**
 * Styled Components - Created by miguelcanobbio on 03/09/18.
 */
import styled from 'styled-components'
import { BLUE, BLUE_BRIGHT, GRAY_DARK, GRAY_LIGHT, GRAY_SOFT, RED_TRANSPARENT, WHITE } from '../../../theme/colors'
import Icon from 'antd/lib/icon'
import { AVENIR_NEXT } from '../../../theme/fonts'

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
  background: #69a1e3;
  border-radius: 25px;
  padding: 12px;
  color: ${WHITE};
  box-shadow: 0px 2px 4px 0px lightgrey;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const CancelButton = styled.div`
  text-align: center;
  margin-top: 21px;
  color: ${GRAY_SOFT};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  @media(max-width: 480px) {
    margin-top: 12px;
  }
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
  margin: 12px 0 12px -38px;
`

export const buttonStyle = {
  background: RED_TRANSPARENT,
  color: WHITE,
  border: 'none',
  boxShadow: 'none'
}

export const cancelButtonStyle = {
  background: WHITE,
  color: GRAY_DARK,
  borderColor: GRAY_LIGHT,
  boxShadow: 'none'
}

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
