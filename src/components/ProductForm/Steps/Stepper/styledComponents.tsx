/**
 * Styled Components - Created by Apodaca on 17/05/19.
 */
import styled from 'styled-components'
import { BLUE } from '../../../../theme/colors'
interface DivProps {
  primary?: boolean
}
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
  color: ${({ primary }: DivProps) => (primary ? BLUE : 'white')};
  border: 1px solid ${BLUE};
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: ${({ primary }: DivProps) => (primary ? 'white' : BLUE)};
`

export const NextButton = styled.div`
  margin-right: 26px;
  width: 165.9px;
  border-radius: 4px;
  cursor: ${({ enabled }: any) => (enabled ? 'pointer' : 'default')};
  background-color: ${BLUE};
  transition: all 0.25s ease;
  height: 50px;
  opacity: ${({ enabled }: any) => (enabled ? 1 : 0.3)};
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  box-shadow: 0px 2px 2px 0px #b7b7b7;
`
