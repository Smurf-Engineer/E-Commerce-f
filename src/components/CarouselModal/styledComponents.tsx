/**
 * Styled Components - Created by eduardoquintero on 14/10/19.
 */
import styled from 'styled-components'

export const Container = styled.div``

export const Arrow = styled.img`
  height: 60px !important;
  width: 50px !important;
  padding: 20px !important;
  text-align: center !important;
  z-index: 1 !important;
  border: 0.2px solid rgba(220, 220, 220, 0.34) !important;
  background-color: #ffffff !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07) !important;
`

export const CarouselItem = styled.div``

type ImagePreviewProps = {
  src?: string
}

export const ImagePreview = styled.div`
  width: 100%;
  background-image: url(${({ src }: ImagePreviewProps) => src || ''});
  background-size: auto;
  background-repeat: no-repeat;
  height: 550px;
`

export const VideoPreview = styled.video`
  width: 100%;
  height: 550px;
`

export const CarouselContainer = styled.div`
  margin-top: 40px;
  margin-left: 5px;
`
