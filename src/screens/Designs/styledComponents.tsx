/**
 * Styled Components - Created by david on 27/03/18.
 */
import styled from 'styled-components'
import { GRAY_DARK, GRAY_LIGHTEST, WHITE } from '../../theme/colors'

interface DivProps {
  selected?: boolean
}

export const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
`

export const ContainerError = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export const ColorButtons = styled.div`
  display: flex;
  flex-flow: column;
  position: absolute;
  left: 25px;
  top: 140px;
  z-index: 3;
  animation: fade-in-left 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) 2s both;
  @keyframes fade-in-left {
    0% {
      transform: translateX(-7px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @media (max-width: 768px) {
    top: 170px;
    left: 18px;
  }
`

export const ToneButton = styled.img`
  object-fit: contain;
  height: 27px;
  width: 27px;
  background: ${({ selected }: DivProps) => selected ? GRAY_LIGHTEST : WHITE};
  padding: 5px;
  margin-bottom: 8px;
  border-radius: 25px;
  box-shadow: ${({ selected }: DivProps) => selected ? 'unset' : `0px 2px 3px -1px ${GRAY_DARK}`};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Message = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const Model = styled.div`
  color: #5f6062;
  user-select: none;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Row = styled.div`
  display: flex;
  margin-top: 16px;
  height: 20px;
`

export const QuickView = styled.img`
  cursor: pointer;
  margin-left: 8px;
`

export const RenderContainer = styled.div`
  width: 600px;
  position: relative;
`
