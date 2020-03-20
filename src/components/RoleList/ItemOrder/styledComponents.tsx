/**
 * Styled Components - Created by miguelcanobbio on 13/07/18.
 */
import styled from 'styled-components'
import {
  RED,
  GRAY_DARK,
  GRAY_LIGHTEST,
  GRAY_LIGHT
} from '../../../theme/colors'

export const Container = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #e6e6e5;
  }
`

interface CellProps {
  lower?: boolean
}

export const Cell = styled.td`
  border-bottom: 1px solid ${GRAY_LIGHT};
  text-align: left;
  padding: 4px 0;
  color: ${GRAY_DARK};
  font-size: 14px;
  letter-spacing: 0.1px;
  text-transform: ${({ lower }: CellProps) =>
    lower ? 'lowercase' : 'capitalize'};
  line-height: 35px;
  text-align: start;
  &.error {
    color: ${RED};
  }
`
export const ImageCell = styled.img`
  height: 82px;
  width: 82px;
  background-color: ${GRAY_LIGHTEST};
  object-fit: cover;
`
