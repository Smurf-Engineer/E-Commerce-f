import styled from 'styled-components'
import { WHITE, GRAY_DARK, GRAY_LIGHT, RED, BLUE } from '../../../theme/colors'
import Checkbox from 'antd/lib/checkbox'
import icon from 'antd/lib/icon'

interface ImagePreviewProps {
  src: string
}

export const Container = styled.div`
  width: 100%;
  background-color: ${WHITE};
  display: flex;
  padding-right: 2px;
  height: 120vh;
  padding: 10px 180px;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
`

export const DraggerContainer = styled.div`
  margin-bottom: 10px;
  width: 100%;
  .ant-upload.ant-upload-drag {
    padding: 8px;
  }
`

export const ButtonContainer = styled.div`
  display: inline-block;
  margin-left: 8px;
`

export const AskButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
`

export const AskButton = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${RED};
  color: ${RED};
  padding: 8px 16px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    background: ${RED};
    color: ${WHITE};
  }
`

export const Icon = styled(icon)`
  margin-right: 8px;
`

export const Description = styled.div`
  margin: 10px 0 30px 0;
`

export const Images = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
`

export const ImageContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 768px) {
    width: 130px;
  }
`

export const Image = styled.div`
  background-size: cover;
  background-position: center;
  background-image: url('${({ src }: ImagePreviewProps) => src || ''}');
  width: 300px;
  height: 300px;
  background-color: ${GRAY_LIGHT};
  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
  }
`

export const LoginMessage = styled.div`
  font-size: 16px;
  line-height: 23px;
  margin-top: 16px;
  text-align: center;
`

export const CustomButton = styled.div`
  padding: 5px;
  border: 1px solid ${GRAY_DARK};
  border-radius: 4px;
  justify-content: center;
  width: 200px;
  margin-top: 22px;
  display: inline-flex;
  cursor: pointer;
  transition: background 0.4s ease, color 0.3s ease;
  &:hover {
    background: ${GRAY_DARK}
    color: ${WHITE}
  }
`

export const LoginText = styled.div``

export const ImageText = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  font-weight: 600;
  margin-top: 6px;
  overflow: hidden;
  white-space: nowrap;
`

export const Button = styled.div`
  margin-top: 2px;
  &:hover {
    cursor: pointer;
  }
`
export const DeleteButton = styled(Button)`
  color: ${RED};
`
export const EditButton = styled.div`
  color: ${BLUE};
`

export const ActionButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const CheckboxLabel = styled.div`
  display: inline-block;
`

export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  margin-top: 35px;
`

export const StyledCheckbox = styled(Checkbox)`
@media (max-width: 768px) {
  display: flex;
  font-size: 13px;
}
`