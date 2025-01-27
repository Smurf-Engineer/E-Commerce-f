/**
 * Styled Components - Created by eduardoquintero on 29/05/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { GRAY_STRONG, RED, WHITE } from '../../../theme/colors'
import Input from 'antd/lib/input'
import Checkbox from 'antd/lib/checkbox/Checkbox'

const Search = Input.Search
interface ContainerProps {
  withoutPadding?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

interface HeaderProps {
  textAlign?: string
}

export const Header = styled.th`
  border-bottom: 1px solid #818181;
  text-align: left;
  padding: 8px 0;
  color: #5f6062;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  text-align: ${({ textAlign }: HeaderProps) =>
    textAlign ? textAlign : 'start'};

  @media (min-width: 320px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 12px;
    line-height: 15px;
  }
`

export const AddInternalButton = styled(Button)`
  height: 50px;
  border: 2px solid ${RED};
  border-radius: 2px;
  background-color: ${WHITE};
  color: ${RED};
  margin-right: 22px;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`

export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`

export const SearchInput = styled(Search)`
  margin-top: 0px;
  border-radius: 0;
  margin-left: 4px;
  width: 500px;
  & input {
    border-radius: 0;
    padding: 7px;
    height: 48px;
  }
`

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

export const Checkboxes = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 28px;
`

export const CheckboxStyled = styled(Checkbox)`
  color: ${GRAY_STRONG};
  display: flex;
  width: 100%;
  &:last-child {
    margin-top: 12px;
  }
  &.ant-checkbox-wrapper {
    margin-left: 0px;
  }
`