/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'
import AntdProgress from 'antd/lib/progress'
import AntdButton from 'antd/lib/button'

export const Container = styled.div`
  position: relative;
  width: 74.6%;
`

export const Render = styled.div`
  width: 100%;
  height: 90vh;
`

export const Model = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Row = styled.div`
  display: flex;
  align-items center;
  position: absolute;
  top: 18px;
  left: 26px;
`

export const QuickView = styled.img`
  cursor: pointer;
  margin-left: 8px;
`

export const Progress = styled(AntdProgress)``

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
  font-family: 'Avenir Next';
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
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  margin-right: 5px;
`
