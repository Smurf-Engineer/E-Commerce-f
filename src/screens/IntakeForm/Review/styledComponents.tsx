import styled from 'styled-components'
import { GRAY_DARK, GRAY_LIGHT, RED, WHITE } from '../../../theme/colors'

interface ImagePreviewProps {
  src: string
}

export const Container = styled.div`
  width: 75%;
  background-color: ${WHITE};
  display: inline-flex;
  flex-direction: column;
  padding: 0 240px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
`

export const StrongText = styled.div`
  color: ${GRAY_DARK};
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  word-break: break-all;
  @media (max-width: 768px) {
    width: 50%;
  }
`

export const PaletteName = styled.div``

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Text = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
  word-break: break-all;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 120px;
  @media (max-width: 768px) {
    flex-direction: row;
    margin: 0;
    width: 100%;
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const ProjectData = styled.div`
  display: flex;
  flex-flow: column;
`

export const DataRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
`

export const DataText = styled.div`
  font-size: 16px;
  max-width: 218px;
  width: 100%;
  @media (max-width: 768px) {
    max-width: 140px;
  }
`

export const DataValue = styled.div`
  color: ${GRAY_DARK};
  font-weight: 600;
  font-size: 16px;
  word-break: break-all;
  flex: 1;
`

export const EditButton = styled.div`
  color: ${RED};
  align-self: flex-end;
  cursor: pointer;
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
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
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

export const InspirationName = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
`

export const Color = styled.div`
  margin-bottom: 50px;
  display: flex;
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
