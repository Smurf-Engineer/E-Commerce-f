/**
 * Styled Components - Created by miguelcanobbio on 05/06/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

interface InputProps {
  inputhWidth?: string
}

interface RowProps {
  marginBottom?: string
}

export const Container = styled.div`
  width: 100%;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ marginBottom }: RowProps) =>
    marginBottom ? marginBottom : '16px'};

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
    margin-bottom: 0;
  }
`

export const Column = styled.div`
  width: ${({ inputhWidth }: InputProps) =>
    inputhWidth ? inputhWidth : '400px'};

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 16px;
  }
`
export const InputTitleContainer = styled.div`
  display: flex;
`
export const Label = styled.div`
  height: 19px;
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`
export const DropDownPlaceHolder = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  border: 1px solid #bebebe;
  border-radius: 0;
  margin-top: 5px;
  &:hover {
    border: 1px solid #bebebe;
    color: #bebebe;
  }
`

export const Option = styled.div`
  display: flex;
  align-items: center;
`

export const MenuOption = styled.div`
  color: #5f6062;
  margin-left: 12px;
  font-size: 14px;
  line-height: 22px;
`

export const StyledButton = styled(Button)`
  height: 40px;
  width: 100%;
  border-radius: 2px;
`
