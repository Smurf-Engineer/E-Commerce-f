/**
 * Styled Components - Created by jorge on 10/08/18.
 */
import styled from 'styled-components'
import AntDivider from 'antd/lib/divider'

export const Container = styled.div``
export const Title = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  height: 0.83%;
  letter-spacing: 0.11px;
  line-height: 22px;
  width: 82.34%;

  @media (min-width: 1440px) {
    padding: 0px 10%;
  }
`
export const Divider = styled(AntDivider)`
  margin-top: 15px;
`
export const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  white-space: nowrap;

  section {
    margin: 0px 40px 0px 0px;
  }

  @media (min-width: 1440px) {
    padding: 0px 10%;
  }
`
