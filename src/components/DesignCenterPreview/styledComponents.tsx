/**
 * Styled Components - Created by david on 09/03/18.
 */

import styled from 'styled-components'
import AntdButton from 'antd/lib/button'
import { BLUE, GRAY_DARK } from '../../theme/colors'

export const Container = styled.div`
  display: flex;
`
export const BottomButtons = styled.div`
  bottom: 7%;
  display: flex;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`

export const Render = styled.div`
  position: relative;
  width: 85%;

  @media (min-width: 768px) and (max-width: 991px) {
    width: 75%;
  }
`

export const ButtonRight = styled(AntdButton)`
  height: 40px;
  width: 200px;
`

export const ButtonWrapperRight = styled.div`
  bottom: 11.1%;
  margin-bottom: 16px;
  position: absolute;
  right: 26px;

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

export const ButtonWrapper = styled.div`
  margin-bottom: 16px;

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

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 15%;

  @media (min-width: 768px) and (max-width: 991px) {
    width: 25%;
  }

  @media (max-width: 1024px) {
    padding: 30px 0px 30px 15px;
  }
`

export const Model = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  user-select: none;
`

export const Row = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 12px;
`

export const QuickView = styled.img`
  cursor: pointer;
  margin-left: 8px;
`
