/**
 * Styled Components - Created by Jesús Apodaca on 19/03/20.
 */
import styled from 'styled-components'
import DatePicker from 'antd/lib/date-picker'
import { GRAY_DARK, BLUE, GRAY } from '../../theme/colors'
import { WHITE } from '../../screens/DesignerTool/constants'
import Input from 'antd/lib/input/Input'
import Select from 'antd/lib/select'

const RangePicker = DatePicker.RangePicker

export const Container = styled.div`
  padding-bottom: 36px;
  width: 100%;
`
export const ScreenTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`

export const HeaderList = styled.div`
  box-shadow: 0px 1px 3px 0px ${GRAY};
  display: flex;
  flex-flow: column;
  font-weight: bold;
  font-size: 18px;
  justify-content: flex-start;
  padding: 16px 24px;
`

export const RangePickerStyled = styled(RangePicker)`
  .ant-input-lg {
    border-radius: 0px;
  }
`

export const ShowButton = styled.div`
  display: inline-flex;
  margin-left: 26px;
  background: ${BLUE};
  border: 1px solid ${BLUE};
  padding: 11px 68px;
  border-radius: 3px;
  font-size: 14px;
  color: ${WHITE};
  font-weight: normal;
  transition: all .2s;
  cursor: pointer;
  &:hover {
    background: ${WHITE};
    color: ${BLUE};  
  }
`

export const InputDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 28px;
`

export const OrderPoint = styled(Input)`
  width: 100%;
  height: 40px;
  margin-right: 28px;
  border-radius: 0px;
`

export const StatusFilter = styled(Select)`
  width: 100%;
  .ant-select-selection--single {
    padding-top: 4px;
    height: 40px;
    font-weight: normal;
    border-radius: 0;
  }
`
export const HeaderInput = styled.div`
  max-width: 188px;
  width: 100%;
  margin-right: 28px;
`

export const InputTitle = styled.div`
  font-size: 12px;
  font-weight: normal;
  margin-top: -20px;
  margin-bottom: 6px;
`