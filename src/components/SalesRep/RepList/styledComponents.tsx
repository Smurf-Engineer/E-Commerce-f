/**
 * Styled Components - Created by Jesús Apodaca on 23/03/20.
 */
import styled from 'styled-components'
import { GRAY_LIGHT, GRAY_DARK, RED } from '../../../theme/colors'

interface ContainerProps {
  withoutPadding?: boolean
}

interface HeaderProps {
  textAlign?: string
}

interface CellProps {
  lower?: boolean
  width?: string
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 34px;
  align-items: flex-end;
  padding-right: ${({ withoutPadding }: ContainerProps) =>
    withoutPadding ? '0' : '32px'};
  @media (min-width: 320px) and (max-width: 768px) {
    padding-right: 0;
    align-items: center;
  }
`

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom 24px;
`

export const Row = styled.tr``

export const RepDiv = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #e6e6e5;
  }
`

export const Header = styled.th`
  border-bottom: 1px solid #818181;
  text-align: left;
  padding: 8px 0;
  color: ${GRAY_DARK};
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

export const Cell = styled.td`
  border-bottom: 1px solid ${GRAY_LIGHT};
  text-align: left;
  padding: 4px 0;
  width: ${({ width }: CellProps) => (width ? width : 'auto')};
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

export const LoadingContainer = styled.div`
  width: 100%;
  height: 416px;
  display: flex;
  justify-content: center;
  align-items: center;
`
