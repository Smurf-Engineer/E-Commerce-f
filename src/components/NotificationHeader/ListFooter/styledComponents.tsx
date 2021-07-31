/**
 * Styled Components - Created by eduardoquintero on 25/08/20.
 */
import styled from 'styled-components'
import { RED } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 8px;
  cursor: pointer;
`

export const Label = styled.div`
  color: ${RED};
  font-size: 14px;
  text-transform: uppercase;
  user-select: none;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.4;
  }
`
