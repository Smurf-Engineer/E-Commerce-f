import styled from 'styled-components'
import { GRAY, GRAY_LIGHT, WHITE, RED } from '../../../theme/colors'
import { BLACK } from '../../DesignerTool/constants'

interface ProductsProps {
  total?: number
  src?: string
  open?: boolean
}

export const Container = styled.div`
  background-color: ${WHITE};
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  overflow: hidden;
  padding: 10px;
  margin: 0 150px 10px 40px;
  border: 1px solid ${GRAY_LIGHT};
  transition: all 0.3s ease;
  opacity: ${({ total }: ProductsProps) => total > 0 ? '1' : '0'};
  @media (max-width: 768px) {
    width: 100%;
    top: -10;
    position: fixed;
    z-index: 3;
    left: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: -5px 2px 15px ${BLACK};
    border-color: transparent;
    opacity: 1;
    opacity: ${({ total = 0 }: ProductsProps) => total > 0 ? '1' : '0'};
    top:  ${({ total = 0, open }: ProductsProps) => total > 0 ?
      (!open ? '-132px' : '50px') : '50px'};
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: none;
  }
`

export const HeaderMobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export const Products = styled.div`
  display: flex;
  max-height: ${({ total }: ProductsProps) => total > 0 ? '400px' : '0'};
  transition: all 0.4s ease;
  @media (max-width: 768px) {
    padding: 5px;
    display: inline-block;
    overflow: auto;
    white-space: nowrap;
    max-height: ${({ total }: ProductsProps) => total > 0 ? '800px' : '0'};
  }
`

export const ProductThumbnail = styled.div`
  box-shadow: 0px 1px 3px 0px ${GRAY};
  width: 160px;
  padding: 6px;
  margin-right: 10px;
  @media (max-width: 768px) {
    display: inline-block;
  }
`

export const Image = styled.img`
  width: 100%;
  @media (max-width: 768px) {
    object-fit: cover;
  }
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
  &:hover {
    cursor: pointer;
  }
`

export const Title = styled.div`
  margin-right: 6px;
  font-weight: 600;
`

export const Badge = styled.div`
  background-color: ${RED};
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${WHITE};
  margin-top: -4px;
  margin-right: 15px;
  border-radius: 13px;
  @media (max-width: 768px) {
    margin: 0;
  }
`

export const ActionsContainer = styled.div`
  display: flex;
`

export const Arrow = styled.img`
  display: none;
  @media (max-width: 768px) {
    display: inline-block;
    margin-left: 10px;
    transition: all 0.3s ease;
    &.open {
      transform: rotate(180deg);
    }
  }
`