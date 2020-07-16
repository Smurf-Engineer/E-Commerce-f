import styled from 'styled-components'
import Button from 'antd/lib/button'
import Spin from 'antd/lib/spin'
import Skeleton from 'antd/lib/skeleton'
import {
  WHITE,
  AUBERGINE,
  GRAY_SOFT,
  GRAY_SKELETON,
  GRAY_HEADER,
  BLACK,
  GRAY_LIGHTEST,
  RED,
  GREEN
} from '../../theme/colors'

interface DivProps {
  loading?: boolean
  fullSize?: boolean
}

export const Container = styled.div`
  transition: all 0.5s ease;
  z-index: 2;
  min-height: 120vh;
  opacity: ${({ loading }: DivProps) => (loading ? '0' : '1')};
`

export const HomeHeader = styled.div`
  color: ${WHITE};
  font-size: 24px;
  padding: 20px;
`

export const SearchBarContent = styled.div`
  color: ${WHITE};
  position: unset;
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
  background: ${GRAY_SKELETON};
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

export const SkeletonDiv = styled(Skeleton)`
  margin-left: -77px;
  li {
    background: ${GRAY_SKELETON} !important;
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
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 500px) {
    flex-direction: column-reverse;
  }
`
interface MonthProps {
  currentMonth?: boolean
}

export const Calendar = styled.div`
  margin-top: 15px;
  border: 2px solid
    ${({ currentMonth }: MonthProps) => (currentMonth ? RED : GREEN)};
  min-width: 150px;
  @media (max-width: 600px) {
    margin-bottom: 15px;
  }
`

export const Month = styled.div`
  font-size: 20px;
  background: ${({ currentMonth }: MonthProps) => (currentMonth ? RED : GREEN)}
  text-align: center;
  color: ${WHITE};
  padding: 5px;
  text-transform: uppercase;
  font-weight: 600;
`

export const Day = styled.div`
  font-size: 40px;
  text-align: center;
  padding: 10px;
  font-weight: 600;
`

export const OrderInfo = styled.div`
  display: flex;
  flex-flow: column;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  text-transform: uppercase;
  text-align: center;
  @media (max-width: 600px) {
    order: 1;
  }
`

export const NumberOfDays = styled.div`
  font-weight: 600;
  font-size: 30px;
  margin: 20px 0;
`

export const OrderingInfo = styled.div`
  font-style: italic;
  font-size: 15px;
  text-transform: capitalize;
`

export const DeliveryContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: ${GRAY_LIGHTEST};
  text-align: center;
`
