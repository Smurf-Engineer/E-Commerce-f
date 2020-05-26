/**
 * Styled Components - Created by Jesús on 23/05/20.
 */
import styled from 'styled-components'
import Switch from 'antd/lib/switch'
import { RED } from '../../../theme/colors'
import Icon from 'antd/lib/icon'
import InputNumber from 'antd/lib/input-number'

interface ContainerProps {
  withoutPadding?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: ${({ withoutPadding }: ContainerProps) =>
    withoutPadding ? '0' : '32px'};
  @media (min-width: 320px) and (max-width: 768px) {
    padding-right: 0;
    align-items: center;
  }
`

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

export const StyledSwitch = styled(Switch)``

export const LabelButton = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 48px;
  margin-right: 24px;
`

export const Title = styled.div``

export const DeclineLabel = styled.div`
  color: red;
  cursor: pointer;
`

export const BoldLabel = styled.div`
  font-weight: bold;
`

export const FileLink = styled.div`
  cursor: pointer;
  color: ${RED};
`

export const Clip = styled(Icon)`
  color: ${RED};
  margin-right: 12px;
`

export const StyledInputNumber = styled(InputNumber)`
  border-radius: 0;
  width: 134px;
  height: 32px;
  margin-top: 5px;
  .ant-input-number-handler-wrap {
    display: none;
  }
`