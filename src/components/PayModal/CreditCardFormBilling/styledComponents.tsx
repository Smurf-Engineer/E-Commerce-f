/**
 * Styled Components - Created by miguelcanobbio on 16/05/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Checkbox from 'antd/lib/checkbox'
import Button from 'antd/lib/button'
import { GRAY, RED, GRAY_DARK, BLUE, WHITE } from '../../../theme/colors'

export const Container = styled.div`
  width: 100%;
`
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
  width: 100%;
`

export const Column = styled.div`
  width: 100%;

 @media (max-width: 768px) {
    width: 100%;
  }
`

export const ContainerInput = styled.div`
  border: 1px solid ${GRAY};
  border-radius: 0;
  height: 40px;
  margin-top: 5px;
  padding: 9px 16px;
  width: 100%;
`

export const StyledInput = styled(Input)`
  border: 1px solid ${GRAY};
  border-radius: 0;
  height: 40px;
  margin-top: 5px;
  width: 100%;
`

export const RequiredSpan = styled.span`
  color: ${RED};
  margin: 0 5px;
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

export const ContainerBilling = styled.div`
  margin-bottom: 24px;
  margin-top: 16px;
`

export const StyledCheckbox = styled(Checkbox)`
  color: ${GRAY_DARK};
  font-size: 16px;
  height: 36px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 5px 0;

  .ant-checkbox-wrapper:hover,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${BLUE};
  }
  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: ${BLUE};
  }
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin: 24px 0;
`
export const ErrorMsg = styled.div`
  color: ${RED};
  font-size: 12px;
  height: 16px;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const MyCardsRow = styled.div`
  margin-bottom: 20px;
`
export const ContinueButton = styled(Button)`
  background-color: ${BLUE};
  border-radius: 2px;
  color: ${WHITE};
  height: 40px;
  width: 138.23px;

  &:hover {
    background-color: ${BLUE};
    border-color: ${BLUE};
    color: ${WHITE};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`
export const StripeCardElement = {
  base: {
    fontSize: '16px',
    color: GRAY_DARK
  }
}
