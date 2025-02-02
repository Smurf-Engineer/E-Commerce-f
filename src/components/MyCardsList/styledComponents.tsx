/**
 * Styled Components - Created by miguelcanobbio on 28/05/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
`

export const CardsList = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media (max-width: 425px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, min-content));
    grid-gap: 20px;
  }
`
