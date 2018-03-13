/**
 * Styled Components - Created by david on 23/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  padding 16px 32px;
  display: flex;
  justify-content: center;
  background-color: #fff;
`

export const Row = styled.div`
  display: flex;
  align-items center;
  position: absolute;
  left: 32px;
`

export const QuickView = styled.img`
  cursor: pointer;
  margin-left: 8px;
`

export const Model = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
`

export const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Message = styled.div`
  margin-top: 10px;
  color: #8c8c8c;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  width: 60%;
`
