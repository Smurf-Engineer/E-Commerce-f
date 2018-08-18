/**
 * Styled Components - Created by david on 12/02/18.
 */
import styled, { keyframes } from 'styled-components'

export const Container = styled.section`
  margin: 0px 16px;
  width: 220px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    margin-left: 0;
  }
`

export const Text = styled.div`
  color: #fff;
`
export const ImageContainer = styled.div`
  user-select: none;
  cursor: pointer;
  background-color: #f1f4f5;
  height: 214.13px;
  width: 220px;
  padding: 10px;
  text-align: center;
`

export const Image = styled.img`
  user-select: none;
  height: 200.29px;
  width: 180.44px;
`

export const ImageTop = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: space-between;
`
export const TopContainer = styled.div`
  height: 35.04px;
  width: 36px;
  background-color: #e61737;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TopText = styled.div`
  color: #ffffff;
  font-family: 'Avenir Next';
  font-size: 8px;
  font-weight: 500;
  line-height: 11px;
  text-align: center;
  text-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
`

export const Footer = styled.div`
  padding: 4px;
`

export const QuickView = styled.img``

export const Type = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 220px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`
export const Description = styled.div`
  user-select: none;
  color: #8c8c8c;
  font-family: 'Avenir Next';
  font-size: 12px;
  line-height: 16px;
  padding: 2px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 220px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

interface InfoProps {
  customizable: boolean
}

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ customizable }: InfoProps) =>
    customizable ? 'space-between' : 'flex-end'};
  user-select: none;

  @media (min-width: 320px) and (max-width: 425px) {
    flex-wrap: wrap;
  }
`
export const Label = styled.div`
  color: #5f6062;
  display: flex;
  font-family: 'Avenir Next';
  font-size: 12px;
  line-height: 16px;
  user-select: none;
`
export const ImgIcon = styled.img`
  height: 15px;
  margin-right: 5px;
  width: 15px;
`
export const Price = styled.div`
  user-select: none;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
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
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 165px;
  width: 200px;
  justify-content: space-between;
  animation: ${fadeIn} 0.6s linear;
`

export const Arrow = styled.img`
  user-select: none;
`
