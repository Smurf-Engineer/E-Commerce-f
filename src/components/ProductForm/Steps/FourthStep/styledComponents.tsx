/**
 * Styled Components - Created by cazarez on 07/02/18.
 */
import { Radio, Checkbox, Switch, Icon } from 'antd'
import styled from 'styled-components'
interface DivProps {
  capitalize?: boolean
  upperCase?: boolean
  inline?: boolean
  marginTop?: string
  big?: boolean
  maxWidth?: boolean
  marginBottom?: string
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
  text-transform: ${({ capitalize }: DivProps) =>
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
  margin-top: ${({ inline }: DivProps) => (inline ? 'unset' : '68px')};
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
  margin-top: ${({ marginTop }: DivProps) => (marginTop ? marginTop : 'unset')};
  margin-bottom: ${({ marginBottom }: DivProps) =>
    marginBottom ? marginBottom : '10px'};
  text-transform: ${({ upperCase }: DivProps) =>
    upperCase ? 'uppercase' : 'unset'};
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
export const GenderBlock = styled.div`
  margin-bottom: 30px;
`

export const ImageBlock = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: 8px;
`
export const ImageBox = styled.img`
  object-fit: contain;
  height: 200px;
  width: ${({ maxWidth }: DivProps) => (maxWidth ? 'unset' : '200px')};
`
export const EmptyBox = styled.div`
  height: 200px;
  width: ${({ big }: DivProps) => (big ? '600px' : '200px')}
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  flex-flow: column;
  font-size: 18px;
  padding-top: 38px;
  color: #bebebe;
`
export const MediaSection = styled.div`
  margin-top: 42px;
  display: inline-flex;
  flex-flow: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`
export const MediaDiv = styled.div`
  margin: 8px;
  padding: 8px;
  border: 1px dashed #cccccc;
`

export const MediaFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`
export const FileName = styled.div`
  display: inline-block;
  font-weight: bold;
  max-width: 70px;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: top;
  text-overflow: ellipsis;
`
export const FileExtension = styled.div`
  display: inline-block;
  font-weight: bold;
  vertical-align: top;
`
export const DeleteFile = styled.div`
  height: 17px;
  width: 50px;
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  cursor: pointer;
`

export const MaterialDiv = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  align-items: center;
  border: 0.5px solid #bebebe;
  border-radius: 2px;
  height: 138px;
  width: 120px;
  margin-right: 16px;
  padding-bottom: 16px;
  padding-top: 8px;
`

export const MaterialButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`
export const MaterialImage = styled.img`
  object-fit: contain;
  display: inline-block;
  max-width: 90px;
  max-height: 90px;
`

export const AddMaterial = styled.div`
  height: 120px;
  width: 120px;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  flex-flow: column;
  font-size: 18px;
  padding-top: 38px;
  color: #bebebe;
`

export const MaterialButton = styled(Icon)`
  cursor: pointer;
`
