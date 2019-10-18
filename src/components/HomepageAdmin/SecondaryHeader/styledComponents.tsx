/**
 * Styled Components - Created by eduardoquintero on 30/05/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { WHITE_SMOKE, BLUE } from '../../../theme/colors'

export const Container = styled.div`
  margin-bottom: 20px;
  width: 100%;
`

export const UploadersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
`

export const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 10px;
`

export const Title = styled.div`
  margin-bottom: 20px;
`

export const Subtitle = styled.p`
  font-weight: 600;
  margin-top: 30px;
`

export const SlideTitle = styled.p``

export const SlideOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const SlideOptions = styled.div`
  display: flex;
`

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  margin-right: 30px
}
`

interface ButtonWrapperProps {
  disabled: boolean
}

export const ButtonWrapper = styled.div`
  margin-top: 25px;
  text-align: right;
  align-self: right;
  .ant-btn-primary {
    background-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : BLUE};
    border-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : BLUE};
  }
  .ant-btn-primary:hover {
    background-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : BLUE};
    border-color: ${({ disabled }: ButtonWrapperProps) =>
      disabled ? WHITE_SMOKE : BLUE};
  }
`

export const StyledButton = styled(Button)`
  height: 40px;
`
