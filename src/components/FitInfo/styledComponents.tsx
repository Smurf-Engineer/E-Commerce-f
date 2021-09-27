/**
 * Styled Components - Created by gustavomedina on 08/03/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import col from 'antd/lib/col'
import Row from 'antd/lib/row'
import { GRAY_LIGHTEST, GRAY_DARK, RED, WHITE } from '../../theme/colors'

export const Container = styled.div`
  background-color: #222;
`
export const Col = styled(col)`
  @media (max-width: 628px) {
    text-align: center;
    width: 100%;

    .ant-radio-group {
      display: flex;
      justify-content: center;
      margin-top: 15px;
    }

    .ant-radio-group > label {
      align-items: center;
      display: flex;
      height: 50px;
    }
  }
`
export const StyledLabel = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  height: 10%;
  line-height: 22px;
  margin-bottom: 10px;
  width: 25%;
`
export const StyledLoginButton = styled(Button)`
  background-color: ${WHITE};
  border-color: ${RED};
  border-radius: 0px;
  height: 50px;
  width: 20%;
`
export const StyledRow = styled(Row)`
  display: list-item;
  margin-top: 10px;
`
export const ReverseDiv = styled.div`
  @media (max-width: 628px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
`
export const TitleLabel = styled.div`
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: bold;
  height: 27px;
  line-height: 27px;
  margin-top: 20px;
  width: 145px;

  @media (max-width: 628px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`
export const SizingTable = styled.div`
  text-align: left;

  div > div {
    margin-top: 0px;
    padding-left: 0px;
  }
  div > div > div {
    width: 100%;
  }

  @media (max-width: 374px) {
    div > div > div {
      font-size: 11px;
    }
  }
`
export const radioGroupStyle = {
  marginTop: '10px'
}
export const ImageContainer = styled.div`
  background-color: ${GRAY_LIGHTEST};
  cursor: pointer;
  margin-top: 18px;
  position: relative;
  text-align: center;
  user-select: none;
  width: 100%;
`
export const ImageStyle = {
  height: '100%',
  width: '100%'
}
export const StyledFooterLabel = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  height: 30%;
  line-height: 22px;
  margin-bottom: 10px;
  margin-top: 21px;
  width: 100%;
`
