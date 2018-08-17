/**
 * Styled Components - Created by miguelcanobbio on 16/08/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
`

export const Image = styled.img`
  width: 320px;
  height: 320px;
  background-color: #eff2f4;
  object-fit: contain;
`

export const Code = styled.div`
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-bottom: 4px;
`

export const Status = styled.div`
  display: flex;
`

export const Label = styled.div`
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.11px;
`

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 32px;
  min-height: 320px;
`
