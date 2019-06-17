/**
 * Styled Components - Created by david on 12/02/18.
 */
import styled from 'styled-components'

export const ImageContainer = styled.div`
  user-select: none;

  @media (min-width: 321px) and (max-width: 480px) {
  }
  @media only screen and (max-width: 320px) {
  }
`

export const Page = styled.div`
  user-select: none;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const Image = styled.img`
  user-select: none;
  height: 132px;

  @media (min-width: 321px) and (max-width: 480px) {
    height: 100%;
  }

  @media only screen and (max-width: 320px) {
    height: 120px;
    margin: 0;
  }
`
