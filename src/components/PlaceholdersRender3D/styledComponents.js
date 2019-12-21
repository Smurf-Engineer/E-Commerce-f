/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled, { keyframes } from 'styled-components'
import AntdProgress from 'antd/lib/progress'
import AntdIcon from 'antd/lib/icon'
import AntdButton from 'antd/lib/button'
import {
  BLUE,
  WHITE,
  GRAY_LIGHT,
  GRAY_DARK,
  BLUE_DARK
} from '../../theme/colors'

export const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`

export const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: auto;
  position: relative;
  justify-content: center;
  width: calc(100% - 400px);
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
  height: 800px;
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

export const Progress = styled(AntdProgress)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  top: 30px;
  right: 20px;
  flex-direction: column;

  .ant-btn-primary  {
    background-color: ${BLUE};
    border-color: ${BLUE};
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
export const MeasurementBox = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.5s cubic-bezier(0.67, 0.35, 0.565, 1) both;
  position: absolute;
  padding: 8px;
  top: 75px;
  left: 26px;
  border: 0.5px solid ${GRAY_LIGHT};
  border-radius: 2px;
  background-color: ${WHITE};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  min-width: 130px;
  text-align: center;
`

export const MeasurementLabel = styled.div`
  color: ${GRAY_DARK};
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const Measurement = styled.div`
  color: ${GRAY_DARK};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const Button = styled(AntdButton)`
  height: 40px;
  width: 165px;
  margin-bottom: 10px;
`

export const Loading = styled.div`
  position: absolute;
  top: 16px;
  right: 55px;
`

export const Icon = styled(AntdIcon)`
  font-size: 64px;
`
