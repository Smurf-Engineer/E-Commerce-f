/**
 * Styled Components - Created by miguelcanobbio on 25/07/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 36px;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));

  @media (min-width: 388px) and (max-width: 467px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
  @media (min-width: 320px) and (max-width: 387px) {
    grid-gap: 7px 12px;
    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
`
