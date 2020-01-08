/**
 * Styled Components - Created by eduardoquintero on 30/12/19.
 */
import styled from 'styled-components'
import AntdButton from 'antd/lib/button'
import { WHITE, GRAY_DISABLE, GRAY_DARK } from '../../../theme/colors'

export const Container = styled.div``

export const Text = styled.div`
  color: ${WHITE};
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
  background-color: ${GRAY_DISABLE};
  align-items: center;
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`

export const Button = styled(AntdButton)`
  margin-left: 4px;
`

export const InputContainer = styled.div`
  position: relative;
  padding: 16px;
`

export const ColorButtons = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 4px 32px;
`
