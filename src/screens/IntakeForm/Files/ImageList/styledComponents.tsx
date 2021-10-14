import Icon from 'antd/lib/icon'
import styled from 'styled-components'
import { BLUE, GRAY_DARK, GRAY_LIGHT, GRAY_LIGHTEST, RED } from '../../../../theme/colors'

interface ImagePreviewProps {
  src: string
}

export const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
  justify-content: flex-start;
  @media (max-width: 768px) {
    max-width: 300px;
    justify-content: space-between;
  }
`

export const DocIcon = styled(Icon)`
  width: 300px;
  height: 300px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 48px;
  color: ${GRAY_DARK};
  background: ${GRAY_LIGHTEST};
  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
  }
`

export const LogoImage = styled.img`
  width: 300px;
  height: 300px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 48px;
  color: ${GRAY_DARK};
  background: ${GRAY_LIGHTEST};
  padding: 34%;
  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
  }
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

export const Button = styled.div`
  margin-top: 2px;
  &:hover {
    cursor: pointer;
  }
`

export const DeleteButton = styled(Button)`
  color: ${RED};
  &:hover {
    cursor: pointer;
  }
`
export const EditButton = styled.div`
  color: ${BLUE};
  &:hover {
    cursor: pointer;
  }
`

export const ImageText = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  font-weight: 600;
  margin-top: 6px;
  overflow: hidden;
  white-space: nowrap;
`

export const ActionButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
