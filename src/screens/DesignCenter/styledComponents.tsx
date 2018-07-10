/**
 * Styled Components - Created by david on 23/02/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button/button'

export const Container = styled.div`
  background-color: #fff;
`

export const Text = styled.div`
  color: #fff;
`

export const StyledTitle = styled.div`
  background-color: #fff;
  padding: 16px 0;
  box-sizing: border-box;
  font-family: Avenir Next;
  color: black;
  min-height: 64px;
  font-size: 24px;
  text-align: left;
  flex: 1;
  margin-left: 15px;

  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
`

export const BottomSheetWrapper = styled.div`
  .react-swipeable-view-container {
    box-shadow: rgba(0, 0, 0, 0.157) 0px -1px 5px !important;
  }
`

export const ModalMessage = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 5px;
  background-color: #4a90e2;
  border-color: #4a90e2;
  color: #fff;

  &:hover {
    background-color: #6ea6e7;
    border-color: #6ea6e7;
  }
`

export const StyledGhostButton = styled(Button)`
  height: 40px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  margin-right: 8px;

  &:hover {
    border-color: #4a90e2;
    color: #4a90e2;
  }
`
