/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'
import AntdProgress from 'antd/lib/progress'
import Spin from 'antd/lib/spin'
import AntdButton from 'antd/lib/button'

export const Container = styled.div`
  width: ${({ designSearch }) => (designSearch ? '600px' : '100%')};
  height: ${({ designSearch }) => (designSearch ? '800px' : 'auto')};
  @media (max-width: 375px) {
    height: 25em;
  }
  position: relative;
`

export const Render = styled.div`
  height: ${({ customProduct, designSearch }) =>
    customProduct || designSearch ? '515px' : '90vh'};
  width: 100%;
  cursor: grab;
  @media (max-width: 375px) {
    height: 25em;
  }
  text-align: center;
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
  .ant-progress-text {
    color: white;
  }
`
export const ProgressProduct = styled(AntdProgress)`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  .ant-progress-text {
    color: white;
  }
`

export const Loading = styled(Spin)`
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

export const ThumbnailButton = styled(AntdButton)`
  margin-top: 8px;
  width: 200px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

export const DragText = styled.div`
  color: ${({ textColor }) => (textColor ? textColor : '#5f6062')};
  user-select: none;
  font-size: 14px;
  line-height: 23px;
  position: absolute;
  bottom: ${({ isProduct }) => (isProduct ? '0' : '19%')};
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 375px) {
    bottom: 5%;
  }
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

export const Title = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Message = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const ContainerError = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  justify-content: center;
  align-items: center;
`
