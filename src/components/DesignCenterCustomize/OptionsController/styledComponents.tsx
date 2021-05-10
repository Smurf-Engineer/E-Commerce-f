/**
 * Styled Components - Created by david on 05/03/18.
 */
import styled from 'styled-components'
import AntdDivider from 'antd/lib/divider'
import { WHITE } from '../../../theme/colors'

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
  active?: boolean
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

export const GuideButton = styled.div`
  width: 40px;
  user-select: none;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${WHITE};
  margin: 16px 0px;
`

export const ToolTipText = styled.div`
  text-align: center;
`

export const GuideIcon = styled.img`
  padding: 5px;
  width: 100%;
  filter: ${({ active }: OptionsProps) =>
    active ? 'invert(1) sepia(1) saturate(5) hue-rotate(175deg)' : 'unset'};
`

export const Divider = styled(AntdDivider)`
  margin: 0px;
  user-select: none;
`

export const ClearPlaceholderIcon = styled.img`
  width: 30px;
`
