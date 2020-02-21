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
  GRAY_DARK
} from '../../theme/colors'
type DivProps = {
  onDemandMode?: boolean
  open?: boolean
  left?: boolean
}
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${WHITE};
  max-width: 1452px;
  width: 100%;
  margin: 0 auto;
  padding: 10px 50px 0;
`

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  @media (min-width: 425px) and (max-width: 768px) {
    flex-flow: row;
    align-items: flex-start;
  }
  @media (max-width: 425px) {
    flex-flow: column;
    align-items: center;
    margin: 18px 14px 0;
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
  color: #5f6062;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  text-transform: uppercase;
  padding-right: 10px;
  text-align: center;
  margin-bottom: 0;
  @media (max-width: 800px) {
    margin-bottom: 8px;
  }
`

export const AboutTitle = styled.div`
  color: #5f6062;
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
  color: #5f6062;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 19px;
  text-align: center;
  margin-bottom: 10px;
  max-width: 267px;
`

export const PriceTitle = styled.div`
  padding-top: 18px;
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-transform: uppercase;
  text-align: center;
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
  color: #5f6062;
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
  margin-right: 5px;
  margin-left: 5px;
  border: 2px solid #8c8c8c;
  border-radius: 2px;
`

export const CalendarFinalView = styled.div`
  height: 78px;
  margin-right: 5px;
  margin-left: 5px;
  border: 2px solid #e61737;
  border-radius: 2px;
`

export const CalendarTitle = styled.div`
  text-align: center;
  width: 100%;
  height: 20px;
  color: #ffffff;
  background-color: #8c8c8c;
  text-transform: uppercase;
`

export const CalendarFinalTitle = styled.div`
  text-align: center;
  height: 22px;
  color: #ffffff;
  background-color: #e61737;
  text-transform: uppercase;
  padding: 4px 8px;
  font-size: 12px;
`

export const CalendarDay = styled.div`
  text-align: center;
  width: 100%;
  height: 80%;
  font-size: 36px;
  font-weight: bold;
  color: #5f6062;
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
`
export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 768px) {
    flex-flow: column;
    justify-content: center;
  }
`

export const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
`

export const CalendarContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const DatesTitle = styled.div`
  color: #5f6062;
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
  padding-bottom: 5px;
`

export const ListContainer = styled.div`
  padding-right: 32px;
  padding-left: 32px;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  margin-top: 28px;
`

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`
