/**
 * Styled Components - Created by Apodaca on 16/05/19.
 */
import { Radio, Checkbox, Switch } from 'antd'
import styled from 'styled-components'
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
  margin: 8px 0 !important;
`
export const SwitchInput = styled(Switch)`
  margin-left: 26px;
`
export const ColorIcon = styled.img`
  height: 20px;
  vertical-align: top;
  margin-right: 8px;
  filter: drop-shadow(0px 0px 1px black);
  object-fit: cover;
`
