/**
 * Styled Components - Created by cazarez on 07/02/18.
 */
import { Radio } from 'antd'
import styled from 'styled-components'
interface TextProps {
  capitalize: boolean
}
interface InputDivProps {
  flex?: number
}
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
  flex: ${({ flex }: InputDivProps) => (flex ? flex : 'unset')};
`
export const Label = styled.div`
  margin-bottom: 10px;
`
