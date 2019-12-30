/**
 * Styled Components - Created by david on 13/11/18.
 */
import styled from 'styled-components'
import AntdButton from 'antd/lib/button'

export const Container = styled.div``

export const Text = styled.div`
  color: #fff;
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
  background-color: #eff2f4;
  align-items: center;
`

export const Title = styled.div`
  color: #5f6062;
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
