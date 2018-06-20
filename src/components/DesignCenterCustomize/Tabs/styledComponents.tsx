/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
  height: 80vh;
  width: 25.4%;
  max-width: 400px;
  padding-bottom: 32px;
  z-index: 1;
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.12), 0 0px 2px rgba(0, 0, 0, 0.24);

  @media (min-height: 800px) {
    height: 85vh;
  }
`

export const Text = styled.div`
  color: #fff;
`
