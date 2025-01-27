/**
 * Styled Components - Created by miguelcanobbio on 01/08/18.
 */
import styled from 'styled-components'
import Icon from 'antd/lib/icon'
import transparentGrid from '../../../assets/transparent_grid.png'
import { WHITE } from '../../../theme/colors'

export const Container = styled.div`
  padding: 4px 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Name = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const HintIcon = styled.img`
  cursor: pointer;
  max-width: 16px;
  width: 100%;
  margin-left: 8px;
  margin-bottom: 2px;
`

export const ColorLabel = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
  margin-right: 8px;
`

export const Divider = styled.div`
  margin: 0 32px 4px 32px;
  height: 1px;
  background-color: #dcdcdc;
`

export const Stitching = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const Colors = styled.div`
  display: flex;
  align-items: center;
`

interface OvalProps {
  color?: string
  isPredyed?: boolean
}

export const Oval = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid
    ${({ color }: OvalProps) =>
    color && color.toLowerCase() !== '#ffffff' ? color : '#bebebe'};
  background: ${({ color, isPredyed }: OvalProps) =>
    isPredyed ? `url(${transparentGrid})` : (color || WHITE)};
  align-self: center;
  cursor: pointer;
`

interface OvalSelected {
  selected: boolean
  marginLeft?: string
}

export const OvalSelected = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid
    ${({ selected }: OvalSelected) => (selected ? '#E61737' : '#fff')};
  margin-left: ${({ marginLeft }: OvalSelected) =>
    marginLeft ? marginLeft : '0'};
  align-self: center;
`

export const ColorWheel = styled.img`
  width: 100%;
  margin-bottom: 2px;
  &:hover {
    cursor: pointer;
  }
`

export const Arrow = styled(Icon)`
  color: #5f6062;
  font-size: 16px;
  margin-left: 4px;
`
