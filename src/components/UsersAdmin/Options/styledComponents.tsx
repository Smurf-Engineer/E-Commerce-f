/**
 * Styled Components - Created by eduardoquintero on 21/01/20.
 */
import styled from 'styled-components'
import Radio from 'antd/lib/radio'
import Button from 'antd/lib/button'
import { WHITE, GRAY_DARK, BLUE, DARKER_GRAY } from '../../../theme/colors'
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

export const CloseIcon = styled.img`
  position: absolute;
  top: 24px;
  width: 24px;
  right: 24px;
  &:hover {
    cursor: pointer;
  }
`

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`

export const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 22px;
  text-align: left;
`

export const SubTitle = styled.div`
  font-size: 14px;
  margin: 12px 0 15px;
  text-align: left;
`

export const ButtonContainer = styled.div`
  margin-top: 34px;
  text-align: right;
`

export const SaveButton = styled(Button)`
  border-radius: 2px;
  height: 40px;
  padding: 0 27px;
  background: ${BLUE};
  color: ${WHITE};
`

export const NoteContainer = styled.div`
  text-align: left;
  margin-bottom: 12px;
`

export const NoteTitle = styled.div`
  font-style: italic;
  font-size: 13px;
  color: ${DARKER_GRAY};
`

export const NoteText = styled.div``
