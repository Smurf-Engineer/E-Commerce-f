/**
 * Styled Components - Created by david on 28/02/18.
 */
import styled, { css } from 'styled-components'
import { WHITE, GRAY_DARK, RED, BLUE_BRIGHT } from '../../theme/colors'

export const Container = styled.div``

export const Text = styled.div`
  color: ${WHITE};
`

interface StyledProps {
  myFilesList?: boolean
}
export const ColorButtons = styled.div`
  display: flex;
  justify-content: ${({ myFilesList }: StyledProps) =>
    !myFilesList ? 'space-around' : 'space-between'};
  padding: ${({ myFilesList }: StyledProps) =>
    !myFilesList ? '14px 32px 0px 32px' : '14px 0'};

  @media (min-width: 768px) and (max-width: 991px) {
    ${({ myFilesList }: StyledProps) =>
      !myFilesList
        ? css`
            flex-wrap: wrap;
            padding: 20px 0px 10px 18px;
          `
        : ''};
  }
`

export const Name = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  ${({ myFilesList }: StyledProps) =>
    !myFilesList ? '' : 'font-weight: 600;'};
  line-height: 23px;
`

export const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 14px 32px 6px 32px;
`
export const deleteIcon = {
  color: RED,
  fontSize: 18
}

export const Delete = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-left: 8px;
`
export const TopRow = styled.div`
  align-items: center;
  display: flex;
`

export const buttonStyle = {
  backgroundColor: BLUE_BRIGHT,
  borderColor: BLUE_BRIGHT,
  height: 25
}

export const MyFilesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0;
`

export const DeleteText = styled.div`
  color: ${RED};
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 23px;
`
