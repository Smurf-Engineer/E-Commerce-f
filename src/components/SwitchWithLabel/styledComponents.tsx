/**
 * Styled Components - Created by david on 10/04/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  width: 25%;
  margin-right: 10%;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    margin-right: 0;
  }
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

export const Text = styled.div`
  color: #fff;
`

export const Label = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
`

export const Message = styled.div`
  color: #8c8c8c;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 21px;
`

export const inputStyle = {
  width: '100%',
  marginTop: 16
}

export const Error = styled.div`
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 12px;
  line-height: 16px;
  padding: 4px;
`
