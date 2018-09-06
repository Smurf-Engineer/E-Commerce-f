/**
 * Styled Components - Created by david on 02/04/18.
 */
import styled from 'styled-components'
import { WHITE } from '../../theme/colors'

interface ContainerProps {
  hide?: boolean
}

export const Container = styled.div`
  align-items: center;
  background-color: ${WHITE};
  border-bottom: 1px solid gainsboro;
  display: flex;
  height: ${({ hide }: ContainerProps) => (!!hide ? 0 : 70)}px;
  justify-content: space-between;
  line-height: 16px;
  padding: 0px 16px 0 10px;
  position: relative;
`

export const Logo = styled.img`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const Icon = styled.img``

export const Text = styled.div`
  color: ${WHITE};
`
