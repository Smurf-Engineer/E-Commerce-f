/**
 * Styled Components - Created by eduardoquinterp on 19/08/20.
 */
import styled from 'styled-components'
import { WHITE } from '../../theme/colors'

export const Container = styled.div`
`

export const Text = styled.div`
  color: ${WHITE};
`

export const Image = styled.img`
  cursor: pointer;
  width: 20px;
`

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: scroll;
`

export const overlayStyle = {
  width: '276'
}

export const overlayMobileStyle = {
  width: '100%'
}