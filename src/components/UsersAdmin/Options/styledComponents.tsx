/**
 * Styled Components - Created by eduardoquintero on 21/01/20.
 */
import styled from 'styled-components'
import Radio from 'antd/lib/radio'
import { WHITE, GRAY_DARK } from '../../../theme/colors'
const RadioButtonComponent = Radio.Button

export const RadioButton = styled(RadioButtonComponent)`
  margin-right: 26px;
  height: 50px;
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  justify-content: center;
  width: 140px;
  border-radius: 2px !important;
  background-color: ${WHITE};
  margin-bottom: 20px;
`

export const BackLabel = styled.div`
  height: 22px;
  width: 203px;
  cursor: pointer;
  color: ${GRAY_DARK};
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-bottom: 15px;
`
export const BackText = styled.span`
  display: inline-block;
  margin-left: 6px;
`
