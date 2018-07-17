/**
 * Styled Components - Created by miguelcanobbio on 16/07/18.
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

export const Icon = styled(icon)`
  margin-left: 6px;
  font-size: 11px;
`

export const IconsContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
