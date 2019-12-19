/**
 * Styled Components - Created by eduardoquintero on 09/12/19.
 */
import styled from 'styled-components'
import AntdButton from 'antd/lib/button'
import { WHITE, BLUE, BLUE_BRIGHT, RED } from '../../../theme/colors'

export const Container = styled.div``

export const Title = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.18px;
  line-height: 22px;
  padding: 16px 0px;
`

export const Subtitle = styled.div`
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  padding: 16px 0;
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
  width: 100%;
  margin-top: 20px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`

export const ListContainer = styled.div`
  height: 50vh;
  overflow: scroll;
  & .radioGroup {
    width: 100%;
  }
`

export const NextButton = styled(AntdButton)`
  margin-top: 15px;
  background-color: ${BLUE};
  border-color: ${BLUE};
  border-radius: 0;
  &:hover,
  :focus,
  :active {
    background-color: ${BLUE_BRIGHT};
    border-color: ${BLUE_BRIGHT};
  }
  display: flex;
  align-items: center;
`

export const NextButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const LoadButton = styled(AntdButton)`
  margin-top: 20px;
  width: 100%;
  height: 40px;
`
