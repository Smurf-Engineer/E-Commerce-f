/**
 * Styled Components - Created by miguelcanobbio on 14/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'
import { WHITE, GRAY_DARK, RED, BLUE } from '../../theme/colors'

type StyledProps = {
  listForMyAccount: boolean
}
const BUTTON_COLOR = ({ listForMyAccount }: StyledProps) =>
  listForMyAccount ? RED : BLUE

export const Container = styled.div`
  width: 100%;
  padding-bottom: 40px;
`

export const Text = styled.div`
  color: ${WHITE};
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Message = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`
export const ButtonWrapper = styled.div`
  .ant-btn {
    background-color: ${WHITE};
    border-color: ${BUTTON_COLOR};
    color: ${BUTTON_COLOR};
  }
  .ant-btn:hover {
    background-color: ${BUTTON_COLOR};
    color: ${WHITE};
  }
  @media (max-width: 1024px) {
    text-align: center;
  }
`

export const StyledEmptyButton = styled(Button)`
  height: 44px;
  width: 200px;
  border: 1px solid ${BUTTON_COLOR};
  border-radius: 5px;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 20px;
`

export const StyledCheckbox = styled(Checkbox)`
  height: 22px;
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 5px 0;
`

export const DeleteConfirmMessage = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const modalStyle = { top: 20, paddingBottom: '96px' }
