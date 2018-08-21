/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled, { keyframes } from 'styled-components'
import AntdProgress from 'antd/lib/progress'
import AntdButton from 'antd/lib/button'

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
`

export const Model = styled.div`
  color: #5f6062;
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
  position: absolute;
  height: 40px;
  bottom: 10%;
  width: 138px;
  left: 50%;
  transform: translate(-50%, -50%);
`
export const DragText = styled.div`
  color: #5f6062;
  user-select: none;
  font-size: 14px;
  line-height: 23px;
  position: absolute;
  bottom: 19%;
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
  color: #5f6062;
  user-select: none;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  margin-right: 5px;
`

export const ViewButton = styled.img`
  cursor: pointer;
`

export const ViewControls = styled.div`
  display: flex;
  width: 76px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 68px;
  right: 26px;
`

export const LoadingContainer = styled.div`
  width: 74.6%;
`

export const ButtonWrapper = styled.div`
  margin-bottom: 16px;
  .ant-btn-primary  {
    background-color: #4a90e2;
    border-color: #4a90e2;
    width: 138px;
  }
  .ant-btn-primary:hover {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }
`

export const ModalMessage = styled.div`
  color: #5f6062;
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
  border: 0.5px solid #dcdcdc;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
`

export const SizeLabel = styled.div`
  color: #5f6062;
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const Size = styled.div`
  color: #5f6062;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15px;
  line-height: 16px;
`
