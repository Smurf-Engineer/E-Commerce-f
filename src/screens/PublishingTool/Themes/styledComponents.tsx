/**
 * Styled Components - Created by eduardoquintero on 06/12/19.
 */
import styled from 'styled-components'
import AntdInput from 'antd/lib/input'
import AntdButton from 'antd/lib/button'
import {
  BLUE,
  BLUE_BRIGHT,
  GRAY_LIGHTEST,
  GRAY_DARK,
  WHITE,
  RED
} from '../../../theme/colors'

const { Search } = AntdInput

export const Container = styled.div`
  background-color: ${WHITE};
  width: 400px;
  height: calc(100vh - 106px);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  box-shadow: 0 0 0px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.24);
`

export const Content = styled.div`
  padding: 0 15px;
`

export const InputContainer = styled.div`
  position: relative;
`

export const Input = styled(Search)`
  & input {
    border-radius: 0;
  }
  & button {
    background: ${BLUE};
    border-color: ${BLUE};
    border-radius: 0;
  }
  & button:hover {
    border-color: ${BLUE_BRIGHT};
    background: ${BLUE_BRIGHT};
  }
`

export const Header = styled.div`
  background-color: ${GRAY_LIGHTEST};
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  min-height: 45px;
  align-items: center;
`

export const Title = styled.p`
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  margin: 0;
`

export const Label = styled.p`
  margin-top: 20px;
  margin-bottom: 10px;
`

export const Button = styled(AntdButton)`
  height: 50px;
  border: 2px solid ${RED};
  border-radius: 2px;
  background-color: ${WHITE};
  color: ${RED};
  margin-right: 22px;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`

export const MissingModelContainer = styled.div`
  margin-top: 15px;
  text-align: center;
`

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-direction: row;
  margin-right: 40px;
`

export const BackIcon = styled.img`
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
  margin-right: 10px;
`
