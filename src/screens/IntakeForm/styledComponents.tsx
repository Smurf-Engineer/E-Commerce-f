import styled from 'styled-components'
import { WHITE, GRAY_DARK, BLUE } from '../../theme/colors'
import { AVENIR_NEXT } from '../../theme/fonts'

interface StyleProps {
  action?: boolean
}

export const Container = styled.div`
  background-color: ${WHITE};
  width: 100%;
`

export const Title = styled.div`
  font-weight: 600;
  font-size: 19px
  margin-top: 20px;
  @media (max-width: 768px) {
    margin: 0;
  }
`

export const Subtitle = styled.div`
  font-size: 18px
  margin-top: 5px
  color: ${({ action }: StyleProps) => (action ? BLUE : GRAY_DARK)};
  cursor: ${({ action }: StyleProps) => (action ? 'pointer' : 'normal')};
  max-width: 525px;
`

export const NavHeader = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  align-items: center;
`

export const ModalTitle = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  margin-bottom: 5px;
`

export const InfoBody = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: -38px;
`

export const buttonStyle = {
  background: BLUE,
  border: 'none'
}