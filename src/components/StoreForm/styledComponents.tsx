/**
 * Styled Components - Created by david on 09/04/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
`

export const Label = styled.div`
  display: flex;
  color: #5f6062;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 6px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 0;
  }
`

export const Required = styled.div`
  color: #e61737;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 6px;
`

export const Column = styled.div`
  width: 47%;
  margin-right: 18px;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    margin-bottom: 24px;
  }
`

export const Error = styled.div`
  color: #e61737;
  font-size: 12px;
  line-height: 16px;
  padding: 4px;
`
export const OnDemandLabel = styled.div`
  border-radius: 2px;
  background-color: #f1f4f5;
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.23px;
  line-height: 25px;
  text-align: center;
  height: 42px;
  max-width: 246px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  margin-top: 12px;
  width: 100%;
`

export const ShipLabel = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const RightLabels = styled.div``

export const inputStyle = {
  width: '100%'
}
