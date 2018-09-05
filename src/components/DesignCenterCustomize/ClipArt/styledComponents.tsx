/**
 * Styled Components - Created by david on 05/09/18.
 */
import styled from 'styled-components'
import AntButton from 'antd/lib/button'
import { GRAY, TRANSPARENT } from '../../../theme/colors'

export const Container = styled.div`
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  :not(:hover) {
    border: 1px solid
      ${({ selected }: ColProps) => (selected ? GRAY : TRANSPARENT)};
  }
`

type ColProps = {
  selected: boolean
}

export const Button = styled(AntButton)`
  display: none;

  color: #4a90e2;
  border-color: #4a90e2;

  .ant-btn-clicked:after {
    border-color: #4a90e2;
  }

  ${Container}:hover & {
    display: block;
    color: #4a90e2;
    border-color: #4a90e2;
  }
`

export const Icon = styled.img`
  width: 48px;
  height: 48px;
  ${Container}:hover & {
    display: none;
  }
`

export const Text = styled.div`
  color: #fff;
`
