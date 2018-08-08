/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'
import AntdProgress from 'antd/lib/progress'
import AntdButton from 'antd/lib/button'

export const Container = styled.div`
  position: relative;
  width: 100%;
`

export const Render = styled.div`
  width: 100%;
  height: 536px;
`

export const Model = styled.div`
  color: #5f6062;
  user-select: none;
  font-family: 'Avenir Next';
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

export const BottomButtons = styled.div`
  display: flex;
  left: 50%;
  bottom: 7%;
  transform: translate(-50%, -50%);
  position: absolute;
`

export const Button = styled(AntdButton)`
  height: 40px;
  width: 200px;
  margin: 0px 4px;
`
export const ButtonRight = styled(AntdButton)`
  height: 40px;
  width: 200px;
`
export const DragText = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  user-select: none;
  font-size: 14px;
  line-height: 23px;
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const ModelType = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  top: -24px;
  right: 26px;
`

export const ModelText = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
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
  alignitem: center;
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

export const ButtonWrapperRight = styled.div`
  margin-bottom: 16px;
  position: absolute;
  bottom: 11.1%;
  right: 26px;
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
