/**
 * Styled Components - Created by david on 05/03/18.
 */
import styled from 'styled-components'
import AntdDivider from 'antd/lib/divider'

export const OptionsContainer = styled.div`
  position: absolute;
  user-select: none;
  left: 26px;
  bottom: 14%;
`

export const Options = styled.div`
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.12), 0 0px 2px rgba(0, 0, 0, 0.24);
`

interface OptionsProps {
  withMargin?: boolean
  disabled?: boolean
}

export const OptionButton = styled.div`
  width: 40px;
  user-select: none;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }: OptionsProps) =>
    disabled ? 'not-allowed' : 'pointer'};
  background-color: ${({ disabled }: OptionsProps) =>
    disabled ? '#f5f5f5' : '#fff'};
  margin: ${({ withMargin }: OptionsProps) =>
    withMargin ? '16px 0px' : '0px'};
`

export const Divider = styled(AntdDivider)`
  margin: 0px;
  user-select: none;
`
