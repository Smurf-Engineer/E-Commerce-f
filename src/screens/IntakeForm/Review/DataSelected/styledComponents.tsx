import styled from 'styled-components'
import { GRAY_DARK, GRAY_LIGHT, RED } from '../../../../theme/colors'

interface ImagePreviewProps {
  src: string
}

export const StrongText = styled.div`
  color: ${GRAY_DARK};
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    width: 50%;
  }
`

export const Text = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    width: 40%;
  }
`

export const PaletteName = styled.div``

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

export const EditButton = styled.div`
  color: ${RED};
  align-self: flex-end;
  margin-bottom: 10px;
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
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  column-gap: 15px;
  row-gap: 10px;
  justify-items: flex-start;
  margin-top: 10px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
`

export const ImageContainer = styled.div`
  width: 110px;
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
  width: 110px;
  height: 110px;
  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
  background-color: ${GRAY_LIGHT};
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

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
`