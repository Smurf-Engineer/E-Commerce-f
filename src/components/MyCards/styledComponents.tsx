/**
 * Styled Components - Created by miguelcanobbio on 28/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { WHITE, GRAY_DARK, RED, BLUE } from '../../theme/colors'

type StyledProps = {
  listForMyAccount: boolean
}

const BUTTON_COLOR = ({ listForMyAccount }: StyledProps) =>
  listForMyAccount ? RED : BLUE

export const Container = styled.div`
  width: 100%;
`

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
`

export const MyCardsList = styled.div`
  display: flex;
  justify-content: flex-start;
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
`

export const StyledEmptyButton = styled(Button)`
  height: 43px;
  width: 195px;
  border: 2px solid ${BUTTON_COLOR};
  border-radius: 2px;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 20px;
`

export const DeleteConfirmMessage = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`
