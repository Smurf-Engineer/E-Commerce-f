/**
 * Styled Components - Created by david on 23/02/18.
 */
import styled from 'styled-components'
import AntdDivider from 'antd/lib/divider'

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
  background: #dcdcdc;
  position: absolute;
  left: 100%;
  z-index: 1;
  clip-path: polygon(0 0, 0% 100%, 100% 50%);
`

export const OpeningShape = styled.div`
  background-color: ${({ selected }: SelectedProps) =>
    selected ? '#e61737' : '#fff'};
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
    selected ? '#e61737' : '#fff'};
  justify-content: center;
  align-items: center;
  cursor: ${({ activeOnClick }: SelectedProps) =>
    activeOnClick ? 'pointer' : 'default'};

  &:hover {
    background-color: ${({ activeOnClick, selected }: SelectedProps) => {
      if (selected) {
        return '#e61737'
      }
      return activeOnClick ? '#fafafa' : '#fff'
    }};
    }
  }
`

export const Text = styled.div`
  font-size: 14px;
  line-height: 19px;
  color: ${({ selected }: SelectedProps) => (selected ? '#fff' : '#e61737')};
`

export const Divider = styled(AntdDivider)`
  height: 40px;
  margin: 0px;
`
