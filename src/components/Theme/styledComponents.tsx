/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'

interface StyleProps {
  src?: string
}

export const Container = styled.div`
  list-style: none;
  display: inline-block;
  text-align: center;
`

export const Image = styled.div`
  height: 324px;
  max-width: 302px;
  cursor: pointer;
  background-image: url(${({ src }: StyleProps) => src || ''});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 724px) {
    height: 150px;
    max-width: 150px;
  }
`

export const Text = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  text-align: center;

  @media (max-width: 724px) {
    font-size: 14px;
    padding-top: 8px;
  }
`
