/**
 * Styled Components - Created by miguelcanobbio on 28/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'
import { RED } from '../../theme/colors'

type StyleProps = {
  checkColor?: string
}

export const Container = styled.div`
  margin-right: 10%;
  margin-bottom: 20px;

  @media (max-width: 700px) {
    margin-right: 0;
  }
`

export const PaymentText = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const CardNumber = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0;
`

export const StyledImage = styled.img`
  margin-left: 8px;
  width: 42px;
  height: 25.5px;
`

export const ItalicText = styled.div`
  width: 128px;
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  font-style: italic;
  margin-top: 8px;
`

export const SecondaryButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`

export const StyledButton = styled(Button)`
  height: 40px;
  width: 138.23px;
  border: 1px solid #dcdcdc;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
`

export const StyledCheckbox = styled(Checkbox)`
  height: 36px;
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 5px 0;

  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus > .ant-checkbox-inner {
    border-color: ${({ checkColor }: StyleProps) => checkColor || RED};
  }
  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: ${({ checkColor }: StyleProps) => checkColor || RED};
  }
`
