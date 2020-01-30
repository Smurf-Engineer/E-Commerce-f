/**
 * Styled Components - Created by david on 06/04/18.
 */
import styled, { keyframes } from 'styled-components'
import Input from 'antd/lib/input'
import { BLUE, BLUE_SHADOW, GRAY_DARK, WHITE } from '../../theme/colors'

export const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`

export const Container = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.6s cubic-bezier(0.67, 0.35, 0.565, 1) both;
  padding-bottom: 16px;
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
`

export const Text = styled.div`
  color: ${WHITE};
`

export const PaginationRow = styled.div`
  text-align: right;
  padding-right: 36px;

  @media (min-width: 320px) and (max-width: 768px) {
    padding-right: 0;
    text-align: center;
  }
`

export const TitleError = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const MessageError = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const ConfirmMessage = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const MessageText = styled.div`
  max-width: 500px;
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-bottom: 20px;
`

export const InputWrapper = styled.div`
  padding: 4px 0px;
  .ant-input:hover {
    border-color: ${BLUE};
  }

  .ant-input:focus {
    border-color: ${BLUE};
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px ${BLUE_SHADOW};
    box-shadow: 0 0 0 2px ${BLUE_SHADOW};
  }

  .ant-input::selection {
    background: ${BLUE};
  }
`

export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  margin-top: 0px;
  border-radius: 0px;
  width: 100%;
`
