/**
 * Styled Components - Created by miguelcanobbio on 30/05/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding-bottom: 48px;
`

export const Title = styled.div`
  height: 33px;
  width: 164px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  margin: 33px 0;
`

export const HorizontalDivider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #dcdcdc;
  margin-bottom: 33px;
`

export const InfoContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
`

export const ImageContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
`

export const StyledImage = styled.img``

export const TextContainer = styled.div`
  width: 70%;
  padding-right: 10%;
`

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-bottom: 10px;
`
