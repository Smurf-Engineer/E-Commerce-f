/**
 * Styled Components - Created by david on 12/02/18.
 */
import styled from 'styled-components'

type StyledProps = {
  backgroundColor?: string
}

export const ImageContainer = styled.div`
  user-select: none;
  position: relative;
  cursor: pointer;
  ${({ backgroundColor }: StyledProps) =>
    backgroundColor ? `background-color: ${backgroundColor}` : ''};
  height: 214.13px;
  width: 100%;
  padding: ${({ backgroundColor }: StyledProps) =>
    backgroundColor ? '10px' : '10px 0'};
  text-align: center;

  @media (min-width: 321px) and (max-width: 480px) {
    height: 200px;
    width: 100%;
    margin: 0;
  }
  @media only screen and (max-width: 320px) {
    height: 130px;
    width: 100%;
    margin: 0;
  }
`

export const Page = styled.div`
  user-select: none;
  height: 200.29px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    height: 180px;
  }
`

export const Image = styled.img`
  object-fit: cover;
  user-select: none;
  height: 200.29px;
  width: 100%;

  @media (min-width: 321px) and (max-width: 480px) {
    height: 100%;
    width: 100%;
  }

  @media only screen and (max-width: 320px) {
    height: 115px;
    width: 100%;
    margin: 0;
  }
`

export const ImageTop = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 200px;
  justify-content: space-between;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100px;
  }
`
export const TopContainer = styled.div`
  user-select: none;
  height: 35.04px;
  width: 36px;
  background-color: #e61737;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TopText = styled.div`
  user-select: none;
  color: #ffffff;
  font-size: 8px;
  font-weight: 500;
  line-height: 11px;
  text-align: center;
  text-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
`

export const QuickView = styled.div`
  z-index: 1;
  cursor: pointer;
`

export const Arrows = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 110px;
  width: 100%;
  justify-content: space-between;
`

export const Arrow = styled.img``

interface ButtonContainerProps {
  myLockerList?: boolean
}

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  top: ${({ myLockerList }: ButtonContainerProps) =>
    myLockerList ? '140px' : '170px'};
  user-select: none;
  width: 100%;
`

export const CustomizeButton = styled.div`
  user-select: none;
  background-color: #e61737b3;
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 6px 16px;
`
