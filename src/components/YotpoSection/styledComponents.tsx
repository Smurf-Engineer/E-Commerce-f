/**
 * Styled Components - Created by cazarez on 07/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div``

export const Separator = styled.div`
  text-align: center;
  margin: 48px 10% 28px 10%;
  padding-bottom: 8px;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.93px;
  line-height: 18px;
`
export const SlideImage = styled.img`
  width: 100%;
  display: inline-block;
  @media (max-width: 425px) {
    display: none;
  }
`
export const SlideImageMobile = styled.img`
  width: 100%;
  display: none;
  @media (max-width: 425px) {
    display: inline-block;
  }
`
export const SlideVideo = styled.video`
  width: 100%;
`
export const ImageContainer = styled.div`
  width: 100%;
`
export const SlideImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const RelatedProductsContainer = styled.div`
  margin-bottom: 80px;
  padding: 0px 32px;
`
