/**
 * Styled Components - Created by eduardoquintero on 30/05/19.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import InputNumber from 'antd/lib/input-number'
import { GRAY_LIGHTEST } from '../../theme/colors'

export const Container = styled.div`
  padding-bottom: 36px;
  width: 100%;
  padding-left: 10px;
`
export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 22px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`

export const StyledInput = styled(Input)`
  border-radius: 0;
  height: 35px;
`

export const SpinContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledButton = styled(Button)`
  width: 160px;
  margin-top: 20px;
  background-color: ${({ disabled }: any) =>
    disabled ? `${GRAY_LIGHTEST} !important` : ''};
  border-color: ${({ disabled }: any) =>
    disabled ? `${GRAY_LIGHTEST} !important` : ''};
`

export const StyledInputNumber = styled(InputNumber)`
  border-radius: 0;
  width: 160px;
  height: 35px;
`

type PropsButton = {
  color: string
}

export const ButtonWrapper = styled.div`
  .ant-btn-primary {
    background-color: ${({ color }: PropsButton) => color};
    border-color: ${({ color }: PropsButton) => color};
    border-radius: 0;
  }
  .ant-btn-ghost:hover,
  .ant-btn-ghost:focus,
  .ant-btn-primary:hover {
    background-color: ${({ color }: PropsButton) => color};
    border-color: ${({ color }: PropsButton) => color};
  }
`

export const BoxContainer = styled.div`
  width: 40%;
  margin-bottom: 30px;
`

export const InfoText = styled.p`
  margin-bottom: 3px;
`
