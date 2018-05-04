/**
 * Styled Components - Created by gustavomedina on 04/05/18.
 */
import styled from 'styled-components'

interface RowProps {
  noBorder?: boolean
  rowPadding?: string
}

export const Container = styled.div`
  background-color: #222;
`

export const Text = styled.div`
  color: #fff;
`

export const Table = styled.div`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 15px;
  padding-left: 16px;
  padding-right: 16px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 0;
  }
`

export const Body = styled.tbody``

export const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${({ noBorder }: RowProps) =>
    noBorder ? 'none' : '1px solid #dcdcdc'};
  padding: ${({ rowPadding }) => (rowPadding ? rowPadding : '8px 0')};
  cursor: move;

  @media (min-width: 320px) and (max-width: 480px) {
    justify-content: space-between;
  }
`

export const HeaderRow = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-bottom-color: #8c8c8c;
  border-bottom-style: solid;
  padding-bottom: 4px;
  justify-content: space-between;
`

export const Column = styled.td`
  outline: 1px solid red;
  padding: 0;
`
interface CellProps {
  width?: number
}
export const Cell = styled.div`
 width ${({ width }: CellProps) => (width ? width : 10)}%;
`

interface TitleProps {
  align?: string
}

export const Title = styled.div`
  width: 58px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  text-align: ${({ align }: TitleProps) => (align ? align : 'center')};
`

export const Price = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 43px;
  width: 58px;
  text-align: ${({ align }: TitleProps) => (align ? align : 'center')};
`

export const MobileEmtpytable = styled.div`
  padding: 50px 40px 50px;
  border-bottom: 1px solid #dcdcdc;
  color: #bebebe;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 21px;
  text-align: center;
`
