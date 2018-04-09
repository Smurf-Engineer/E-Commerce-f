/**
 * Styled Components - Created by david on 06/04/18.
 */
import styled, { keyframes } from 'styled-components'

export const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`

export const Container = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.6s cubic-bezier(0.67, 0.35, 0.565, 1) both;
`

export const Text = styled.div`
  color: #fff;
`
