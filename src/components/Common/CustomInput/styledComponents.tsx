/**
 * Styled Components - Created by cazarez on 22/02/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'

interface InputProps {
  inputWidth?: string
}

export const Container = styled.div`
  ${({ inputWidth }: InputProps) =>
    inputWidth ? `width: ${inputWidth};` : ''};
  font-color: red;
`

export const FloatingText = styled.div`
  color: #5f6062;
  padding-bottom: 5px;
`

export const StyledInput = styled(Input)`
  border-radius: 0px;
  margin-bottom: 20px;
`
export const FloatingTitleContainer = styled.div`
  display: flex;
`

export const RequiredSpan = styled.span`
  color: #e61737;
  margin-left: 5px;
`
