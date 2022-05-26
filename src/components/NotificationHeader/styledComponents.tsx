/**
 * Styled Components - Created by eduardoquinterp on 19/08/20.
 */
import styled from 'styled-components'
import { WHITE } from '../../theme/colors'

interface DivProps {
  active?: boolean
}

export const Container = styled.div`
`

export const Text = styled.div`
  color: ${WHITE};
`

export const Image = styled.img`
  cursor: pointer;
  width: 20px;
  border-radius: 50%;
  transition: all .25s;
  opacity: ${({ active }: DivProps) => active ? 0.4 : 1};
`

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: scroll;
  padding-left: 16px;
  max-width: 512px;
  width: 100%;
`

export const Empty = styled.div`
  padding: 25px;
`

export const overlayStyle = {
  maxWidth: '386px',
  width: '100%'
}

export const overlayMobileStyle = {
  width: '100%',
  zIndex: 1000
}