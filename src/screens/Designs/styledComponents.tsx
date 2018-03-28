/**
 * Styled Components - Created by david on 27/03/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
  padding-top: 18px;
  padding-left: 26px;
`

export const ContainerError = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Message = styled.div`
  margin-top: 16px;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const Model = styled.div`
  color: #5f6062;
  user-select: none;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Row = styled.div`
  display: flex;
  align-items center;
`

export const QuickView = styled.img`
  cursor: pointer;
  margin-left: 8px;
`
