/**
 * Styled Components - Created by miguelcanobbio on 23/08/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 14px 32px 0px 32px;

  @media (max-width: 1360px) {
    padding: 14px 14px 0px 14px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    flex-wrap: wrap;
    padding: 10px 0px 15px 15px;
  }
`

export const ShuffleButton = styled.div`
  cursor: pointer;
`

export const Icon = styled.img`
  width: 24px;
  object-fit: contain;
  opacity: 50%;
  padding-top: 8px;
`
