/**
 * Styled Components - Created by Jesús on 23/05/20.
 */
import styled from 'styled-components'
import Switch from 'antd/lib/switch'
import { RED, WHITE_TRANSPARENT } from '../../../theme/colors'
import Icon from 'antd/lib/icon'
import InputNumber from 'antd/lib/input-number'

interface ContainerProps {
  withoutPadding?: boolean
  upperCase?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-right: ${({ withoutPadding }: ContainerProps) =>
    withoutPadding ? '0' : '32px'};
  @media (min-width: 320px) and (max-width: 1024px) {
    padding-right: 0;
    align-items: center;
  }
`

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    font-size: 13px;
    justify-content: space-between;
  }
`

export const StyledSwitch = styled(Switch)``

export const LabelButton = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 48px;
  margin-right: 24px;
  @media (max-width: 1024px) {
    flex: 1;
    height: 38px;
    margin-bottom: 26px;
  }
`

export const Title = styled.div`
  display: flex;
`

export const RedLabel = styled.div`
  color: red;
  cursor: pointer;
  margin-left: 28px;
`

export const BoldLabel = styled.div`
  font-weight: bold;
  text-transform: ${({ upperCase }: ContainerProps) => upperCase ? 'uppercase' : ''};
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

export const LoadingContainer = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  height: 100vh;
  background: ${WHITE_TRANSPARENT};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Subtitle = styled.div`
  font-weight: bold;
  margin-bottom: 22px;
  font-size: 16px;
  @media (max-width: 1024px) {
    width: 100%;
  }
`

export const InfoIcon = styled(Icon)`
  margin-left: 8px;
  margin-top: 1px;
`

export const PopoverText = styled.div`
  max-width: 512px;
  width: 100%;
`