/**
 * Styled Components - Created by eduardoquintero on 02/12/20.
 */
import styled from 'styled-components'
import { GRAY_DARK, GRAY_LIGHTEST, RED, TRANSPARENT, WHITE } from '../../../theme/colors'

interface StyleProps {
  selected?: boolean
}

export const Container = styled.div`
  width: 60%;
  background-color: ${WHITE};
  display: inline-flex;
  flex-direction: column;
  padding: 0 240px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-weight: 600;
  font-size: 17px;
  margin-bottom: 25px;
`

export const InfoText = styled.div`
  margin: 10px 0;
  font-style: italic;
`

export const SelectPaletteContainer = styled.div`
  margin-top: 10px;
  display: flex;
  border: 1px solid ${GRAY_LIGHTEST};
  border-bottom: none;
  flex-direction: column;
`

export const PaletteTitle = styled.div`
  display: flex;
  background-color: ${GRAY_LIGHTEST};
  padding: 10px;
  font-weight: 600;
`

export const PaletteColumns = styled.div`
  display: flex;
  padding-top: 10px;
`

export const Palettes = styled.div`
  flex: 1.5;
  border-right: 1px solid ${GRAY_LIGHTEST};
`
export const CreatePalette = styled.div`
  flex: 2;
  padding: 10px;
`

export const PaletteContainer = styled.div`
  padding: 10px;
  position: relative;
  transition: opacity 0.3s ease;
  border: 2px solid ${({ selected }: StyleProps) => (selected ? RED : TRANSPARENT)};

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  &::after {
    content: "";
    width: 98%;
    height: 1px;
    background-color: ${GRAY_LIGHTEST};
    position: absolute;
    bottom: 0;
    left: 0;
  }
`

export const Header = styled.div`
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Body = styled.div`
  padding: 10px 20px;
`

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Text = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
`

export const Palette = styled.div`
  margin-bottom: 20px;
`