/**
 * Styled Components - Created by david on 12/02/18.
 */
import styled, { keyframes } from 'styled-components'

export const ImageContainer = styled.div`
  user-select: none;
  position: relative;
  cursor: pointer;
  background-color: #f1f4f5;
  height: 214.13px;
  width: 220px;
  padding: 10px;
  text-align: center;
`

export const Page = styled.div`
  user-select: none;
  height: 200.29px;
  text-align: center;
`

export const Image = styled.img`
  user-select: none;
  height: 200.29px;
  width: 180.44px;
`

export const ImageTop = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 200px;
  justify-content: space-between;
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
  font-family: 'Avenir Next';
  font-size: 8px;
  font-weight: 500;
  line-height: 11px;
  text-align: center;
  text-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
`

export const QuickView = styled.div`
  z-index: 10;
  cursor: pointer;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const Arrows = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 110px;
  width: 200px;
  justify-content: space-between;
`

export const Arrow = styled.img``

export const ButtonContainer = styled.div`
  user-select: none;
  display: flex;
  position: absolute;
  width: 200px;
  justify-content: center;
  top: 170px;
`

export const CustomizeButton = styled.div`
  user-select: none;
  background-color: #e61737b3;
  color: #fff;
  font-family: 'Avenir Next';
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 6px 16px;
`
