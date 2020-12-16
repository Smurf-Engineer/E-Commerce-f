import styled from 'styled-components'
import { GRAY_DARK, GRAY_LIGHTEST, RED, TRANSPARENT } from '../../theme/colors'
import Check from '../../assets/Check.svg'

interface ImagePreviewProps {
  src: string
  selected?: boolean
}

export const Container = styled.div`
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
`

export const List = styled.div`
  padding-top: 22px;
  height: 70vh;
  overflow: auto;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  align-items: center;

  @media (min-width: 320px) and (max-width: 480px) {
    max-height: 80vh;
  }
`

export const Images = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5px;
  row-gap: 15px;
  justify-items: center;
  @media (min-width: 320px) and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

export const ImageContainer = styled.div`
  width: 200px;
  background-color: ${GRAY_LIGHTEST};
`

export const Image = styled.div`
  background-size: cover;
  background-position: center;
  background-image: url('${({ src }: ImagePreviewProps) => src || ''}');
  width: 200px;
  height: 200px;
  position: relative;
  border: ${({ selected }: ImagePreviewProps) => selected ? '2px' : '1px'} solid;
  border-color: ${({ selected }: ImagePreviewProps) => selected ? RED : TRANSPARENT};
  &:hover {
    cursor: pointer;
  }
  &::after {
    content: ${({ selected }: ImagePreviewProps) => selected ? `url(${Check})` : '""'};
    background: ${RED};
    width: 20px;
    height: 20px;
    position: absolute;
    top: -10px;
    right: -10px;
    display: ${({ selected }: ImagePreviewProps) => selected ? 'flex' : 'none'};
    justify-content: center;
    align-items: baseline;
    border-radius: 10px;
  }
`

export const modalStyle = { top: 20, paddingBottom: '96px' }

export const bodyStyle = { padding: '12px' }

export const NotFound = styled.div`
  font-size: 18px;
`
