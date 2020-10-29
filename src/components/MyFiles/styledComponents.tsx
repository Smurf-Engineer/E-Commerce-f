/**
 * Styled Components - Created by miguelcanobbio on 25/07/18.
 */
import Icon from 'antd/lib/icon'
import styled from 'styled-components'
import { BLUE, GRAY_DARK, WHITE } from '../../theme/colors'
import { AVENIR_NEXT } from '../../theme/fonts'

type Props = {
  color?: string
}

export const Container = styled.div`
  padding-bottom 80px;
`

export const Message = styled.div`
  max-width: 500px;
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-bottom: 36px;
`

export const Subtitle = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const VerticalDivider = styled.div`
  widht: 100%;
  height: 1px;
  background-color: #dcdcdc;
  margin: 24px 0;
`

export const ModalMessage = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const DraggerBottom = styled.div`
  display: flex;
  margin-bottom: 48px;
  max-width: 644px;
  .ant-upload.ant-upload-drag {
    background: ${WHITE};
    padding: 8px 0;
  }
  @media (max-width: 768px) {
    flex-flow: column;
  }
`

export const Recommendation = styled.div`
  color: ${({ color = GRAY_DARK }: Props) => color};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 23px;
  padding: 8px 34px;

  @media (min-width: 768px) and (max-width: 991px) {
    padding: 8px 10px;
  }
  @media (max-width: 768px) {
    padding: 8px 0;
  }
`

export const RecommendationSection = styled.div`
  max-width: 420px;
  width: 100%;
`

export const ModalTitleStyled = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
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

export const WarningIcon = styled(Icon)``

export const buttonStyle = {
  background: BLUE,
  border: 'none',
}