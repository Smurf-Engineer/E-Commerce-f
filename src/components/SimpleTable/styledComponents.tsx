/**
 * Styled Components - Created by eduardoquintero on 21/11/19.
 */
interface RowProps {
  noBorder?: boolean
  rowPadding?: string
}

import styled from 'styled-components'
import Icon from 'antd/lib/icon'
import { RED } from '../../theme/colors'

export const Container = styled.div``

export const Table = styled.div`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin-bottom: 20px;
  text-align: left;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 0;
  }
`

export const Body = styled.tbody``

export const TableRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${({ noBorder }: RowProps) =>
    noBorder ? 'none' : '1px solid #dcdcdc'};
  padding: ${({ rowPadding }) => (rowPadding ? rowPadding : '8px 0')};

  @media (min-width: 320px) and (max-width: 480px) {
    justify-content: space-between;
  }
  &.clickable {
    cursor: pointer;
  }
  min-height: 65px;
`

export const HeaderRow = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-bottom-color: #8c8c8c;
  border-bottom-style: solid;
  padding-bottom: 4px;
  align-items: center;
  @media (max-width: 480px) {
    display: none;
  }
`

export const Column = styled.td`
  outline: 1px solid red;
  padding: 0;
`

interface CellProps {
  width?: number
  tabletWidth?: number
}
export const Cell = styled.div`
 width ${({ width }: CellProps) => (width ? width : 10)}%;
 position: relative;
 &.unread {
   color: ${RED} !important;
 }
 &.badge::after {
  content: '';
  display: flex;
  position: absolute;
  left: 30px;
  width: 12px;
  height: 12px;
  background: ${RED};
  border-radius: 6px;
  top: calc(50% - 6px);
  border: none;
 }
 @media (min-width: 425px) and (max-width: 768px) {
  width ${({ tabletWidth }: CellProps) => (tabletWidth ? tabletWidth : 10)}%;
  &.badge::after {
    display: none;
  }
 }
`

interface TitleProps {
  align?: string
}

export const Title = styled.div`
  width: 58px;
  color: #5f6062;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  text-align: ${({ align }: TitleProps) => (align ? align : 'center')};
`

export const Price = styled.div`
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 43px;
  width: 58px;
  text-align: ${({ align }: TitleProps) => (align ? align : 'center')};
`

export const MoreIcon = styled(Icon)`
  transform: rotate(90deg);
  font-size: 30px;
  margin-right: -19px;
`

export const MobileLocker = styled.div`
  @media (min-width: 480px) {
    display: none;
  }
`

export const DesktopLocker = styled.div`
  @media (max-width: 480px) {
    display: none;
  }
`

export const DragCell = styled.div`
  display: flex;
  @media (max-width: 1024px) {
    display: none;
  }
`

export const DeleteButton = styled(Icon)`
  text-align: right;
  user-select: none;
  color: ${RED};
  font-size: 14px;
  letter-spacing: 0.1px;
  margin-left: 28px;
  line-height: 43px;
  cursor: pointer;
  transition: all .25s;
  &:hover {
    opacity: 0.4;
  }
`

export const Center = styled.div`
  user-select: none;
  width: 58px;
  text-align: center;
`

export const Thumbnail = styled.img`
  width: 180px;
  height: 100px;
  object-fit: contain;
`

export const MarkLabel = styled.div`
  color: ${RED};
  transition: all .25s;
  &:hover {
    opacity: 0.4;
  }
`