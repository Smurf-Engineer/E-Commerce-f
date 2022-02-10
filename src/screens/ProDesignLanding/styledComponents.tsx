/**
 * Styled Components - Created by eduardoquintero on 18/02/20.
 */
import styled from 'styled-components'
import {
  BLUE,
  GRAY_HEADER,
  WHITE,
} from '../../theme/colors'

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  background: ${GRAY_HEADER};
`

export const DataContainer = styled.div`
  width: 100%;
  max-width: 1680px;
  background: ${WHITE};
  z-index: 1;
  box-shadow: 0px 12px 14px 4px #c9c9c9;
  animation: fade-in-bottom 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.7s both;
  @keyframes fade-in-bottom {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

export const CarouselContainer = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    margin-right: 0px;
  }
  img {
    object-fit: contain !important;
    width: 100% !important;
    border-radius: 3px !important;
  }
  & .slick-prev {
    margin-left: 30px;
  }
  & .slick-next {
    margin-right: 20px;
  }
  .slick-dots {
    bottom: 25px;
    li {
      button {
        opacity: 0.6;
        background: none !important;
      }
      button:before {
        opacity: 1;
        color: #e7e7e7;
        filter: drop-shadow(0px 0px 1px white);
        font-size: 12px !important;
      }
      &.slick-active {
        button {
          opacity: 1;
          color: #3e3d3d !important;
        }
      }
    }
  }
`

export const CarouselItem = styled.img``

export const Section = styled.div`
  position: relative;
  animation: fade-in-left 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) 1s both;
  @keyframes fade-in-left {
    0% {
      transform: translateX(-20px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

export const LeftText = styled.div`
  position: absolute;
  color: ${WHITE};
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin-left: 92px;
  font-family: Avenir;
  @media(max-width: 1024px) {
    margin-left: 46px;
  }
  @media(max-width: 678px) {
    margin-left: 12px;
  }
`

export const RightText = styled.div`
  position: absolute;
  color: ${WHITE};
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  font-family: Avenir;
  right: 128px;
  max-width: 464px;
  align-items: center;
  @media (max-width: 1280px) {
    right: 50px;
  }
  @media (max-width: 1024px) {
    right: 14px;
  }
  @media (max-width: 768px) {
    max-width: 336px;
  }
  @media (max-width: 678px) {
    max-width: 160px;
  }
`

export const TitleText = styled.div`
  font-size: 36px;
  font-weight: bold;
  font-family: Avenir;
  margin-bottom: 10px;
  width: 100%;
  @media (max-width: 1280px) {
    font-size: 32px;
  }
  @media (max-width: 1024px) {
    font-size: 28px;
  }
  @media (max-width: 768px) {
    font-size: 24px;
  }
  @media (max-width: 678px) {
    font-size: 14px;
  }
`

export const Subtitle = styled.div`
  font-size: 16px;
  font-family: Avenir;
  margin-bottom: 64px;
  width: 100%;
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 24px;
    max-width: 418px;
  }
  @media (max-width: 678px) {
    font-size: 10px;
    margin-bottom: 4px;
  }
`

export const SubtitleNormal = styled.div`
  font-size: 16px;
  font-family: Avenir;
  width: 100%;
  margin-bottom: 10px;
`

export const ListItem = styled.div`
  display: list-item;
  margin-left: 20px;
  padding-left: 14px;
  margin-bottom: 33px;
  @media (max-width: 768px) {
    max-width: 410px;
    margin-bottom: 0px;
  }
  @media (max-width: 678px) {
    max-width: 396px;
    margin-bottom: 4px;
    margin-left: 8px;
    padding-left: unset;
    font-size: 10px;
    filter: drop-shadow(0px 0px 4px black);
  }
`

export const FullImage = styled.img`
  width: 100%;
`

export const TopBar = styled.div`
  width: 100%;
  min-height: 58px;
  display: flex;
  background: ${WHITE};
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px -1px #585858;
  z-index: 2;
  animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.2s both;
  @keyframes fade-in-top {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

export const LogoIcon = styled.img`
  max-width: 130px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const SectionFlex = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 30px;
  @media (max-width: 678px) {
    flex-flow: column;
    margin-bottom: 0px;
  }
  animation: fade-in-right 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) 1.5s both;
  @keyframes fade-in-right {
    0% {
      transform: translateX(20px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

export const SectionFlexInverted = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 30px;
  @media (max-width: 678px) {
    flex-flow: column-reverse;
  }
  animation: fade-in-left 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) 2s both;
  @keyframes fade-in-left {
    0% {
      transform: translateX(-20px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

export const FlexSide = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 48px;
  @media(max-width: 768px) {
    margin: 26px;
  }
  @media(max-width: 678px) {
    margin: 22px 14px;
  }
`

export const FlexSideLeft = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-right: 48px;
  @media (max-width: 678px) {
    margin-right: 0px;
  }
`

export const FlexSideRight = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-left: 48px;
  @media (max-width: 678px) {
    margin-left: 0px;
  }
`

export const PhotoImageNormal = styled.img`
  max-width: 610px;
  @media (max-width: 1280px) {
    max-width: 480px;
    width: 100%;
  }
`

export const PhotoImageFull = styled.img`
  max-width: 610px;
  border-radius: 3px
  @media (max-width: 1280px) {
    max-width: 480px;
  }
  @media (max-width: 768px) {
    max-width: 342px;
  }
  @media (max-width: 678px) {
    max-width: 100%;
  }
`

export const BigImage = styled.img`
  max-width: 258px;
  @media (max-width: 1024px) {
    max-width: 180px;
  }
  @media (max-width: 768px) {
    max-width: 90px;
  }
  @media (max-width: 678px) {
    margin-top: 12px;
  }
`

export const MediumImage = styled.img`
  max-width: 556px;
  @media (max-width: 1280px) {
    max-width: 514px;
    width: 100%;
  }
`

export const SmallImage = styled.img`
  max-width: 128px;
  @media (max-width: 768px) {
    max-width: 100px;
  }
  @media (max-width: 768px) {
    max-width: 80px;
  }
  @media (max-width: 678px) {
    max-width: 23px;
  }
`

export const PhotoImage = styled.img`
  max-width: 610px;
  box-shadow: 0px 2px 8px 1px #ababab;
  @media (max-width: 1280px) {
    max-width: 480px;
  }
  @media (max-width: 768px) {
    max-width: 342px;
  }
`

export const BottomSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
  flex-flow: column;
  margin-top: 48px;
`

export const BottomText = styled.div`
  font-size: 16px;
  font-family: Avenir;
`

export const BottomButton = styled.div`
  background: ${BLUE};
  padding: 16px 24px;
  border-radius: 3px;
  color: white;
  font-family: Avenir;
  margin-top: 50px;
  margin-bottom: 100px;
  box-shadow: 0px 2px 5px 0px #878787;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`