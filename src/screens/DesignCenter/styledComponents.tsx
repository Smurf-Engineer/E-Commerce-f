/**
 * Styled Components - Created by david on 23/02/18.
 */
import styled, { keyframes } from 'styled-components'
import Button from 'antd/lib/button/button'
import { WHITE } from '../../theme/colors'

export const Container = styled.div`
  background-color: ${WHITE};
  @media (max-width: 767px) {
    position: relative;
  }
`

export const Text = styled.div`
  color: ${WHITE};
`

export const fadeIn = keyframes`
  to {
    opacity: 1;
  }
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

export const StyledTitle = styled.div`
  background-color: ${WHITE};
  padding: 16px 0;
  box-sizing: border-box;
  color: black;
  min-height: 64px;
  font-size: 24px;
  text-align: left;
  flex: 1;
  margin-left: 15px;
  cursor: pointer;
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  text-align: center;
`

export const BottomSheetWrapper = styled.div`
  .react-swipeable-view-container {
    box-shadow: rgba(0, 0, 0, 0.157) 0px -1px 5px !important;
  }

  .shimmer {
    text-align: center;
    color: rgba(255, 255, 255, 0.1);
    background: -webkit-linear-gradient(
      to left,
      #ff0000,
      #ff00ff,
      #0000ff,
      #00ffff,
      #00ff00,
      #ffff00,
      #ff0000
    );
    background: -moz-linear-gradient(
      to left,
      #ff0000,
      #ff00ff,
      #0000ff,
      #00ffff,
      #00ff00,
      #ffff00,
      #ff0000
    );
    background: linear-gradient(
      to left,
      #ff0000,
      #ff00ff,
      #0000ff,
      #00ffff,
      #00ff00,
      #ffff00,
      #ff0000
    );
    -webkit-background-size: 125px 100%;
    -moz-background-size: 125px 100%;
    background-size: 125px 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    -webkit-animation-name: shimmer;
    -moz-animation-name: shimmer;
    animation-name: shimmer;
    -webkit-animation-duration: 15s;
    -moz-animation-duration: 15s;
    animation-duration: 15s;
    animation-delay: -15s;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: #222;
  }

  @-moz-keyframes shimmer {
    0% {
      background-position: top left;
    }
    100% {
      background-position: top right;
    }
  }

  @-webkit-keyframes shimmer {
    0% {
      background-position: top left;
    }
    100% {
      background-position: top right;
    }
  }

  @-o-keyframes shimmer {
    0% {
      background-position: top left;
    }
    100% {
      background-position: top right;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: top left;
    }
    100% {
      background-position: top right;
    }
  }
`

export const ModalMessage = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 5px;
  background-color: #4a90e2;
  border-color: #4a90e2;
  color: ${WHITE};

  &:hover {
    background-color: #6ea6e7;
    border-color: #6ea6e7;
  }
`

export const StyledGhostButton = styled(Button)`
  height: 40px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  background-color: ${WHITE};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  margin-right: 8px;

  &:hover {
    border-color: #4a90e2;
    color: #4a90e2;
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export const Error = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const ErrorMessage = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
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
