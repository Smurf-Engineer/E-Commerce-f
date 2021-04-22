/**
 * Styled Components - Created by miguelcanobbio on 17/08/18.
 */
import styled from 'styled-components'
import { GRAY_DARK, WHITE, GRAY } from '../../../theme/colors'

export const Container = styled.div`
  padding: 4px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Name = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-right: 16px;
`

interface OvalProps {
  color?: string
}

export const Oval = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid
    ${({ color }: OvalProps) =>
      color && color.toLowerCase() !== WHITE.toLowerCase() ? color : GRAY};
  background-color: ${({ color }: OvalProps) => color || WHITE};
  align-self: center;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`
