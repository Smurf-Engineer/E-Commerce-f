/**
 * Styled Components - Created by david on 12/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  width: ${(props: any) => props.width};
  display: flex;
  flex-direction: row;
  overflow: auto;
  white-space: nowrap;
`

export const AllButton = styled.div`
  margin-left: 32px;
`
