import styled from 'styled-components'
import { LEAF, WHITE, BLACK_SEMILIGHT, BLUE, BLUE_DARK, GRAY_LIGHT } from '../../theme/colors'

interface ButtonProps {
  disabled: boolean
}

export const ModalContainer = styled.div`
  display: flex;
  flex-flow: column;
`

export const BodyContent = styled.div`
  padding: 0;
  background: ${BLACK_SEMILIGHT};
  display: flex;
  flex-direction: column;
`
export const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${LEAF};
  color: ${WHITE};
  padding: 10px;
  text-align: center;
`

export const Footer = styled.div`
  padding: 10px;
  font-weight: 600;
  color: ${WHITE}
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const EditButton = styled.div`
  align-self: center;
  padding: 13px;
  font-size: 14px;
  width: 300px;
  text-align: center;
  color: ${WHITE};
  border-radius: 2px;
  transition: all 0.25s ease;
  &:hover {
    cursor: ${({ disabled }: ButtonProps) =>
    disabled ? 'default' : 'pointer'};
    background-color: ${({ disabled }: ButtonProps) =>
    disabled ? GRAY_LIGHT : BLUE_DARK};
  }
  background-color: ${({ disabled }: ButtonProps) =>
    disabled ? GRAY_LIGHT : BLUE};
  flex: 1;
`

export const Image = styled.img`
  width: 100%;
`

export const Name = styled.div`
  flex: 2;
`