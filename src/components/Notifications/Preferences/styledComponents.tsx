import styled from 'styled-components'
import { WHITE_TRANSPARENT } from '../../../theme/colors'

interface ColumnProps {
    marginLeft?: string
}

export const Container = styled.div`
    text-align: left;
    margin-bottom: 50px;
`

export const NotificationContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: ${({ marginLeft }: ColumnProps) =>
        marginLeft ? marginLeft : '0px'}
`

export const Header = styled.div`
    display: flex;
    font-weight: 600;
    margin-bottom: 8px;
    align-items: baseline;
`

export const Title = styled.div`
    display: flex;
    align-items: baseline;
    margin-bottom: 2px;
    margin-top: 2px;
`

export const Description = styled.div`
    font-weight: normal;
    font-size: 12px;
`

export const LoadingContainer = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10000;
  height: 100vh;
  background: ${WHITE_TRANSPARENT};
  display: flex;
  justify-content: center;
  align-items: center;
`
