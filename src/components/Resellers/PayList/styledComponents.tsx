/**
 * Styled Components - Created by Jesús Apodaca on 23/03/20.
 */
import styled from 'styled-components'
import { GRAY_LIGHT, GRAY_DARK, RED, BLUE, WHITE, WHITE_TRANSPARENT } from '../../../theme/colors'
import Icon from 'antd/lib/icon'
import Search from 'antd/lib/input/Search'
import Tooltip from 'antd/lib/tooltip'

interface ContainerProps {
  withoutPadding?: boolean
}

interface HeaderProps {
  textAlign?: string
  width?: string
}

interface CellProps {
  bold?: boolean
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
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  width: ${({ width }: HeaderProps) => width ? width : 'auto'};
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
  width: ${({ width }: HeaderProps) => width ? width : 'auto'};
  color: ${GRAY_DARK};
  font-size: 13px;
  letter-spacing: 0.1px;
  text-transform: ${({ bold }: CellProps) => bold ? 'uppercase' : 'capitalize'};;
  line-height: 35px;
  text-align: start;
  font-weight: ${({ bold }: CellProps) => bold ? 'bold' : 'normal'};
  &.error {
    color: ${RED};
  }
`

export const LoadingContainer = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  height: 100vh;
  background: ${WHITE_TRANSPARENT};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Clip = styled(Icon)`
  color: ${RED};
  margin-right: 4px;
`

export const FileName = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  &:hover {
    color: ${RED};
    text-decoration: underline;
  }
`

export const PayButton = styled.div`
  display: inline-flex;
  margin-left: 26px;
  background: ${BLUE};
  border: 1px solid ${BLUE};
  padding: 11px 68px;
  border-radius: 3px;
  color: ${WHITE};
  font-weight: normal;
  transition: all .2s;
  cursor: pointer;
  &:hover {
    background: ${WHITE};
    color: ${BLUE};  
  }
`

export const SearchInput = styled(Search)`
  border-radius: 0;
  width: 500px;
  & input {
    border-radius: 0;
    padding: 7px;
    height: 48px;
  }
`

export const HeaderSection = styled.div`
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const Mail = styled(Tooltip)`
  width: 100px;
  display: block;
  margin-right: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const TotalDiv = styled.div`
  display: flex;
  margin-left: 28px;
  align-items: center;
  max-width: 190px;
  width: 100%;
`

export const Amounts = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  margin-left: 14px;
  font-weight: bold;
`

export const LeftDiv = styled.div`
  display: flex;
`