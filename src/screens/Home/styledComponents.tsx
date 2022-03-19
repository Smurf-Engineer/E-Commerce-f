import styled from 'styled-components'
import Button from 'antd/lib/button'
import Spin from 'antd/lib/spin'
import Skeleton from 'antd/lib/skeleton'
import {
  WHITE,
  AUBERGINE,
  GRAY_SOFT,
  GRAY_HEADER,
  BLACK,
  GRAY_LIGHTEST,
  RED,
  GREEN
} from '../../theme/colors'
import { AVENIR_MEDIUM } from '../../theme/fonts'

interface DivProps {
  loading?: boolean
  fullSize?: boolean
  topPosition?: number
}

export const Container = styled.div`
  transition: all 0.5s ease;
  z-index: 2;
  min-height: 120vh;
  max-width: 1680px;
  margin: 0 auto;
  box-shadow: 0px 5px 14px 8px #c7c7c7;
  opacity: ${({ loading }: DivProps) => (loading ? '0' : '1')};
`

export const HomeHeader = styled.div`
  color: ${WHITE};
  font-size: 24px;
  padding: 20px;
`

export const SearchBarContent = styled.div`
  color: ${WHITE};
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: all .25s;
  box-shadow: 0px 5px 8px -4px #292929;
  @media (min-width: 992px) {
    display: none;
  }
`

export const SearchBackground = styled.img`
  object-fit: cover;
  width: 100%;
  cursor: pointer;
`

export const SearchContainer = styled.div`
  position: relative;
`

export const HelpContainer = styled.div`
  text-align: center;

  @media (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`

export const Spinner = styled(Spin)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`

export const ImageSkeleton = styled.div`
  width: ${({ fullSize }: DivProps) => (fullSize ? '100%' : '48%')};
  border-radius: 7px;
  height: 262px;
  margin-top: 24px;
  margin-bottom: 18px;
  background: #f1f1f1;
  @media (max-width: 768px) {
    margin-top: ${({ fullSize }: DivProps) => (fullSize ? '0' : '24px')};
  }
`

export const ImageRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const RedirectDiv = styled.div`
  display: flex;
  flex-flow: column;
  width: 100vw;
  position: fixed;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export const JakrooLogo = styled.img`
  max-width: 239px;
  width: 100%;
  margin-bottom: 32px;
`

export const LabelRedirect = styled.div`
  margin-bottom: 44px;
`

export const SkeletonDiv = styled(Skeleton)`
  margin-left: -77px;
  li {
    background: #f1f1f1 !important;
  }
`

export const LoadingContainer = styled.div`
  justify-content: center;
  flex-flow: column;
  width: 100%;
  transition: all .25s ease;
  padding: 0 26px;
  position: absolute;
  top: 103px;
  z-index: 1;
  display: ${({ loading }: DivProps) => (loading ? 'flex' : 'none')}
  opacity: ${({ loading }: DivProps) => (loading ? '1' : '0')}
  align-items: center;
`

export const NeedHelp = styled.div`
  color: ${WHITE};
  font-size: 14px;
  height: 19px;
  line-height: 19px;
  margin: 17px 0 5px 0;
`

export const GetStartedButton = styled(Button)`
  border-radius: 0;
  font-size: 16px;
  height: 51px;
  line-height: 22px;
  width: 30%;
`

export const PropositionTilesContainer = styled.div`
  background-color: ${AUBERGINE};
  color: ${WHITE};
  display: flex;
  justify-content: space-evenly;
  padding: 21px 0 29px;

  @media (min-width: 320px) and (max-width: 767px) {
    flex-direction: column;
    height: 401px;
    padding: 0;
  }
`

export const PropositionTile = styled.div`
  color: ${WHITE};
  font-size: 20px;
  letter-spacing: 0.25px;
  line-height: 27px;
  text-align: center;
`

export const SubText = styled.div`
  color: ${GRAY_SOFT};
  font-size: 14px;
`

