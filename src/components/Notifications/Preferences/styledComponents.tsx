import styled from 'styled-components'
import Checkbox from 'antd/lib/checkbox'
import { WHITE_TRANSPARENT, GRAY_DARK, BLACK } from '../../../theme/colors'

interface ColumnProps {
  marginLeft?: string
}

interface CheckboxProps {
  hide?: boolean
}

export const Container = styled.div`
  text-align: left;
  margin-bottom: 50px;

  @media (min-width: 769px) and (max-width: 1280px) {
    margin-right: 36px;
  }
`

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
  @media (max-width: 768px) {
    margin: 20px 15px 20px 5px;
  }
  @media (min-width: 769px) and (max-width: 1280px) {
    flex-direction: column;
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: ${({ marginLeft }: ColumnProps) =>
    marginLeft ? marginLeft : '0px'};
`

export const NotifcationContent = styled.div`
  display: flex;
`

export const Header = styled.div`
  display: flex;
  font-weight: 600;
  margin-bottom: 8px;
  align-items: baseline;
  min-height: 17px;
`

export const Title = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 2px;
  margin-top: 2px;

  @media (max-width: 768px) {
    flex-direction: column;
    font-weight: bold;
    margin: 10px 0;
  }
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

export const CheckBoxStyled = styled(Checkbox)`
  margin-left: 8px !important;
  visibility: ${({ hide }: CheckboxProps) => (hide ? 'hidden' : 'visible')};

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`

export const PhoneColumn = styled.div`
  display: block;
  margin-left: 10px;

  @media (max-width: 768px) {
    margin-left: 5px;
  }
`

export const DesktopHeader = styled(Header)`
  @media (max-width: 768px) {
    color: transparent;
  }
`

export const DesktopDescription = styled(Description)`
  @media (max-width: 768px) {
    display: none;
  }
`

export const RightInfo = styled.div`
  color: ${BLACK};
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`

export const MobileFlexColumn = styled(Column)`
  @media (max-width: 768px) {
    flex: 1;
  }
`

export const AlertsColumn = styled(Column)`
  justify-content: flex-start;
  margin-right: 70px;
  margin-top: -30px;
  @media (max-width: 1520px) {
    margin-right: 0px;
  }
  @media (max-width: 768px) {
    display: none !important;
  }
  @media (min-width: 769px) and (max-width: 1280px) {
    margin-top: 40px;
    margin-left: 0;
  }
`

export const MobilePhoneColumn = styled(PhoneColumn)`
  @media (min-width: 769px) {
    display: none;
  }
`

export const DesktopPhoneColumn = styled(PhoneColumn)`
  margin-left: 0px;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    display: none;
  }
`

export const AlertsTitle = styled.div`
  color: ${BLACK};
  font-weight: bold;
  font-size: 20px;
`

export const AlertsSubtitle = styled.div`
  color: ${BLACK};
`

export const NotificationImage = styled.img`
  width: 600px;

  @media (min-width: 1440px) {
    width: 400px;
  }
`

export const InputTitleContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
`
export const Label = styled.div`
  height: 19px;
  color: ${GRAY_DARK};
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`
