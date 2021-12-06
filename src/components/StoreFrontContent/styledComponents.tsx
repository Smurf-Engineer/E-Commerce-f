/**
 * Styled Components - Created by gustavomedina on 18/04/18.
 */
import styled from 'styled-components'
import AntdButton from 'antd/lib/button'
import {
  GREEN,
  BLACK_LIGHT,
  WHITE,
  BLUE_BRIGHT,
  GRAY_HEADER,
  GRAY_SKELETON,
  BLUE,
  GRAY_DARK,
  RED
} from '../../theme/colors'
type DivProps = {
  onDemandMode?: boolean
  open?: boolean
  left?: boolean
}

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${WHITE};
  max-width: 1452px;
  width: 100%;
  margin: 0 auto;
  padding: 10px 50px 0;
  @media (min-width: 320px) and (max-width: 748px) {
    padding: 0;
  }
`

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 425px) and (max-width: 768px) {
    flex-flow: row;
    align-items: flex-start;
  }
  @media (max-width: 425px) {
    flex-flow: column-reverse;
    align-items: center;
  }
`
export const SideBar = styled.div``

export const Description = styled.div`
  text-align: center;
  padding: 0 8px;
  @media (max-width: 425px) {
    margin-left: 0;
  }
`
export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  text-transform: uppercase;
  padding-right: 10px;
  text-align: center;
  margin-bottom: 0;
  @media (max-width: 800px) {
    margin-top: 8px;
  }
`

export const AboutTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 30px;
`

export const StoreBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  margin-bottom: 12px;
  height: 51px;
  border: 2px solid ${({ open }: DivProps) => (open ? GREEN : BLACK_LIGHT)};
  background-color: ${({ open }: DivProps) => (open ? WHITE : BLACK_LIGHT)};
  border-radius: 2px;
  color: ${({ open }: DivProps) => (open ? GREEN : WHITE)};
  font-family: Avenir Next;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.23px;
  line-height: 25px;
  text-align: center;
`

export const ErrorTitle = styled.div`
  color: #e21530;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
  height: 70vh;
  align-items: center;
  justify-content: center;
  display: flex;
`

export const AboutContainer = styled.div`
  padding: 30px;
`

export const OrderTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 19px;
  text-align: center;
  margin-bottom: 22px;
  max-width: 267px;
`

type TitleProps = {
  center?: boolean
}

export const PriceTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 21px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-transform: uppercase;
  text-align: ${({ center }: TitleProps) => (center ? 'center' : 'left')};
`

export const Bulletin = styled.div`
  display: inline-flex;
  max-width: 570px;
  width: 100%;
  background: ${GRAY_HEADER};
  position: relative;
  min-height: 57px;
  margin: 12px auto 0;

  padding: 14px 12px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: ${BLUE_BRIGHT};
  font-style: italic;
  font-family: 'Avenir-Medium';
  @media (max-width: 480px) {
    height: auto;
    width: auto;
    margin: 12px;
    min-width: 80%;
    padding: 16px;
  }
`

export const PricesButton = styled.div`
  color: ${BLUE};
  width: 200px;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
  margin: 10px auto 0px;
`

export const BulletinLabel = styled.span`
  white-space: pre-line;
  text-align: center;
`

export const Pin = styled.img`
  transform: ${({ left }: DivProps) => (left ? 'scaleX(-1)' : 'none')};
`

export const PinDiv = styled.div`
  position: absolute;
  top: -7px;
  width: 102%;
  justify-content: space-between;
  display: flex;
`

export const Corner = styled.div`
  width: 0;
  height: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-bottom: 16px solid ${WHITE};
  border-left: 16px solid ${GRAY_SKELETON};
`

export const PriceDescription = styled.div`
  padding-top: 10px;
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const Text = styled.div`
  color: #fff;
`

export const ButtonWrapper = styled.div`
  padding-right: 10px;
  .ant-btn-primary {
    background-color: ${BLUE};
    border-color: ${BLUE};
    width: 70px;
  }
  .ant-btn-primary:hover {
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
`

export const Button = styled(AntdButton)`
  height: 40px;
  width: 70px;
`

export const DefaultButton = styled(AntdButton)`
  height: 40px;
`

export const ImageBanner = styled.img`
  max-height: 300px;
  max-width: 1452px;
  margin: 0 auto 10px;
  width: 100%;
  object-fit: cover;
`

export const CalendarView = styled.div`
  height: 78px;
  width: 81px;
  margin-right: 7px;
  margin-left: 7px;
  border: 2px solid #8c8c8c;
  border-radius: 2px;
`

export const CalendarFinalView = styled.div`
  height: 78px;
  margin-right: 7px;
  margin-left: 7px;
  border: 2px solid ${RED};
  border-radius: 2px;
  max-width: 80px;
  width: 100%;
`

export const CalendarTitle = styled.div`
  text-align: center;
  width: 100%;
  height: 20px;
  color: ${WHITE};
  background-color: #8c8c8c;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  font-size: 12px;
`

export const CutOffDiv = styled.div`
  margin-top: 7px;
  font-size: 10px;
  margin-bottom: -10px;
`

export const CutOffTime = styled.div`
  margin-top: 18px;
  font-size: 10px;
  max-width: 174px;
`

export const CalendarFinalTitle = styled.div`
  text-align: center;
  width: 100%;
  height: 22px;
  color: ${WHITE};
  background-color: ${RED};
  text-transform: uppercase;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  font-size: 12px;
`

export const CalendarDay = styled.div`
  width: 100%;
  font-size: 36px;
  font-weight: bold;
  color: ${GRAY_DARK};
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 20px);
`

export const DatesContainer = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: ${({ onDemandMode }: DivProps) => (onDemandMode ? '0' : '20px')};
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  @media (max-width: 425px) {
    justify-content: center;
    margin-top: 18px;
  }
`

export const Dates = styled.div`
  display: flex;
  flex-flow: row;
  align-items: flex-start;
`
export const FlexContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 764px) {
    flex-flow: column;
    justify-content: center;
  }
`

export const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  padding: 10px;
`

export const CalendarContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 3;
`

export const DatesTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 10px;
  max-width: 170px;
  letter-spacing: 0.15px;
  line-height: 16px;
  text-align: center;
  padding-bottom: 5px;
  font-weight: ${({ onDemandMode }: DivProps) =>
    onDemandMode ? 'bold' : 'normal'};
`

export const AssistanceDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: fit-content;
  margin: auto;
  padding: 10px 25px;
  text-align: center;
  font-size: 16px;
  background-color: #e6ffe5;
  border-radius: 8px;
  border: 1px solid #9bd390;
  @media (max-width: 768px) {
    font-size: 10px;
    padding: 10px 18px;
  }
  @media (max-width: 740px) {
    justify-content: center;
    margin-top: 18px;
    position: unset;
  }
`

export const SectionLink = styled.a`
  color: ${BLUE};
  margin-top: 8px;
  display: block;
  &:hover {
    cursor: pointer;
  }
`

export const ListContainer = styled.div`
  padding-right: 0;
  padding-left: 32px;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  margin-top: 28px;
  @media (min-width: 320px) and (max-width: 748px) {
    padding-left: 0;
  }
`

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`

export const DynamicDropLogo = styled.img`
  width: 150px;
  margin: 15px 0;
`
