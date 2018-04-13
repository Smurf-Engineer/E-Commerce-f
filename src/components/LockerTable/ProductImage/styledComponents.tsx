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

export const QuickView = styled.div`
  z-index: 1;
  cursor: pointer;
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
  width: 172px;

  @media (min-width: 321px) and (max-width: 480px) {
    height: 100%;
    width: 100%;
  }

  @media only screen and (max-width: 320px) {
    height: 120px;
    width: 100%;
    margin: 0;
  }
`

export const ImageTop = styled.div`
  user-select: none;
  position: absolute;
`
