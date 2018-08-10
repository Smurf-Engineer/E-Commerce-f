/**
 * Styled Components - Created by jorge on 10/08/18.
 */
import styled from 'styled-components'
import AntDivider from 'antd/lib/divider'

export const Container = styled.div``
export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  height: 0.83%;
  letter-spacing: 0.11px;
  line-height: 22px;
  width: 82.34%;
`
export const Divider = styled(AntDivider)`
  margin-top: 15px;
`
export const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: auto;
  white-space: nowrap;

  div {
    margin: 0px;
  }
`
