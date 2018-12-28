/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled, { keyframes } from 'styled-components'
import { WHITE } from '../../theme/colors'

export const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`

export const Container = styled.div`
  display: flex;
  background-color: #fff;
  &.column {
    flex-direction: column;
  }
`

export const Text = styled.div`
  color: #fff;
`

export const StyledTitle = styled.div`
  background-color: #fff;
  padding: 16px 0;
  box-sizing: border-box;
  color: black;
  min-height: 64px;
  font-size: 24px;
  text-align: left;
  flex: 1;
  margin-left: 15px;
`

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

export const MobileToolBar = styled.div`
  display: flex;
  background-color: ${WHITE};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  height: 50px;
  position: absolute;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const MobileTitle = styled.h2`
  margin: 0 0 0 55px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.2px;
`
export const ActionMobileItems = styled.div`
  height: 100%;
  width: 120px;
  display: flex;
`

export const MobileItem = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  &:first-child {
    border-left: 0.5px solid #dcdcdc;
    border-right: 0.5px solid #dcdcdc;
  }
  &:last-child {
    border-right: 0.5px solid #dcdcdc;
  }
`
export const ButtonImg = styled.img``

export const ButtonText = styled.p`
  font-size: 10px;
  margin: 0;
`

export const BackCircle = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 16px;
  border-color: #5f6062;
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;
  z-index: 1;
  top: 86px;
  opacity: 0;
  animation: ${fadeIn} 0.5s cubic-bezier(0.67, 0.35, 0.565, 1) both;
  &.customizeTab {
    top: 25%;
  }
`

export const BackIcon = styled.img`
  width: 12px;
  height: 12px;
`
