/**
 * Styled Components - Created by Apodaca on 17/05/19.
 */
import styled from 'styled-components'
export const Container = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-top: 46px;
`

export const BackButton = styled.div`
  margin-right: 26px;
  width: 165.9px;
  border-radius: 4px;
  cursor: pointer;
  color: #4a90e2;
  border: 1px solid #4a90e2;
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: white;
`

export const NextButton = styled.div`
  margin-right: 26px;
  width: 165.9px;
  border-radius: 4px;
  cursor: ${({ enabled }: any) => (enabled ? 'pointer' : 'default')};
  background-color: #4a90e2;
  transition: all 0.25s ease;
  height: 50px;
  opacity: ${({ enabled }: any) => (enabled ? 1 : 0.3)};
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  box-shadow: 0px 2px 2px 0px #b7b7b7;
`
