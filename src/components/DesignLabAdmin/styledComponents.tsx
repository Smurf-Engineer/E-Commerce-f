/**
 * Styled Components - Created by eduardoquintero on 30/05/19.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import InputNumber from 'antd/lib/input-number'
import { GRAY_DARK, GRAY_LIGHT, GRAY_LIGHTEST, RED } from '../../theme/colors'

interface CellProps {
  color?: string
  textAlign?: string
}

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

export const StyledInputCurrency = styled(InputNumber)`
  border-radius: 0;
  height: 35px;
  max-width: 70px;
  width: 100%;
  text-align: right;
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
  height: 35px;
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

export const Table = styled.table`
  border-collapse: collapse;
  margin-bottom 24px;
  max-width: 860px;
  width: 100%;
`

export const Header = styled.th`
  border-bottom: 1px solid #818181;
  text-align: center;
  padding: 8px 0;
  color: #5f6062;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  @media (min-width: 320px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 12px;
    line-height: 15px;
  }
`

export const PricesContainer = styled.div`
  width: 100%;
  display: inline-table;
`

export const Thumbnail = styled.img``

export const CurrencyTitle = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-left: 14px;
  margin-top: 2px;
  font-weight: bold;
`

export const Row = styled.tr``

export const Cell = styled.td`
  border-bottom: 1px solid ${GRAY_LIGHT};
  padding: 8px 0;
  color: ${({ color }: CellProps) => (color ? color : GRAY_DARK)};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 35px;
  text-align: ${({ textAlign }: CellProps) =>
    textAlign ? textAlign : 'start'};
  &.error {
    color: ${RED};
  }
  @media (min-width: 331px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 12px;
  }

  @media (max-width: 330px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 11px;
  }
`