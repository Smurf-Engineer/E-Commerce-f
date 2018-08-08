/**
 * Styled Components - Created by jorge on 03/08/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  border-collapse: collapse;
  margin-bottom: 60px;
  margin-top: 60px;
  table-layout: fixed;
  width: 38.75%;

  @media (max-width: 665px) {
    margin-bottom: 0;
    margin-top: 25px;
    padding: 0;
    width: 100%;
  }

  @media (min-width: 666px) and (max-width: 768px) {
    width: 49%;
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
export const TableTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-bottom: 20px;
`
