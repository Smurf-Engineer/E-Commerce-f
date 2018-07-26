/**
 * Styled Components - Created by david on 28/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div``

export const Text = styled.div`
  color: #fff;
`

interface StyledProps {
  myFilesList?: boolean
}
export const ColorButtons = styled.div`
  padding: ${({ myFilesList }: StyledProps) =>
    !myFilesList ? '14px 32px 0px 32px' : '14px 0'};
  display: flex;
  justify-content: ${({ myFilesList }: StyledProps) =>
    !myFilesList ? 'space-around' : 'space-between'};
`

export const Name = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 23px;
  ${({ myFilesList }: StyledProps) =>
    !myFilesList ? '' : 'font-weight: 600;'};
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 32px 6px 32px;
  align-items: center;
`
export const deleteIcon = {
  color: '#e61737',
  fontSize: 18
}

export const Delete = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`
export const TopRow = styled.div`
  display: flex;
  align-items: center;
`

export const buttonStyle = {
  height: 25,
  backgroundColor: '#4185DE',
  borderColor: '#4185DE'
}

export const MyFilesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0;
`

export const DeleteText = styled.div`
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 23px;
  cursor: pointer;
`
