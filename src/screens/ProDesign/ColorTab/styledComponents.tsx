/**
 * Styled Components - Created by eduardoquintero on 19/09/19.
 */
import styled from 'styled-components'
import { GRAY_LIGHTEST, GRAY_DARK } from '../../../theme/colors'
import Icon from 'antd/lib/icon'
import Select from 'antd/lib/select'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Header = styled.div`
  background-color: ${GRAY_LIGHTEST};
  font-size: 15px;
  text-align: center;
  padding: 10px;
  font-weight: 600;
  position: relative;
`

export const Arrow = styled(Icon)`
  color: ${GRAY_DARK};
  position: absolute;
  left: 20px;
  cursor: pointer;
  font-size: 16px;
  top: 50%;
  margin: -8px;
`

export const TabContent = styled.div``

export const Column = styled.div`
  width: 100%;
  display: flex;
  text-transform: capitalize;
  padding: 4px 32px;
  align-items: center;
`

export const Label = styled.div`
  flex:1;
  color: ${GRAY_DARK};
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const StyledSelect = styled(Select)`
  width: 168px;
  & .ant-select-selection {
    border-radius: 0;
  }
`

export const dropDownStyles = {
  textTransform: 'capitalize'
}