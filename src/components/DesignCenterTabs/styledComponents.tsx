/**
 * Styled Components - Created by david on 23/02/18.
 */
import styled from 'styled-components'
import { WHITE, GRAY_LIGHT } from '../../theme/colors'

export const Container = styled.div`
  background-color: ${WHITE};
`

export const Text = styled.div`
  color: ${WHITE};
`

export const Row = styled.div`
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
  background-color: #d2d2dc;
`

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${GRAY_LIGHT};
`
