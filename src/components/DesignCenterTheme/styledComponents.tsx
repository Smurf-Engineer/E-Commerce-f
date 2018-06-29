/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div``

export const Text = styled.div`
  color: #fff;
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 302px 302px 302px;
  grid-gap: 50px 40px;
  grid-template-rows: auto;
  justify-content: center;

  @media (max-width: 1020px) {
    grid-template-columns: 302px 302px;
  }
`

export const ModalMessage = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`
