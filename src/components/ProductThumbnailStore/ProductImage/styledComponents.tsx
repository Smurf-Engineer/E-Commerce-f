/**
 * Styled Components - Created by david on 12/02/18.
 */
import styled from 'styled-components'

export const ImageContainer = styled.div`
  user-select: none;
  position: relative;
  background-color: #f1f4f5;
  height: 214.13px;
  width: 220px;
  padding: 10px;
  text-align: center;

  @media (min-width: 321px) and (max-width: 480px) {
    height: 200px;
    width: 100%;
    margin: 0;
  }
  @media only screen and (max-width: 320px) {
    height: 130px;
    width: 100%;
    margin: 0;
  }
`

export const Page = styled.div`
  user-select: none;
  height: 200.29px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const Image = styled.img`
  user-select: none;
  height: 200.29px;
  width: 180.44px;

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
