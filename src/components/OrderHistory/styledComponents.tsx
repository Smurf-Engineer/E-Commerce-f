/**
 * Styled Components - Created by miguelcanobbio on 13/07/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  padding-right: 32px;
`

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`

export const Row = styled.tr``

interface HeaderProps {
  textAlign?: string
}

export const Header = styled.th`
  border-bottom: 1px solid #818181;
  text-align: left;
  padding: 8px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  text-align: ${({ textAlign }: HeaderProps) =>
    textAlign ? textAlign : 'start'};

  @media (min-width: 320px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 12px;
    line-height: 15px;
  }
`

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
