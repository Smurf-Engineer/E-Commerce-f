/**
 * Styled Components - Created by eduardoquintero on 30/05/19.
 */
interface RowProps {
  noBorder?: boolean
  rowPadding?: string
}

import styled from 'styled-components'

export const Container = styled.div``

export const Table = styled.div`
  margin-top: 15px;
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin-bottom: 20px;

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
 white-space: nowrap;
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

export const Description = styled.div`
  color: #5f6062;
  width: 40%;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const DeleteButton = styled.div`
  text-align: right;
  user-select: none;
  color: #e61737;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 43px;
  cursor: pointer;
`

export const Center = styled.div`
  user-select: none;
  width: 58px;
  text-align: center;
`

export const Name = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
`
