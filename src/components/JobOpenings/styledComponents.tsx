/**
 * Styled Components - Created by jorge on 31/07/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  @media (min-width: 1440px) {
    padding: 0px 10%;
  }
`
export const Text = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 15px;
  }

  strong {
    font-weight: 600;
  }
`
