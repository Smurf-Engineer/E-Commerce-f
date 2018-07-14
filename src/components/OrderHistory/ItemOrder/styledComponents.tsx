/**
 * Styled Components - Created by miguelcanobbio on 13/07/18.
 */
import styled from 'styled-components'

export const Container = styled.tr``

interface CellProps {
  color?: string
  textAlign?: string
}

export const Cell = styled.td`
  border-bottom: 1px solid #d7d7d7;
  text-align: left;
  padding: 8px;
  color: ${({ color }: CellProps) => (color ? color : '#5f6062')};
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 35px;
  text-align: ${({ textAlign }: CellProps) =>
    textAlign ? textAlign : 'start'};

  @media (min-width: 320px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 12px;
  }
`
