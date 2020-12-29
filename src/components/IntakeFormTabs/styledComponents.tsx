/**
 * Styled Components - Created by david on 23/02/18.
 */
import styled from 'styled-components'
import { WHITE, GRAY_LIGHT, BLACK_SEMILIGHT } from '../../theme/colors'

export const TabsContainer = styled.div`
  background-color: ${BLACK_SEMILIGHT};
`

export const Text = styled.div`
  color: ${WHITE};
`

export const Row2 = styled.div`
  display: flex;
  flex-direction: row;
`

export const View = styled.div`
  flex: 1;
`

export const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  flex: 3;
  background-color: ${BLACK_SEMILIGHT};
`

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${GRAY_LIGHT};
`
