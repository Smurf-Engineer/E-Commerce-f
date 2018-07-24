/**
 * Styled Components - Created by gustavomedina on 04/05/18.
 */
import styled from 'styled-components'
import Select from 'antd/lib/select'
import Input from 'antd/lib/input'
import InputNumber from 'antd/lib/input-number'

type SelectType = {
  selectWidth?: string
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

  @media (max-width: 480px) {
    margin-bottom: 0;
    padding: 0;
  }
`

export const Body = styled.tbody``

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 8px;
  padding-top: 8px;

  @media (max-width: 480px) {
    padding-left: 5px;
  }
`

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #8c8c8c;
  padding-bottom: 4px;

  @media (max-width: 480px) {
    padding-left: 7px;
  }
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
  margin-right: 5px;
  width: ${({ width }: CellProps) => (width ? width : 100)}%;
`

export const InfoCell = styled.div`
  width: 100%;
  text-align: left;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
`

export const HeaderCell = styled.div`
  text-align: left;
  width: ${({ width }: CellProps) => (width ? width : 100)}%;
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

  @media (max-width: 480px) {
    text-align: center;
  }
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

export const StyledSelect = styled(Select)`
  width: ${({ selectWidth }: SelectType) =>
    selectWidth ? selectWidth : '100%'};
`

export const StyledInput = styled(Input)`
  width: '100%';
`

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`
