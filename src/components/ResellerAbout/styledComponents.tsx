/**
 * Styled Components - Created by Jesús Apodaca on 30/06/20.
 */
import styled from 'styled-components'
import Switch from 'antd/lib/switch'
import { WHITE_TRANSPARENT, BLUE, GRAY_DARK, BLACK, WHITE, GRAY } from '../../theme/colors'
import { AVENIR_MEDIUM } from '../../theme/fonts'
import Caroussel from 'react-slick'

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
  margin-top: 64px;
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
  object-fit: cover;
  margin: -52px 0 14px -8px;
  @media (max-width: 767px) {
    max-width: 264px;
  }
`

export const ResellerDiagram = styled.img`
  max-width: 304px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 14px;
  @media (max-width: 767px) {
    max-width: 264px;
  }
`

export const InfoSection = styled.div`
  background: ${BLACK};
  color: ${WHITE};
  padding: 21px 28px;
  display: flex;
  @media (max-width: 767px) {
    flex-flow: column;
    padding: 21px 18px;
  }
`

export const TextSection = styled.div`
  flex: 1;
  margin-right: 24px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  @media (max-width: 767px) {
    margin-right: 0;
  }
`

export const TitlePay = styled.div`
  color: #96be00;
  font-size: 32px;
  font-family: ${AVENIR_MEDIUM};
  @media (max-width: 767px) {
    font-size: 22px;
    margin-bottom: 14px;
  }
`

export const BodyPay = styled.div`
  font-size: 17px;
  font-family: Avenir;
`

export const Slogan = styled.div`
  font-size: 21px;
  color: #96be00;
  font-family: ${AVENIR_MEDIUM};
  @media (max-width: 767px) {
    font-size: 28px;
  }
`

export const PayDayImage = styled.img`
  max-width: 462px;
  width: 100%;
  object-fit: cover;
  margin-top: -21px;
  margin-right: -28px;
  margin-bottom: -21px;
  flex: 1;
  @media (max-width: 1024px) {
    display: none;
  }
`

export const PayDayImageMobile = styled.img`
  max-width: 462px;
  width: 100%;
  object-fit: cover;
  flex: 1;
  display: none;
  @media (min-width: 768px) and (max-width: 1024px) {
    max-height: 383px;
  }
  @media (max-width: 1024px) {
    display: block;
    max-width: 100%;
    object-fit: cover;
    margin-bottom: 8px;
  }
`

export const AboutBody = styled.div`
  padding-right: 84px;
  width: 100%;
  @media (min-width: 769px) and (max-width: 1024px) {
    padding-right: 42px;
  }
  @media (max-width: 768px) {
    padding-right: 0;
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
  width: 100%;
  @media (max-width: 767px) {
    padding: 0 28px;
  }
`

export const IconLabel = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  max-width: 237px;
  @media (min-width: 768px) and (max-width: 1024px) {
    margin: 0 16px
  }
  @media (max-width: 767px) {
    margin: 0 14px;
    margin-left: 29px;
  }
`

export const SmallIcon = styled.img`
  height: 164px;
  object-fit: contain;
  @media (min-width: 769px) and (max-width: 1024px) {
    height: 114px;
  }
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

export const AffiliateDetailsSection = styled.div`
  margin-top: 57px;
  margin-right: 84px;
  border: 1px solid ${GRAY};
  padding: 22px 28px;
  width: auto;
  @media (min-width: 769px) and (max-width: 1024px) {
    margin-right: 42px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Arrow = styled.img``

export const CarousselDiv = styled(Caroussel)`
  display: none !important;
  @media (max-width: 767px) {
    display: block !important;
  }
`

export const DesktopIcons = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    display: none;
  }
`