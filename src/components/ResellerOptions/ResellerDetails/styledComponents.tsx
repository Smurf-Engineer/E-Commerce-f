/**
 * Styled Components - Created by Jesús on 23/05/20.
 */
import styled from 'styled-components'
import Switch from 'antd/lib/switch'
import Popover from 'antd/lib/popover'
import { RED, WHITE_TRANSPARENT, GRAY_DARK, GRAY, ORANGE } from '../../../theme/colors'
import Icon from 'antd/lib/icon'
import InputNumber from 'antd/lib/input-number'
import Select from 'antd/lib/select'
import Input from 'antd/lib/input'

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

export const StateDiv = styled.div`
  width: 130px;
  margin-top: 14px;
`

export const BillingSelect = styled(Select)`
  width: 130px;
  margin-top: 14px;
  .ant-select-selection--single {
    padding-top: 2px;
    font-weight: normal;
    border-radius: 0;
  }
`

export const MarginsContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 22px;
  margin-bottom: 22px;
`

export const SubtitleMargin = styled.div`
  font-weight: bold;
  margin-top: 22px;
  font-size: 16px;
  padding-bottom: 12px;
  width: 100%;
  border-bottom: 1px solid ${GRAY};
  @media (max-width: 1024px) {
    width: 100%;
  }
`

export const SaveIcon = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
`

export const PopoverStyled = styled(Popover)`
  &:hover {
    cursor: pointer;
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
  height: 54px;
  margin-right: 24px;
  @media (max-width: 1024px) {
    flex: 1;
    margin-bottom: 26px;
  }
`

export const Title = styled.div`
  display: flex;
  font-size: 12px;
`

export const RedLabel = styled.div`
  color: red;
  cursor: pointer;
  margin-left: 28px;
`

export const PaypalLogo = styled.img`
  text-align: center;
  object-fit: contain;
  width: 58px;
  margin: -33px 0 -6px 54px;
  @media (min-width: 768px) and (max-width: 1024px) {
    margin: -28px 0 4px 24px;
  }
  @media (max-width: 767px) {
    margin: -19px 0 0px 45px;
    width: 44px;
  }
`

export const WarningIcon = styled(Icon)`
  margin-right: 8px;
  font-size: 16px;
  color: ${ORANGE};
`

export const WarningLabel = styled.div`
  font-size: 12px;
  font-style: italic;
  font-weight: normal;
  @media (max-width: 1024px) {
    margin-top: 8px;
  }
`

export const BoldLabel = styled.div`
  font-weight: bold;
  text-transform: ${({ upperCase }: ContainerProps) => upperCase ? 'uppercase' : ''};
`

export const FileLink = styled.div`
  cursor: pointer;
  color: ${RED};
`

export const StyledInput = styled(Input)`
  border-radius: 0;
  width: 130px;
  height: auto;
  margin-top: 14px;
  .ant-input {
    border-radius: 0;
  }
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

export const MessageText = styled.div`
  width: 100%;
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-bottom: 32px;
  margin-top: 20px;
  padding-bottom: 12px;
  font-weight: bold;
  border-bottom: 1px solid ${GRAY};
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
  span {
    display: block;
    text-align: center;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
`