export const layoutStyle = {
  background: GRAY_HEADER
}

export const CarouselContainer = styled.div`
  & .slick-prev {
    margin-left: 30px;
  }
  & .slick-next {
    margin-right: 20px;
  }

  .slick-dots{
    bottom: 8px;
  }
  .slick-dots li button {
    height: 0;
  }
  .slick-dots li button:before {
    background: ${WHITE};
    border-radius: 100px;
    border: 1px solid ${BLACK};
    box-shadow: 0 0 1px 4px 2px ${WHITE};
    content: '';
    height: 12px;
    width: 12px;
    margin-top: 4px;
  }
  .slick-dots li.slick-active button:before {
    background: ${BLACK};
  }
`

export const Arrow = styled.img`
  height: 60px !important;
  width: 50px !important;
  padding: 20px !important;
  text-align: center !important;
  z-index: 1 !important;
  background-color: ${BLACK} !important;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07) !important;
  &:hover {
    opacity: 0.7;
  }
`

export const SlideImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SlideVideo = styled.video`
  width: 100%;
`

export const ImageContainer = styled.div`
  width: 100%;
`

export const SlideImage = styled.img`
  width: 100%;
  display: inline-block;
  @media (max-width: 425px) {
    display: none;
  }
`
export const SlideImageMobile = styled.img`
  width: 100%;
  display: none;
  @media (max-width: 425px) {
    display: inline-block;
  }
`
export const DeliveryInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
interface MonthProps {
  currentMonth?: boolean
}

export const Calendar = styled.div`
  margin-top: 5px;
  border: 2px solid
    ${({ currentMonth }: MonthProps) => (currentMonth ? RED : GREEN)};
  width: 90px;
  height: 90px;
  background: ${WHITE};
  color: ${BLACK};
  @media (max-width: 400px) {
    height: 50px;
    width: 60px;
  }
`

export const Month = styled.div`
  font-size: 13px;
  background: ${({ currentMonth }: MonthProps) => (currentMonth ? RED : GREEN)}
  text-align: center;
  color: ${WHITE};
  text-transform: uppercase;
  font-weight: 600;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 400px) {
    font-size: 10px;
    height: 15px;
  }
`

export const Day = styled.div`
  font-size: 36px;
  text-align: center;
  font-weight: 600;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 400px) {
    height: 30px;
    font-size: 20px;
  }
`

export const OrderInfo = styled.div`
  display: flex;
  flex-flow: column;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  align-items: center;
  color: ${BLACK};
  @media (max-width: 400px) {
    font-size: 8px;
  }
`

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  text-transform: uppercase;
  text-align: center;
  margin: 0 90px;
  color: ${BLACK};
  @media (max-width: 600px) {
    margin: 0 10px;
  }
  @media (max-width: 400px) {
    margin: 0;
    font-size: 11px;
  }
`

export const NumberOfDays = styled.div`
  font-weight: 600;
  font-size: 18px;
  font-family: ${AVENIR_MEDIUM};
  margin: 0px 0;
  font-weight: 900;
  @media (max-width: 400px) {
    font-size: 12px;
  }
`

export const OrderingInfo = styled.div`
  font-size: 13px;
  text-transform: none;
  font-style: italic;
  @media (max-width: 600px) {
    margin-top: 10px;
  }
  @media (max-width: 400px) {
    font-size: 9px;
  }
`

export const DeliveryContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: ${GRAY_LIGHTEST};
  text-align: center;
  color: ${BLACK};
  @media (max-width: 600px) {
    width: 100%;
    overflow: hidden;
  }
`

export const HeaderInfoTitle = styled.div`
  display: flex;
  font-weight: 600;
  letter-spacing: 0.5px;
  width: 250px;
  margin-bottom: 5px;
  @media (max-width: 600px) {
    font-size: 12px;
    width: 200px;
  }
  @media (max-width: 400px) {
    font-size: 10px;
    width: 180px;
  }
`
