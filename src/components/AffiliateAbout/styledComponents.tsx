/**
 * Styled Components - Created by Jesús Apodaca on 30/06/20.
 */
import styled from 'styled-components'
import Switch from 'antd/lib/switch'
import { WHITE_TRANSPARENT, BLUE, GRAY_DARK, BLACK, WHITE, GRAY } from '../../theme/colors'
import { AVENIR_MEDIUM } from '../../theme/fonts'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 320px) and (max-width: 768px) {
    padding: 24px 0;
  }
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 24px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 24px;
`

export const LoadingErrorContainer = styled.div`
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
`

export const ErrorMessage = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const StyledSwitch = styled(Switch)`
  margin-left: 24px;
`

export const SwitchWrapper = styled.div`
  justify-content: center;
  align-items: center;
  font-weight: bold;
  display: flex;
  margin-top: 72px;
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

export const StatusLabel = styled.div`
  margin-top: 8px;
  color: ${BLUE};
  font-style: italic;
`

export const AccountLabel = styled.div`
  margin-top: 8px;
  color: ${GRAY_DARK};
`

export const HeaderSection = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`

export const PayDayIcon = styled.img`
  max-width: 344px;
  margin-left: -24px;
  object-fit: cover;
  margin-top: -64px;
`

export const InfoSection = styled.div`
  background: ${BLACK};
  color: ${WHITE};
  padding: 21px 28px;
  display: flex;
  @media (max-width: 768px) {
    flex-flow: column;
  }
`

export const TextSection = styled.div`
  flex: 1;
  margin-right: 24px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`

export const TitlePay = styled.div`
  color: #96be00;
  font-size: 32px;
  font-family: ${AVENIR_MEDIUM};
`

export const BodyPay = styled.div`
  font-size: 17px;
  font-family: Avenir;
`

export const Slogan = styled.div`
  font-size: 21px;
  font-family: ${AVENIR_MEDIUM};
`

export const PayDayImage = styled.img`
  max-width: 462px;
  width: 100%;
  object-fit: cover;
  margin-top: -46px;
  margin-right: 52px;
  margin-bottom: -46px;
  flex: 1;
  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 302px;
    margin-right: 0;
  }
  @media (max-width: 768px) {
    margin-top: 26px;
    margin-bottom: -44px;
  }
`

export const AboutBody = styled.div`
  margin-right: 84px;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`

export const HowItWorks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-flow: column;
  margin-top: 44px;
  border-top: 2px solid ${GRAY};
  padding-top: 32px;
`

export const Icons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    flex-flow: column;
  }
`

export const IconLabel = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  max-width: 237px;
`

export const SmallIcon = styled.img`
  height: 164px;
  object-fit: contain;
`

export const Label = styled.div`
  text-align: center;
  font-family: ${AVENIR_MEDIUM};
`

export const FAQSection = styled.div`
  margin-top: 84px;
  text-align: center;
`

export const FAQBody = styled.div`
  text-align: left;
  padding-top: 20px;
  font-size: 15px;
  margin-bottom: 54px;
  b {
    display: block;
  }
`