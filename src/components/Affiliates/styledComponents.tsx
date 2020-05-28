/**
 * Styled Components - Created by Jesús Apodaca on 19/03/20.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import DatePicker from 'antd/lib/date-picker'
import { GRAY_DARK, BLUE, GRAY } from '../../theme/colors'
import { WHITE } from '../../screens/DesignerTool/constants'

const RangePicker = DatePicker.RangePicker
const Search = Input.Search

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

export const SearchInput = styled(Search)`
  border-radius: 0;
  width: 500px;
  margin-top: 32px;
  margin-right: 24px;
  & input {
    border-radius: 0;
    padding: 7px;
    height: 48px;
  }
`

export const HeaderList = styled.div`
  width: 626px;
  box-shadow: 0px 1px 3px 0px ${GRAY};
  display: flex;
  flex-flow: column;
  font-weight: bold;
  justify-content: flex-start;
  padding: 16px 24px;
`

export const CalendarContainer = styled.div``

export const RangePickerStyled = styled(RangePicker)``

export const DateLabels = styled.div`
  display: flex;
  font-weight: normal;
  margin: 9px 0;
  width: 232px;
  justify-content: space-between;
`

export const ShowButton = styled.div`
  display: inline-flex;
  margin-left: 26px;
  background: ${BLUE};
  border: 1px solid ${BLUE};
  padding: 11px 68px;
  border-radius: 3px;
  color: ${WHITE};
  font-weight: normal;
  transition: all .2s;
  cursor: pointer;
  &:hover {
    background: ${WHITE};
    color: ${BLUE};  
  }
`