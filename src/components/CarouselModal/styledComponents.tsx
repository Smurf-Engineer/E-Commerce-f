/**
 * Styled Components - Created by eduardoquintero on 14/10/19.
 */
import styled from 'styled-components'
import { BLACK } from '../../theme/colors'

export const Container = styled.div``

export const Arrow = styled.img`
  height: 60px !important;
  width: 50px !important;
  padding: 20px !important;
  text-align: center !important;
  z-index: 1 !important;
  background-color: ${BLACK} !important;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07) !important;
  &:hover {
    opacity: 0.7;
  }
`

export const CarouselItem = styled.div``

export const ImagePreview = styled.img`
  width: 100%;
  object-fit: auto;
`

export const VideoPreview = styled.video`
  width: 100%;
`

export const CarouselContainer = styled.div`
  margin-top: 40px;
  margin-left: 5px;
`
