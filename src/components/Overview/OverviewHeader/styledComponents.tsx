/**
 * Styled Components - Created by miguelcanobbio on 17/07/18.
 */
import styled from 'styled-components'

export interface ContainerProps {
  extraMargin?: string
}

export const Container = styled.div`
  margin-bottom: ${({ extraMargin }: ContainerProps) =>
    extraMargin ? extraMargin : '12px'};
  width: 100%;

  @media (max-width: 768px) and (min-width: 320px) {
    margin-top: 24px;
  }
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Label = styled.div`
  color: #5f6062;
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
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
  cursor: pointer;
  &:hover {
    color: #e61737;
  }
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dcdcdc;
  margin-top: 12px;
`
