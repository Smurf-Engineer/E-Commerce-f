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
  width: 32%;

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

export const inputStyle = {
  width: '100%'
}
