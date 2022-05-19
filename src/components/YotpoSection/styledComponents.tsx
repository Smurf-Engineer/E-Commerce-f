/**
 * Styled Components - Created by cazarez on 07/02/18.
 */
import styled from 'styled-components'
import { GRAY_DISABLE, GRAY_STRONG } from '../../theme/colors'

interface StyledProps {
  productDetail?: boolean
}

export const Container = styled.div``

export const Separator = styled.div`
  text-align: center;
  margin-top: 48px;
  margin-bottom: 28px;
  padding: 8px;
  font-family: Avenir;
  background: ${GRAY_DISABLE};
  color: ${GRAY_STRONG};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
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
  margin-bottom: ${({ productDetail }: StyledProps) => productDetail ? '54px' : '80px'};
  padding: 0px 32px;
`

export const ListContainer = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: -12px;
  padding-right: 26px;
  padding-left: 26px;
  @media (min-width: 320px) and (max-width: 748px) {
    padding-left: 0;
    padding-right: 0;
  }
`

export const StoreLabel = styled.div`
  font-weight: bold;
  text-align: center;
  font-family: Avenir;
`