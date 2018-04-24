/**
 * Styled Components - Created by gustavomedina on 23/04/18.
 */
import styled from 'styled-components'

interface PropsContainer {
  width: string
}

export const ParentContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #fff;
  margin-top: 20px;
`

export const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  overflow: auto;
  white-space: nowrap;
  background-color: #fff;
  align-items: center;
`

export const ContainerLoading = styled.div`
  width: ${({ width }: PropsContainer) => width};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Title = styled.div`
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-left: 15px;
  padding-top: 20px;
`

export const FooterThumbnailInspiration = styled.div`
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`

export const AllButton = styled.div`
  margin-left: 32px;
`
export const ThumbnailListItem = styled.li`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% / 4);
  padding-bottom: 20px;
  align-items: center;
  justify-content: center;

  @media (min-width: 481px) and (max-width: 1024px) {
    width: calc(100% / 3);
  }

  @media (min-width: 320px) and (max-width: 480px) {
    width: calc(95% / 2);
  }
`
