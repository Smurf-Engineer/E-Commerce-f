/**
 * Styled Components - Created by miguelcanobbio on 17/07/18.
 */
import styled from 'styled-components'

interface ContainerProps {
  width: string
}

export const Container = styled.div`
  margin-bottom: 12px;
  width: ${({ width }: ContainerProps) => width};
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Label = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const ViewContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
  cursor: pointer;
  :hover {
    color: #e61737;
  }
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dcdcdc;
  margin-top: 12px;
`
