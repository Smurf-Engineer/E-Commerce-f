/**
 * Styled Components - Created by miguelcanobbio on 29/05/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'
import {
  GRAY_DARK,
  RED,
  GRAY,
  BLUE,
  WHITE,
  GRAY_LIGHT,
  BLUE_SOFT
} from '../../theme/colors'

interface InputProps {
  inputhWidth?: string
}

interface RowProps {
  withoutMargin?: boolean
}

export const Container = styled.div`
  width: 100%;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ withoutMargin }: RowProps) =>
    withoutMargin ? '0px' : '22px'};
  width: 100%;
`

export const Column = styled.div`
  width: ${({ inputhWidth }: InputProps) =>
    inputhWidth ? inputhWidth : '400px'};
`

export const InputTitleContainer = styled.div`
  display: flex;
`

export const Label = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  height: 19px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const RequiredSpan = styled.span`
  color: ${RED};
  margin: 0 5px;
`

export const ContainerInput = styled.div`
  border: 1px solid ${GRAY};
  border-radius: 0;
  height: 40px;
  margin-top: 5px;
  padding: 9px 16px;
  width: 100%;
`

export const ErrorMsg = styled.div`
  color: ${RED};
  font-size: 12px;
  height: 16px;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const StyledInput = styled(Input)`
  border: 1px solid ${GRAY};
  border-radius: 0;
  height: 40px;
  margin-top: 5px;
  width: 100%;
`
export const StyledButton = styled(Button)`
  background-color: ${BLUE};
  border-color: ${BLUE};
  border-radius: 5px;
  color: ${WHITE};
  height: 40px;
  margin-right: 8px;
  width: 85px;

  &:hover {
    background-color: ${BLUE_SOFT};
    border-color: ${BLUE_SOFT};
  }
`

export const StyledGhostButton = styled(Button)`
  background-color: ${WHITE};
  border: 1px solid ${GRAY_LIGHT};
  border-radius: 5px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  height: 40px;
  width: 85px;

  &:hover {
    border-color: ${BLUE};
    color: ${BLUE};
  }
`

export const StyledCheckbox = styled(Checkbox)`
  color: ${GRAY_DARK};
  font-size: 16px;
  height: 36px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const StripeCardElement = {
  base: {
    fontSize: '16px',
    color: GRAY_DARK
  }
}
