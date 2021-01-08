import styled from 'styled-components'
import { GRAY, WHITE } from '../../../theme/colors'

interface ProductsProps {
  total?: number
  src?: string
}

export const Container = styled.div`
  width: 100%;
  background-color: ${WHITE};
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
`

export const Products = styled.div`
  display: flex;
  max-height: ${({ total }: ProductsProps) => total > 0 ? '200px' : '0'};
  transition: all 0.5s ease;
`

export const ProductThumbnail = styled.div`
    box-shadow: 0px 1px 3px 0px ${GRAY};
    width: 160px;
    padding: 6px;
`

export const Image = styled.img`
  width: 100%;
  background-image: url('${({ src }: ProductsProps) => src || ''}');
  margin-bottom: 5px;
`

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
`

export const Description = styled.div`
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 120px;
  white-space: nowrap;
`

export const Trash = styled.img`
`