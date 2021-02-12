import styled from 'styled-components'
import { GRAY_DARK, GRAY_LIGHT, WHITE } from '../../theme/colors'

interface ImagePreviewProps {
  src: string
}

interface DivProps {
  fullWidth?: boolean
}

export const Container = styled.div`
  width: 100%;
  background-color: ${WHITE};
  display: inline-flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`

export const StrongText = styled.div`
  color: ${GRAY_DARK};
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
`

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

export const InspirationName = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
`

export const Text = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  word-break: break-all;
  width: 100%;
  @media (max-width: 768px) {
    max-width: ${({ fullWidth }: DivProps) => fullWidth ? '100%' : '198px'};
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${({ fullWidth }: DivProps) => fullWidth ? '100%' : '190px'};
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: row;
    max-width: 100%;
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap:wrap;
`

export const Notes = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`

export const Ideas = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`

export const Inspiration = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`

export const Images = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  column-gap: 15px;
  row-gap: 10px;
  justify-items: flex-start;
  margin-top: 10px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`

export const ImageContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 768px) {
    width: 160px;
  }
`

export const Image = styled.div`
  background-size: cover;
  background-position: center;
  background-image: url('${({ src }: ImagePreviewProps) => src || ''}');
  width: 200px;
  height: 200px;
  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
  background-color: ${GRAY_LIGHT};
`

export const Color = styled.div`
  margin-bottom: 50px;
  display: flex;
  width: 70%;
  flex-direction: column;
`
export const Files = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`

export const ImageText = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  font-weight: 600;
  margin-top: 6px;
  overflow: hidden;
  white-space: nowrap;
`

export const Products = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`

export const BackContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  @media (max-width: 768px) {
    display: none;
  }
  &:hover {
    cursor: pointer;
  }
`

export const SpinContainer = styled.div`
  display: inline-flex;
  height: 60vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`