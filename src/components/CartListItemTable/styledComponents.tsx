/**
 * Styled Components - Created by gustavomedina on 04/05/18.
 */
import styled from 'styled-components'

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

// export const Row = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   border-bottom: ${({ noBorder }: RowProps) =>
//     noBorder ? 'none' : '1px solid #dcdcdc'};
//   padding: ${({ rowPadding }) => (rowPadding ? rowPadding : '8px 0')};
//   cursor: move;

//   @media (min-width: 320px) and (max-width: 480px) {
//     justify-content: space-between;
//   }
// `

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 8px;
  padding-top: 8px;
`

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #8c8c8c;
  padding-bottom: 4px;
`

export const Column = styled.td`
  outline: 1px solid red;
  padding: 0;
`
interface CellProps {
  width?: number
}
export const Cell = styled.div`
 text-align: left;
 margin-right:5px;
 width ${({ width }: CellProps) => (width ? width : 100)}%;
`

export const HeaderCell = styled.div`
 text-align: left;
 width ${({ width }: CellProps) => (width ? width : 100)}%;
`

interface TitleProps {
  align?: string
}

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  text-align: left;
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

export const DeleteItem = styled.div`
  color: #e61737;
  cursor: pointer;
`
