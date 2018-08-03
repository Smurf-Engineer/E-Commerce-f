/**
 * Styled Components - Created by jorge on 01/08/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
`
export const BoxHeaderRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 54px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: 35px;
  }
`

interface BoxProps {
  checked?: boolean
}

export const BoxHeader = styled.div`
  border: ${({ checked }: BoxProps) =>
    checked ? '2px solid #e61737;' : '0.5px solid #DCDCDC;'};
  border-radius: 2px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 23px;
  margin: 0px 12.5px 10px;
  padding: 14px 0px;
  text-align: center;
  width: 82px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
    margin: 0px 2px;
  }
`

interface TableProps {
  multiple?: boolean
}

export const TableList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ multiple }: TableProps) =>
    multiple ? 'space-between' : 'center'};
  padding: 0px 30px;
  width: 100%;

  @media (min-width: 320px) and (max-width: 846px) {
    padding: 0px;
  }
`
