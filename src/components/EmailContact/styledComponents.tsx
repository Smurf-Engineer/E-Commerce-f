/**
 * Styled Components - Created by gustavomedina on 16/04/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import AntdButton from 'antd/lib/button'
import { RED } from '../../theme/colors'

export const Container = styled.div`
  background-color: #222;
`

export const Text = styled.div`
  color: #fff;
`

export const Title = styled.div`
  height: 27px;
  color: #5f6062;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
`

export const TitleLabel = styled.div`
  height: 19px;
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  margin-top: 15px;
  margin-bottom: 5px;
`

export const StyledInput = styled(Input)`
  margin-bottom: 20px;
  margin-top: 0px;
  border-radius: 0px;
  width: 100%;
`

export const StyledInputBox = styled(Input)`
  margin-bottom: 20px;
  margin-top: 0px;
  border-radius: 0px;
  width: 100%;
  height: 40%;
`

export const Button = styled(AntdButton)`
  height: 40px;
  width: 93px;
`

export const ButtonWrapper = styled.div`
  margin-bottom: 10px;
  margin-top: 15px;
  text-align: right;
  .ant-btn-primary {
    background-color: #4a90e2;
    border-color: #4a90e2;
    width: 150px;
  }
  .ant-btn-primary:hover {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }
`

export const ExtraFields = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`

export const FieldContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: start;
  flex-direction: column;
`

interface LabelProps {
  required: boolean
}

export const Label = styled.p`
  margin: 0 10px 10px 0;
  width: 200px;
  &::after{
    content: '${({ required }: LabelProps) => (required ? ' *' : '')}';
    color: ${RED}
  }
`
