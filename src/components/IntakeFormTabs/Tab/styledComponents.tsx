/**
 * Styled Components - Created by david on 23/02/18.
 */
import styled from 'styled-components'
import AntdDivider from 'antd/lib/divider'
import { ALMOST_BLACK, BLACK_SEMILIGHT, GRAY_LIGHT, RED, WHITE } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 40px;
  position: relative;
`

interface SelectedProps {
  selected: boolean
  activeOnClick?: boolean
}

export const ShapeContainer = styled.div`
  width: 10px;
  height: 43px;
  background: ${GRAY_LIGHT} !important;
  position: absolute;
  left: 99.6%;
  z-index: 1;
  clip-path: polygon(0 0, 0% 100%, 100% 50%);
  transition: all 0.3s ease;
`

export const OpeningShape = styled.div`
  background-color: ${({ selected }: SelectedProps) =>
    selected ? RED : BLACK_SEMILIGHT};
  width: 10px;
  height: 100%;
  position: absolute;
  right: 1px;
  z-index: 2;
  transition: all 0.3s ease;
  clip-path: polygon(0 0, 0% 100%, 100% 50%);
`

export const Tab = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ selected }: SelectedProps) =>
    selected ? RED : BLACK_SEMILIGHT};
  justify-content: center;
  align-items: center;
  cursor: ${({ activeOnClick }: SelectedProps) =>
    activeOnClick ? 'pointer' : 'default'};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ activeOnClick, selected }: SelectedProps) => {
      if (selected) {
        return RED
      }
      return activeOnClick && ALMOST_BLACK
    }};
    & div:last-child {
      transition: all 0.3s ease;
      background-color: ${({ activeOnClick, selected }: SelectedProps) => {
        if (selected) {
          return RED
        }
        return activeOnClick && ALMOST_BLACK
      }};
    }
    }
  }
`

export const Text = styled.div`
  font-size: 14px;
  line-height: 19px;
  color: ${WHITE};
`

export const Divider = styled(AntdDivider)`
  height: 40px;
  margin: 0px;
`
