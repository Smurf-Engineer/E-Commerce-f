/**
 * Styled Components - Created by david on 09/02/18.
 */
import styled, { keyframes } from 'styled-components'

export const Container = styled.div``

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  padding: 8px 0px;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
`

export const Option = styled.div`
  width: fit-content;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const Line = styled.div`
  height: 2px;
  background-color: #e61737;
  animation: ${fadeIn} 0.6s linear;
`
