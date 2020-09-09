/**
 * Styled Components - Created by eduardoquintero on 21/01/20.
 */
import styled from 'styled-components'
import { GRAY_DARK, GRAY } from '../../../theme/colors'

interface DivProps {
  isAdmin?: boolean
}

export const MessageText = styled.div`
  max-width: ${({ isAdmin }: DivProps) => isAdmin ? '100%' : '500px'};
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-bottom: 20px;
  margin-top: ${({ isAdmin }: DivProps) => isAdmin ? `20px` : 'none'};
  padding-bottom: ${({ isAdmin }: DivProps) => isAdmin ? `12px` : 'none'};;
  font-weight: ${({ isAdmin }: DivProps) => isAdmin ? `bold` : 'none'};;
  border-bottom: ${({ isAdmin }: DivProps) => isAdmin ? `1px solid ${GRAY}` : 'none'};
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const SpinContainer = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 50px;
`

export const ImageList = styled.div`
  margin-top: 15px;
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-wrap: wrap;
`
