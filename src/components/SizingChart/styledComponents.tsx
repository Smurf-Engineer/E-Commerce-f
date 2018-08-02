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
    flex-direction: column;
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
    padding: 14px 0px;
  }
`
export const Table = styled.div`
  border-collapse: collapse;
  margin-bottom: 60px;
  margin-top: 60px;
  table-layout: fixed;
  width: 100%;

  @media (max-width: 480px) {
    margin-bottom: 0;
    padding: 0;
  }
`
export const HeaderRow = styled.div`
  align-items: center;
  border-bottom: 1px solid #8c8c8c;
  display: flex;
  justify-content: space-between;
  padding-bottom: 4px;

  @media (max-width: 480px) {
    padding-left: 7px;
  }
`
export const HeaderCell = styled.div`
  text-align: left;
  width: 100%;
`
export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
`
export const Row = styled.div`
  align-items: center;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  padding-top: 8px;

  @media (max-width: 480px) {
    height: 50px;
    padding-left: 5px;
  }
`
export const Cell = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 35px;
  width: 100%;
`
