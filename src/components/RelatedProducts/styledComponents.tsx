/**
 * Styled Components - Created by jorge on 10/08/18.
 */
import styled from 'styled-components'
import AntDivider from 'antd/lib/divider'

export const Container = styled.div``
export const Title = styled.div`
  text-align: center;
  margin-top: 48px;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.93px;
  line-height: 18px;

  @media (min-width: 1440px) {
    padding: 0px 10%;
  }
`
export const Divider = styled(AntDivider)`
  display: block;
  margin: 8px 10%;
  width: auto;
  min-width: 20px;
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

  @media (min-width: 320px) and (max-width: 480px) {
    section {
      width: 220px;
    }
  }
`
