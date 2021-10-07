/**
 * Styled Components - Created by eduardoquintero on 25/08/20.
 */
import styled from 'styled-components'
import { RED, GRAY_DARK, GRAY, RED_BRIGHT, BLUE, WHITE } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  position: relative;
  cursor: pointer;
  background: ${WHITE};

  &.new {
    background: ${RED_BRIGHT};
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
  b {
    color: ${BLUE};
    transition: all .25s;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
  i {
    font-style: normal !important;
    font-weight: bold;
  }
`

export const Date = styled.div`
  color: ${GRAY};
  font-size: 12px;
  margin-bottom: 5px;
`

export const Row = styled.div`
`

export const SwipeItemLi = styled.div`
  position: relative;
  overflow: hidden;
`

export const SwipeItemContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 200;
`

export const DeleteButton = styled.div`
  position: absolute;
  left: 1px;
  top: 1px;
  bottom: 1px;
  right: 1px;
  display: flex;
  background: ${RED};
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  color: white;
  text-transform: uppercase;
  z-index: 100;
`