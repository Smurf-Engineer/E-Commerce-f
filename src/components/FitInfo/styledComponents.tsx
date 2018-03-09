/**
 * Styled Components - Created by gustavomedina on 08/03/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Row from 'antd/lib/row'

export const Container = styled.div`
  background-color: #222;
`

export const Text = styled.div`
  color: #fff;
`

export const CloseIcon = styled.img`
  position: absolute;
  right: 20px;
  &:hover {
    cursor: pointer;
  }
`

export const StyledLabel = styled.div`
  height: 10%;
  width: 25%;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 10px;
`

export const TitleLabel = styled.div`
  height: 27px;
  width: 145px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  margin-top: 20px;
`

export const StyledLoginButton = styled(Button)`
  border-radius: 0px;
  width: 20%;
  height: 50px;
  border-color: #e61737;
  background-color: #fff;
`

export const StyledRow = styled(Row)`
  margin-top: 30px;
  display: list-item;
`

export const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const radioGroupStyle = {
  marginTop: '10px'
}
