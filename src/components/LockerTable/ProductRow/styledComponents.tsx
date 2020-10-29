/**
 * Styled Components - Created by david on 12/04/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import { RED_WARNING } from '../../../theme/colors'

interface TitleProps {
  align: string
}

interface InputProps {
  badInput?: boolean
}

interface AlignProps {
  align?: string
  componentWidth?: string
}

export const Container = styled.div`
  background-color: #222;
`

export const Text = styled.div`
  color: #fff;
`

export const StyledInput = styled(Input)`
  border-radius: 0;
  width: 55px;
  background: ${({ badInput }: InputProps) => badInput ? RED_WARNING : 'none'};
`

export const Title = styled.div`
  width: 58px;
  color: #5f6062;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  text-align: ${({ align }: TitleProps) => (align ? align : 'center')};
`
export const Align = styled.div`
  user-select: none;
  width: ${({ componentWidth }: AlignProps) =>
    componentWidth ? componentWidth : 'auto'};
  text-align: ${({ align }: AlignProps) => (align ? align : 'center')};
`
