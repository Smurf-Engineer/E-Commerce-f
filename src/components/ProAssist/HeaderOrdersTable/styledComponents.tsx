/**
 * Styled Components - Created by eduardoquintero on 16/01/20.
 */
import styled from 'styled-components'
import icon from 'antd/lib/icon'

interface ContainerProps {
  justifyContent?: string
}

export const Container = styled.div`
  display: flex;
  flex:direction: row;
  align-items: center;
  justify-content: ${({ justifyContent }: ContainerProps) =>
    justifyContent ? justifyContent : 'flex-start'};
`

interface IconProps {
  color: string
}

export const Icon = styled(icon)`
  margin-left: 6px;
  font-size: 11px;
  color: ${({ color }: IconProps) => (color ? color : '#bebebe')};
`

export const IconsContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Header = styled.th`
  border-bottom: 1px solid #818181;
  text-align: left;
  padding: 8px 0;
  color: #5f6062;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  text-align: ${({ justifyContent }: ContainerProps) =>
    justifyContent === 'flex-end' ? 'right' : 'left'};
  @media (min-width: 320px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 12px;
    line-height: 15px;
  }
`
