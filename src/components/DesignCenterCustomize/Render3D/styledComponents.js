/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled, { keyframes } from 'styled-components'
import AntdProgress from 'antd/lib/progress'
import AntdButton from 'antd/lib/button'
import {
  BLUE,
  WHITE,
  GRAY_LIGHT,
  GRAY_DARK,
  BLUE_DARK
} from '../../../theme/colors'

export const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`

export const Container = styled.div`
  position: relative;
  width: 74.6%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    width: 65%;
  }

  @media only screen and (min-device-width: 1366px) and (max-device-width: 1366px) and (orientation: landscape) {
    width: 72%;
  }
`

export const MobileContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
`

export const CanvasContainer = styled.div`
  width: 388px;
  height: 388px;
  border-width: 1px;
  border-style: solid;
  border-color: #432021;
`

export const Render = styled.div`
  width: 800px;
  height: 600px;
  cursor: grab;

  @media (min-width: 768px) and (max-width: 1366px) and (orientation: landscape) {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 426px) {
    width: 100%;
    height: 100%;
  }
`

export const Model = styled.div`
  color: ${GRAY_DARK};
  user-select: none;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 18px;
  left: 26px;
`

export const QuickView = styled.img`
  cursor: pointer;
  margin-left: 8px;
`

export const Progress = styled(AntdProgress)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Button = styled(AntdButton)`
  height: 40px;
  width: 138px;
`
export const DragText = styled.div`
  color: ${GRAY_DARK};
  user-select: none;
  font-size: 14px;
  line-height: 23px;
  position: absolute;
  bottom: 16%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const ModelType = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  top: 18px;
  right: 26px;
`

export const ModelText = styled.div`
  color: ${GRAY_DARK};
  user-select: none;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  margin-right: 5px;
`

export const ViewButton = styled.img`
  cursor: pointer;
`

export const TopButton = styled.img`
  cursor: pointer;
  align-self: center;
  width: 15px;
  height: 15px;
  padding-bottom: 2px;
`

export const ViewControls = styled.div`
  position: absolute;
  top: 68px;
  right: 26px;
  display: flex;
  flex-direction: column;
`

export const BottomControls = styled.div`
  display: flex;
  width: 76px;
  justify-content: space-between;
  align-items: center;
`

export const LoadingContainer = styled.div`
  width: 74.6%;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 10px;

  .ant-btn-primary  {
    background-color: ${BLUE};
    border-color: ${BLUE};
    width: 138px;
  }
  .ant-btn-primary:hover {
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
`

export const MobileButtonWrapper = styled.div`
  position: absolute;
  bottom: 10%;
  width: 50%;
  .ant-btn-primary  {
    background-color: ${BLUE_DARK};
    border-color: ${BLUE_DARK};
  }
  .ant-btn-primary:hover {
    background-color: ${BLUE_DARK};
    border-color: ${BLUE_DARK};
  }
`

export const MobileButton = styled(AntdButton)`
  height: 40px;
  width: 100%;
`

export const ModalMessage = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`
export const SizeBox = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.5s cubic-bezier(0.67, 0.35, 0.565, 1) both;
  position: absolute;
  padding: 8px;
  top: 52px;
  left: 26px;
  border: 0.5px solid ${GRAY_LIGHT};
  border-radius: 2px;
  background-color: ${WHITE};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
`

export const SizeLabel = styled.div`
  color: ${GRAY_DARK};
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const Size = styled.div`
  color: ${GRAY_DARK};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const HintModalImage = styled.img`
  width: 100%;
`
export const HintIcon = styled.img`
  height: 90%;
  position: absolute;
  left: 0;
  top: 30px;
  cursor: pointer;
`

export const TurnOffHintRow = styled.div`
  display: flex;
  justify-content: center;
`
