/**
 * Styled Components - Created by david on 09/03/18.
 */

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
`

export const ButtonWrapper = styled.div`
  margin-bottom: 16px;
  .ant-btn-primary  {
    background-color: #4a90e2;
    border-color: #4a90e2;
    width: 138px;
  }
  .ant-btn-primary:hover {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  padding: 30px;
`

export const Model = styled.div`
  color: #5f6062;
  user-select: none;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Row = styled.div`
  display: flex;
  align-items center;
  margin-bottom: 12px;
`

export const QuickView = styled.img`
  cursor: pointer;
  margin-left: 8px;
`
