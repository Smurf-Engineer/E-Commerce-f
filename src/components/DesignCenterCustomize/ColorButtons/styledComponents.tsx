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
  max-width: 24px;
  object-fit: contain;
  width: 100%;
  opacity: 50%;
  padding-top: 8px;
  @media (max-width: 1360px) {
    align-self: center;
    max-width: 20px;
    padding-top: 10px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 18px;
    padding-top: 15px;
  }
`
