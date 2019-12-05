/**
 * Styled Components - Created by eduardoquintero on 02/12/19.
 */
import styled from 'styled-components'
import AntdDivider from 'antd/lib/divider'
import { RED, WHITE, GRAY_LIGHT, GRAY_SNOW } from '../../../theme/colors'

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
  left: 100%;
  z-index: 1;
  clip-path: polygon(0 0, 0% 100%, 100% 50%);
`

export const OpeningShape = styled.div`
  background-color: ${({ selected }: SelectedProps) =>
    selected ? RED : WHITE};
  width: 10px;
  height: 100%;
  position: absolute;
  right: 1px;
  z-index: 2;
  clip-path: polygon(0 0, 0% 100%, 100% 50%);
`

export const Tab = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ selected }: SelectedProps) =>
    selected ? RED : WHITE};
  justify-content: center;
  align-items: center;
  cursor: ${({ activeOnClick }: SelectedProps) =>
    activeOnClick ? 'pointer' : 'default'};

  &:hover {
    & div:last-child {
      background-color: ${GRAY_SNOW};
    }
    background-color: ${({ activeOnClick, selected }: SelectedProps) => {
      if (selected) {
        return RED
      }
      return activeOnClick ? GRAY_SNOW : WHITE
    }};
    }
  }
`

export const Text = styled.div`
  font-size: 14px;
  line-height: 19px;
  color: ${({ selected }: SelectedProps) => (selected ? WHITE : RED)};
`

export const Divider = styled(AntdDivider)`
  height: 40px;
  margin: 0px;
`
