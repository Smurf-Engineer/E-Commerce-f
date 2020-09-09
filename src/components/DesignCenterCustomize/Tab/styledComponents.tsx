/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'
import { GRAY_DARK } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`

export const Text = styled.div`
  color: ${GRAY_DARK};
  font-size: 12px;
  line-height: 19px;
  margin-top: 4px;
  text-align: center;

  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 10px;
  }
`
export const Icon = styled.img`
  max-width: 28px;
  object-fit: contain;
  width: 100%;
  @media (min-width: 768px) and (max-width: 991px) {
    align-self: center;
    max-width: 25px;
  }
`
