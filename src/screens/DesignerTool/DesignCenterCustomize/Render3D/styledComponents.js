/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'
import AntdProgress from 'antd/lib/progress'
import AntdButton from 'antd/lib/button'

export const Container = styled.div`
  position: relative;
  width: calc(100% - 400px);
  background-color: #fff;
`

export const Render = styled.div`
  width: 100%;
  height: 100vh;
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
  bottom: 10%;
  width: 138px;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
`
