import styled from 'styled-components'
import {
  LEAF,
  WHITE,
  BLACK_SEMILIGHT,
  BLUE,
  BLUE_DARK,
  GRAY_LIGHT,
  COD_GRAY,
  BLACK,
  COD_GRAY_DARK
} from '../../theme/colors'

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
  margin-top: 10px;
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

export const TagsContainer = styled.div`
  flex: 2;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`

export const Tag = styled.div`
  background: ${COD_GRAY};
  padding: 10px;
  border-radius: 20px;
  min-width: 110px;
  text-align: center;
  transition: background-color 0.3s ease;
  margin: 10px 10px 0 0;
  &:hover {
    cursor: pointer;
    background: ${COD_GRAY_DARK};
  }
  &.selected {
    background: ${BLACK};
  }
`