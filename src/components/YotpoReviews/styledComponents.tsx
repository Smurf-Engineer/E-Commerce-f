/**
 * Styled Components - Created by cazarez on 14/03/18.
 */
import styled from 'styled-components'
import { AVENIR_NEXT_W01 } from '../../theme/fonts'

interface DivProps {
  name: string
}

export const Container = styled.div`
.yotpo-slider-title{
  visibility: hidden;
  position: relative;
  width: 100%;
  display: block;
}
.yotpo-slider-title:after {
  visibility: visible;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  content: 'THE ${({ name }: DivProps) => name} IN ACTION';
  text-align: center;
  font-size: 13px;
  font-family: ${AVENIR_NEXT_W01};
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.93px;
  line-height: 18px;
}
`

export const Text = styled.div`
  color: #fff;
`
export const YotpoReviewsContainer = styled.div`
  padding: 0px 10%;
`
export const YotpoCarousel = styled.div``
export const YotpoReviewsElement = styled.div``

export const YotpoCarouselContainer = styled.div`
  padding: 0px 10%;
`

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