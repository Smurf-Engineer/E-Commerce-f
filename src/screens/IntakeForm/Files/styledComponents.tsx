import styled from 'styled-components'
import { WHITE, GRAY_DARK, GRAY_LIGHT, RED } from '../../../theme/colors'
import icon from 'antd/lib/icon'

interface ImagePreviewProps {
  src: string
}

export const Container = styled.div`
  width: 100%;
  background-color: ${WHITE};
  display: flex;
  padding-right: 2px;
  overflow: hidden;
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

export const Icon = styled(icon)`
  margin-right: 8px;
`

export const Description = styled.div`
  margin: 10px 0 30px 0;
`

export const Images = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  column-gap: 15px;
  row-gap: 15px;
  justify-items: center;
`

export const ImageContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const Image = styled.div`
  background-size: cover;
  background-position: center;
  background-image: url('${({ src }: ImagePreviewProps) => src || ''}');
  width: 300px;
  height: 300px;
  background-color: ${GRAY_LIGHT};
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

export const DeleteButton = styled.div`
  color: ${RED};
  margin-top: 2px;
  &:hover {
    cursor: pointer;
  }
`