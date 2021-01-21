/**
 * Styled Components - Created by eduardoquintero on 25/08/20.
 */
import styled from 'styled-components'
import { RED, GRAY_DARK, GRAY, RED_TRANSPARENT_BRIGHT } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  position: relative;
  cursor: pointer;
  &.new {
    background: ${RED_TRANSPARENT_BRIGHT};
    &::after {
      content: '';
      background: ${RED};
      width: 12px;
      height: 12px;
      border-radius: 6px;
      position: absolute;
      top: calc(50% - 6px);
      right: 10px;
    }
  }
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: 600;
  text-transform: uppercase;
`

export const Description = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 93%;
`

export const Date = styled.div`
  color: ${GRAY};
  font-size: 12px;
  margin-bottom: 5px;
`

export const Row = styled.div`
`
