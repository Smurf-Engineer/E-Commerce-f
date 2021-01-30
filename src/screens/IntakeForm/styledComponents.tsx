import styled from 'styled-components'
import { WHITE, GRAY_DARK, BLUE } from '../../theme/colors'
import { AVENIR_NEXT } from '../../theme/fonts'

interface StyleProps {
  action?: boolean
  small?: boolean
}

export const IntakeContainer = styled.div`
  background-color: ${WHITE};
  width: 100%;
  @media (max-width: 768px) {
    overflow-y: scroll;
    height: calc(100vh - 120px);
  }
`

export const Title = styled.div`
  font-weight: 600;
  font-size: 19px;
  margin-top: 20px;
  @media (max-width: 768px) {
    margin: 0;
  }
`

export const Subtitle = styled.div`
  font-size: ${({ small }: StyleProps) => (small ? '14px' : '18px')};
  margin-top: 14px;
  color: ${({ action }: StyleProps) => (action ? BLUE : GRAY_DARK)};
  cursor: ${({ action }: StyleProps) => (action ? 'pointer' : 'normal')};
  max-width: 590px;
`

export const TopNavHeader = styled.div`
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

export const FileTitle = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 18px;
  margin-bottom: 15px;
`

export const ComparisonDiv = styled.div`
  margin-left: -22px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-flow: row;
  @media (max-width: 767px) {
    flex-flow: column;
  }
`

export const RasterDiv = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  flex: 1;
`

export const RasterImage = styled.img`
  max-width: 228px;
  width: 100%;
`

export const RasterText = styled.div``

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