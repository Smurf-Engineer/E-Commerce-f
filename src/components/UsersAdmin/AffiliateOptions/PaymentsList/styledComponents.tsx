/**
 * Styled Components - Created by eduardoquintero on 16/01/20.
 */
import styled from 'styled-components'
import { GRAY_SOFT, GRAY_DARK, GRAY_SKELETON, GRAY_LIGHT, RED } from '../../../../theme/colors'
import Icon from 'antd/lib/icon'

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
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

export const Header = styled.th`
  border-bottom: 1px solid ${GRAY_SOFT};
  text-align: left;
  padding: 8px 0;
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  text-align: left;

  @media (min-width: 320px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    line-height: 15px;
    padding: 8px 3px;
    font-size: 12px;
  }
`

interface LinkProps {
  disabled?: boolean
}

export const ItemContainer = styled.tr`
  cursor: ${({ disabled }: LinkProps) => (!disabled ? 'pointer' : 'normal')};
  &:hover {
    background-color: ${({ disabled }: LinkProps) =>
    !disabled ? GRAY_SKELETON : ''};
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
    padding: 8px 3px;
  }

  @media (max-width: 330px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 11px;
  }
`

export const TableTitle = styled.div`
  font-weight: bold;
  margin: 26px 0;
  font-size: 16px;
`

export const Clip = styled(Icon)`
  color: ${RED};
  margin-right: 12px;
  @media (max-width: 768px) {
    display: none;
  }
`

export const EmptyContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 24px;
  padding-right: 92px;
  margin-bottom: 24px;
`

export const Subtitle = styled.div`
  font-weight: normal;
  font-size: 14px;
  margin-top: 8px;
`