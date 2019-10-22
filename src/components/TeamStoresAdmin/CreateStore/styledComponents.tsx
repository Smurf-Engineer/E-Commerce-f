/**
 * Styled Components - Created by Jesús Apodaca on 04/10/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Select from 'antd/lib/select'
import DatePicker from 'antd/lib/date-picker'
import Switch from 'antd/lib/switch'
import Search from 'antd/lib/auto-complete'
import InputComponent from 'antd/lib/input'
import {
  GRAY_STRONG,
  BLUE,
  WHITE,
  RED,
  GRAY_DARK,
  GRAY_SKELETON,
  WHITE_TRANSPARENT
} from '../../../theme/colors'

interface DivProps {
  fullSize?: boolean
  disabled?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 1024px;
`

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Avenir Next';
  font-size: 16px;
  justify-content: space-around;
  width: 203px;
  cursor: pointer;
`

export const RowInput = styled.div`
  margin-top: 26px;
  display: flex;
`

export const InputDiv = styled.div`
  width: ${({ fullSize }: DivProps) => (fullSize ? '467px' : '220px')};
  margin-right: 26px;
`

export const Input = styled(InputComponent)`
  border-radius: 0;
  margin-top: 6px;
`

export const StyledSelect = styled(Select)`
  margin-top: 6px;
  width: 100%;
  .ant-select-selection {
    border-radius: 0;
  }
`

export const StyledDatePicker = styled(DatePicker)`
  margin-top: 6px;
  width: 100%;
  input {
    border-radius: 0;
  }
`

export const SwitchInput = styled(Switch)`
  margin-top: 14px;
`

export const Label = styled.div`
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-top: 22px;
  display: flex;
  align-items: center;
  flex: 1;
`

export const SubLabel = styled.div`
  font-family: 'Avenir Next';
  font-size: 12px;
  font-family: 'Avenir Next';
  font-size: 12px;
  margin-left: 8px;
  color: ${GRAY_STRONG};
  font-weight: normal;
`

export const AddItem = styled(Button)`
  width: 221px;
  margin: 16px 0px;
`

export const UploadSection = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 16px;
`

export const ButtonDelete = styled.div`
  color: ${RED};
  font-size: 14px;
  line-height: 19px;
  margin-left: 8px;
  cursor: pointer;
  display: inline-block;
`

export const PreviewImage = styled.img`
  width: 100%;
  max-width: 1452px;
  max-height: 300px;
  object-fit: cover;
  margin: 0 auto;
  display: block;
  margin-bottom: 16px;
`

export const BuildButton = styled.button`
  color: ${WHITE};
  font-family: 'Avenir Next';
  font-size: 16px;
  width: 220.37px;
  transition: all 0.25s ease;
  border: none;
  border-radius: 2px;
  background-color: ${({ disabled }: DivProps) =>
    disabled ? GRAY_SKELETON : BLUE};
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  cursor: ${({ disabled }: DivProps) => (disabled ? 'not-allowed' : 'pointer')};
`

export const InfoTitle = styled.div`
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  color: ${GRAY_DARK};
`

export const InfoUser = styled.div`
  margin-left: -36px;
  font-family: 'Avenir Next';
  font-size: 16px;
  color: ${GRAY_DARK};
`

export const Loader = styled.div`
  height: 100vh;
  position: fixed;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 3;
  background: ${WHITE_TRANSPARENT};
`

export const StyledSearch = styled(Search)`
  width: 100%;
  .ant-select-selection__rendered {
    line-height: 50px !important;
  }
`

export const SearchButton = styled(Button)`
  height: 100%;
  border: none;
  width: 35px;
`

export const okButtonStyles = {
  background: BLUE,
  border: 'none',
  borderRadius: '2px'
}
