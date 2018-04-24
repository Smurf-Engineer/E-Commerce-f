/**
 * Styled Components - Created by gustavomedina on 23/04/18.
 */
import styled from 'styled-components'

interface PropsContainer {
  width: string
}

export const Container = styled.div`
  width: ${({ width }: PropsContainer) => width};
  display: flex;
  flex-direction: row;
  overflow: auto;
  white-space: nowrap;
`

export const ContainerLoading = styled.div`
  width: ${({ width }: PropsContainer) => width};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
