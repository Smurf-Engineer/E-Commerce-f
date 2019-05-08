/**
 * Styled Components - Created by david on 08/06/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  height: 60vh;
  overflow: auto;

  @media (min-height: 800px) and (orientation: portrait) {
    height: 85vh;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    height: 70vh;
  }

  @media only screen and (min-device-width: 1366px) and (max-device-width: 1366px) and (orientation: landscape) {
    height: 78vh;
  }
`

export const VideoContainer = styled.div`
  display: flex;
  flex-flow: column;
  margin: 16px;
`
export const Loading = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  text-align: center;
  width: 100%;
`
export const VideoFrame = styled.iframe`
  width: 100%;
  margin-bottom: 4px;
`

export const Title = styled.span`
  margin-left: 4px;
`
export const ModalSpan = styled.span`
  margin: 0 auto;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
`
