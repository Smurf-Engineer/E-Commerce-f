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
  BLACK
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
