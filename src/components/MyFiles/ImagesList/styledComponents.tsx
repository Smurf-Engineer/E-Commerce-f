/**
 * Styled Components - Created by miguelcanobbio on 25/07/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  display: inline-flex;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 36px;
  gap: 22px;
  justify-content: flex-start;
  @media (max-width: 768px) {
    padding: 8px 10px;
    justify-content: space-evenly;
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
`
