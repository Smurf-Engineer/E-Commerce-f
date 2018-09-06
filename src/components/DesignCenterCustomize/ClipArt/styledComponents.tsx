/**
 * Styled Components - Created by david on 05/09/18.
 */
import styled from 'styled-components'
import AntButton from 'antd/lib/button'
import { GRAY, TRANSPARENT, BLUE, WHITE } from '../../../theme/colors'

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

  color: ${BLUE};
  border-color: ${BLUE};

  .ant-btn-clicked:after {
    border-color: ${BLUE};
  }

  ${Container}:hover & {
    display: block;
    color: ${BLUE};
    border-color: ${BLUE};
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
  color: ${WHITE};
`
