/**
 * Styled Components - Created by eduardoquintero on 16/01/20.
 */
import styled from 'styled-components'
import {
  RED,
  GRAY_DARK,
  GRAY_SKELETON,
  GRAY_LIGHT
} from '../../../theme/colors'

export const Container = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${GRAY_SKELETON};
  }
`

interface CellProps {
  color?: string
  textAlign?: string
}

export const Cell = styled.td`
  border-bottom: 1px solid ${GRAY_LIGHT};
  text-align: left;
  padding: 8px 0;
  color: ${({ color }: CellProps) => (color ? color : GRAY_DARK)};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 35px;
  text-align: ${({ textAlign }: CellProps) =>
    textAlign ? textAlign : 'start'};
  &.error {
    color: ${RED};
  }
  @media (min-width: 331px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 12px;
  }

  @media (max-width: 330px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 11px;
  }
`

export const Link = styled.p`
  text-decoration: underline;
  color: ${RED};
`
