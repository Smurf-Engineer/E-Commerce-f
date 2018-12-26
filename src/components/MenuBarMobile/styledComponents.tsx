/**
 * Styled Components - Created by david on 02/04/18.
 */
import styled from 'styled-components'
import { WHITE, BLUE } from '../../theme/colors'
import AntButton from 'antd/lib/button'

interface ContainerProps {
  hide?: boolean
}

export const Container = styled.div`
  align-items: center;
  background-color: ${WHITE};
  border-bottom: 1px solid gainsboro;
  display: flex;
  height: ${({ hide }: ContainerProps) => (!!hide ? 0 : 70)}px;
  justify-content: space-between;
  line-height: 16px;
  padding: 0px 16px 0 10px;
  position: relative;
`

export const Logo = styled.img`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  &.alignLeft {
    left: 25%;
  }
`

export const Icon = styled.img``

export const Text = styled.div`
  color: ${WHITE};
`

export const Button = styled(AntButton)`
  position: absolute;
  right: 2%;
  color: ${WHITE};
  border-color: ${BLUE};
  background-color: ${BLUE};
  width: 110px;
  height: 50px;

  ${Container}:hover & {
    display: block;
    color: ${WHITE};
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
  ${Container}:active & {
    display: block;
    color: ${WHITE};
    background-color: ${BLUE};
  }
`
