/**
 * Styled Components - Created by eduardoquintero on 19/09/19.
 */
import styled from 'styled-components'
import { GRAY_DARK } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Text = styled.div`
  color: ${GRAY_DARK};
  font-size: 11px;
  line-height: 19px;
  margin-top: 4px;
  text-align: center;
`
export const Icon = styled.img`
  max-height: 28px;
  height: 100%;
  object-fit: contain;
`
