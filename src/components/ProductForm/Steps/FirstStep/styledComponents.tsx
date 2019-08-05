/**
 * Styled Components - Created by Apodaca on 14/05/18.
 */
import { Radio, Checkbox, Switch } from 'antd'
import styled from 'styled-components'
import Icon from 'antd/lib/icon'
interface TextProps {
  capitalize: boolean
}
interface InputDivProps {
  flex?: number
  isFlex?: boolean
  flexFlow?: string
}
const CheckboxGroup = Checkbox.Group
const RadioButtonComponent = Radio.Button
export const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  @media (min-width: 320px) and (max-width: 480px) {
    height: 132px;
  }
`

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
`
export const MoreIcon = styled(Icon)`
  cursor: pointer;
  transform: rotate(90deg);
`
export const RemoveDetail = styled(Icon)`
  cursor: pointer;
`

export const SpecList = styled.div`
  display: flex;
  flex-flow: column;
  padding: 8px 0;
`
export const SpecName = styled.div`
  flex: 1;
  margin-left: 8px;
`
export const SpecDetail = styled.div`
  margin: 8px 0;
  cursor: grab;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  width: 100%;
  display: flex;
  align-items: center;
  color: gray;
  border-radius: 2px;
  padding: 8px;
  &:active {
    cursor: grabbing;
  }
`

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 15px;
  font-weight: 600;
  text-transform: ${({ capitalize }: TextProps) =>
    capitalize ? 'capitalize' : 'none'}
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const Span = styled.a`
  color: #fff;
  &:hover {
    border-bottom: 1px solid red;
    cursor: pointer;
    color: #fff;
  }
`
export const Separator = styled.div`
  border-bottom: 1px solid #dcdcdc;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  padding-bottom: 10px;
  margin-bottom: 30px;
  margin-top: 68px;
`
export const RadioButton = styled(RadioButtonComponent)`
  margin-right: 26px;
  height: 50px;
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  justify-content: center;
  width: 140px;
  border-radius: 2px !important;
  background-color: #ffffff;
`

export const RowInput = styled.div`
  margin: 16px 0;
  margin: 16px 0;
  display: flex;
  justify-content: space-between;
`
export const InputDiv = styled.div`
  margin-right: 26px;
  flex-flow: ${({ flexFlow }: InputDivProps) =>
    flexFlow ? flexFlow : 'unset'};
  display: ${({ isFlex }: InputDivProps) => (isFlex ? 'inline-flex' : 'unset')};
  flex: ${({ flex }: InputDivProps) => (flex ? flex : 'unset')};
`
export const Label = styled.div`
  margin-bottom: 10px;
`

export const InlineLabel = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 31px;
  flex-flow: row;
  flex: 1;
`

export const CheckGroup = styled(CheckboxGroup)`
  align-items: flex-start;
  justify-content: flex-start;
  display: flex;
  flex-flow: row wrap;
`
export const CheckBox = styled(Checkbox)`
  flex-basis: 165px;
  max-width: 140px;
  width: 100%;
  margin: 8px 0 !important;
`
export const SwitchInput = styled(Switch)`
  margin-left: 26px;
`
