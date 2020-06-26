/**
 * Styled Components - Created by Jesús Apodaca on 19/03/20.
 */
import styled from 'styled-components'
import DatePicker from 'antd/lib/date-picker'
import Select from 'antd/lib/select'
import { GRAY_DARK, GRAY_LIGHT, RED, WHITE_TRANSPARENT, BLUE, WHITE, GRAY } from '../../theme/colors'
import Input from 'antd/lib/input/Input'

const RangePicker = DatePicker.RangePicker

interface ContainerProps {
  withoutPadding?: boolean
}

interface HeaderProps {
  textAlign?: string
  width?: string
}

interface CellProps {
  bold?: boolean
  width?: string
}

export const Container = styled.div`
  padding-bottom: 36px;
  width: 100%;
  margin-top: -64px;
  @media (max-width: 768px) {
    margin-top: -14px;
  }
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

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 34px;
  align-items: flex-end;
  padding-right: ${({ withoutPadding }: ContainerProps) =>
    withoutPadding ? '0' : '32px'};
  @media (min-width: 320px) and (max-width: 768px) {
    padding-right: 0;
    align-items: center;
  }
`

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom 24px;
`

export const Row = styled.tr``

export const Header = styled.th`
  border-bottom: 1px solid #818181;
  text-align: left;
  padding: 8px 0;
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  width: ${({ width }: HeaderProps) => width ? width : 'auto'};
  text-align: ${({ textAlign }: HeaderProps) =>
    textAlign ? textAlign : 'start'};

  @media (min-width: 320px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 11px;
    line-height: 15px;
  }
`

export const RepDiv = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #e6e6e5;
  }
`

export const Cell = styled.td`
  border-bottom: 1px solid ${GRAY_LIGHT};
  text-align: left;
  padding: 4px 0;
  width: ${({ width }: HeaderProps) => width ? width : 'auto'};
  color: ${GRAY_DARK};
  font-size: 14px;
  letter-spacing: 0.1px;
  text-transform: capitalize;
  line-height: 35px;
  text-align: start;
  font-weight: ${({ bold }: CellProps) => bold ? 'bold' : 'normal'};
  &.error {
    color: ${RED};
  }
  @media (max-width: 768px) {
    font-size: 11px;
  }
`

export const LoadingContainer = styled.div`
  position: fixed;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: ${WHITE_TRANSPARENT};
`

export const InfoSection = styled.div`
  display: flex;
  flex-flow: column;
  margin: 54px 0;
  height: 64px;
  font-style: italic;
  justify-content: space-between;
`

export const HeaderList = styled.div`
  box-shadow: 0px 1px 3px 0px ${GRAY};
  display: flex;
  flex-flow: column;
  font-weight: bold;
  font-size: 18px;
  justify-content: flex-start;
  padding: 16px 24px;
  margin-bottom: 24px;
  margin-right: 34px;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`

export const InputDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 28px;
  @media (max-width: 768px) {
    flex-flow: column;
    align-items: flex-start;
    height: 212px;
    justify-content: space-between;
  }
`

export const StatusFilter = styled(Select)`
  max-width: 188px;
  width: 100%;
  margin-right: 28px;
  .ant-select-selection--single {
    padding-top: 4px;
    height: 40px;
    font-weight: normal;
    border-radius: 0;
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

export const OrderPoint = styled(Input)`
  max-width: 188px;
  width: 100%;
  height: 40px;
  margin-right: 28px;
  border-radius: 0px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

export const RangePickerStyled = styled(RangePicker)`
  .ant-input-lg {
    border-radius: 0px;
  }
  .ant-calendar-range {
    @media (max-width: 768px) {
      width: auto;
    }
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
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    justify-content: center;
  }
`

export const PayIcon = styled.img`
  max-width: 158px;
  width: 100%;
  margin-left: -16px;
  margin-bottom: 12px;
`