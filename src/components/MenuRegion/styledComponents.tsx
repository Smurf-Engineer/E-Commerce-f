/**
 * Styled Components - Created by david on 20/02/18.
 */
import styled from 'styled-components'

export const Regions = styled.div`
  display: flex;
  width: 68px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  cursor: pointer;

  @media (max-width: 991px) {
    height: 40px;
  }
`

export const TopText = styled.div`
  color: #5f6062;
  font-size: 14px;
  cursor: pointer;
`

export const overStyle = {
  width: 276,
  paddingTop: 7
}
