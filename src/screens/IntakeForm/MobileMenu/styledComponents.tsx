/**
 * Styled Components - Created by eduardoquintero on 17/11/20.
 */
import styled from 'styled-components'
import { BLACK_SEMILIGHT, BLUE, WHITE } from '../../../theme/colors'

export const Container = styled.div`
  padding: 10px;
  width: 100%;
  background-color: ${BLACK_SEMILIGHT};
  color: ${WHITE};
  display: flex;
  justify-content: space-between;
`

export const Previous = styled.div`
  background: ${BLUE};
  padding: 10px;
  border-radius: 4px;
  &::after {
    content: "Previous";
  }
`

export const Continue = styled.div`
  background: ${BLUE};
  padding: 10px;
  border-radius: 4px;
  &::after {
    content: "Continue";
  }
`