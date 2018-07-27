/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'
import AntdIcon from 'antd/lib/icon'
import AntdProgress from 'antd/lib/progress'
import AntdButton from 'antd/lib/button'

export const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: auto;
  position: relative;
  justify-content: center;
  width: calc(100% - 400px);
  background-color: #fff;
`

export const Render = styled.div`
  width: 800px;
  height: 800px;
`

export const Progress = styled(AntdProgress)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Logo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Button = styled(AntdButton)`
  position: absolute;
  height: 40px;
  bottom: 16px;
  width: 138px;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Loading = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
`

export const Icon = styled(AntdIcon)`
  font-size: 64px;
`
