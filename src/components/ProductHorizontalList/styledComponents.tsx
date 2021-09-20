/**
 * Styled Components - Created by david on 12/02/18.
 */
import styled from 'styled-components'

interface PropsContainer {
  width: string
}

export const Container = styled.div`
  width: ${({ width }: PropsContainer) => width};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
