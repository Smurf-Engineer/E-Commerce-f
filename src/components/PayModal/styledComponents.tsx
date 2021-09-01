/**
 * Styled Components - Created by miguelcanobbio on 23/05/18.
 */
import Button from 'antd/lib/button'
import styled from 'styled-components'
import { BLUE, GRAY_LIGHT, WHITE } from '../../theme/colors'

interface DivProps {
  invoice?: boolean
  savingPdf?: boolean
}

interface ButtonProps {
  selected?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-flow: column;
`

export const ContainerMethods = styled.div`
  display: flex;
  /* justify-content: space-between; TODO: uncomment when left payment methods*/
`

export const MethodButton = styled(Button)`
  background-color: ${WHITE};
  border: 2px solid ${GRAY_LIGHT};
  border-radius: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  color: ${({ selected }: ButtonProps) => (selected ? BLUE : GRAY_LIGHT)};
  height: 40px;
  margin-left: 5px;
  width: 138.23px;

  &:hover,
  &::selection,
  &::after,
  &:focus {
    border-color: ${BLUE};
    color: ${BLUE};
  }

  border: 0.5px solid
    ${({ selected }: ButtonProps) => (selected ? BLUE : GRAY_LIGHT)};
`
