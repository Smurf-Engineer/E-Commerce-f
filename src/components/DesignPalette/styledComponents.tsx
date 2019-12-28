/**
 * Styled Components - Created by david on 28/02/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import { RED } from '../../theme/colors'

export const SaveButton = styled(Button)`
  margin-left: 8px;
`

export const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
`

export const Text = styled.div`
  color: #fff;
`

export const ColorButtons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 10px;
  width: 140%;
`

export const Name = styled.div`
  color: #5f6062;
  font-weight: 600;
  font-size: 16px;
  line-height: 23px;
`

export const Row = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
  align-items: center;
`

interface OvalProps {
  currentColor?: string
}

export const Oval = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: 1px solid;
  ${({ currentColor }: OvalProps) =>
    currentColor && currentColor.toLowerCase() !== '#ffffff'
      ? currentColor
      : '#bebebe'};
  background-color: ${({ currentColor }: OvalProps) => currentColor || '#fff'};
  align-self: center;
`

export const Image = styled.img`
  margin-bottom: 8px;
  margin-top: 0;
  margin-right: 10px;
  width: 120px;
  height: 120px;
  object-fit: cover;
  background-color: #f1f4f5;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const DeleteButton = styled.div`
  bottom: 4px;
  right: 12px;
  cursor: pointer;
  color: ${RED};
  margin-left: 100px;
`

export const Delete = styled(Icon)`
  font-size: 18px;
`
