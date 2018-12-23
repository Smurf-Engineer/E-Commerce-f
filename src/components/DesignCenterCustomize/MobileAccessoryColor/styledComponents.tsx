/**
 * Styled Components - Created by miguelcanobbio on 01/08/18.
 */
import styled from 'styled-components'
import Icon from 'antd/lib/icon'

export const Container = styled.div`
  padding: 4px 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ColorLabel = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
  margin-right: 8px;
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
}

export const Oval = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid
    ${({ color }: OvalProps) =>
      color && color.toLowerCase() !== '#ffffff' ? color : '#bebebe'};
  background-color: ${({ color }: OvalProps) => color || '#fff'};
  align-self: center;
  cursor: pointer;
`

interface OvalSelected {
  selected: boolean
  marginLeft?: string
}

export const OvalSelected = styled.div`
  height: 34px;
  width: 34px;
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

export const Arrow = styled(Icon)`
  color: #5f6062;
  font-size: 16px;
  margin-left: 4px;
`
