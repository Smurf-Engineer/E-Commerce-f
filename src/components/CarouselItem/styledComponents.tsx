import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
`

export const ImagePreview = styled.img`
  object-fit: cover;
  width: 100%;
  cursor: pointer;
`

export const VideoPreview = styled.video`
  width: 100%;
  object-fit: cover;
  height: 100%;
  max-height: 550px;
`
