/**
 * Styled Components - Created by eduardoquintero on 25/08/20.
 */
import styled from 'styled-components'
import { RED, GRAY_DARK } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 100%
  padding: 3px 8px;
`

export const Label = styled.div`
  text-align: center;
  color: ${GRAY_DARK};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`

export const MarkButton = styled.div`
  color: ${RED};
  cursor: pointer;
  user-select: none;
  font-size: 12px;
`