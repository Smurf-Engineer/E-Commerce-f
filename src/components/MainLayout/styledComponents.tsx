/**
 * Styled Components - Created by david on 12/02/18.
 */
import styled from 'styled-components'
import Carousel from 'antd/lib/carousel'
import { WHITE, AUBERGINE, BLACK_LABEL } from '../../theme/colors'
import Icon from 'antd/lib/icon'

const HEADER_TOP_SIZE = 38
const HEADER_BOTTOM_SIZE = 72
const HEADER_MAX_SIZE = 110

export const Container = styled.div``

export const Text = styled.div`
  color: ${WHITE};
`

interface HeaderProps {
  hideTopHeader?: boolean
  hideBottomHeader?: boolean
}

const HEADER_HEIGHT = ({ hideTopHeader, hideBottomHeader }: HeaderProps) => {
  let height = HEADER_MAX_SIZE
  if (hideTopHeader) {
    height -= HEADER_TOP_SIZE
  }
  if (hideBottomHeader) {
    height -= HEADER_BOTTOM_SIZE
  }
  return height
}

export const Header = styled.div`
  background: ${WHITE};
  line-height: 0px;
  padding: 0px;
  z-index: 10;
  -webkit-transform: translate3d(0, 0, 0);
  @media (min-width: 992px) {
    height: ${HEADER_HEIGHT}px;
  }
`

export const Footer = styled.footer`
  background: ${AUBERGINE};
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  padding: 24px 50px;

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 16px;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 24px;
  }
`

export const CarouselContainer = styled.div`
  position: relative;
`

export const CloseIcon = styled(Icon)`
  margin-top: -46px;
  display: flex;
  z-index: 990;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  font-size: 12px;
  right: 12px;
  border: 1px solid ${BLACK_LABEL};
  color: ${BLACK_LABEL};
  border-radius: 25px;
  transition: .25s;
  background: #fdb532;
  &:hover {
    cursor: pointer;
    background: ${BLACK_LABEL};
    color: #fdb532;
  }
`

export const StyledCarousel = styled(Carousel)`
  background-color: #fdb532;
  .slick-dots {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    height: 100%;
    top: 0;
    right: 16px;
    width: auto;
    @media (max-width: 768px) {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      height: unset;
      top: unset;
      right: unset;
      width: 100%;
    }
  }
  .slick-dots li button {
    height: 0;
  }
  .slick-dots li button:before {
    background: none;
    border-radius: 100px;
    border: 1px solid black;
    content: '';
    height: 12px;
    width: 12px;
    opacity: 1;
    margin-top: 4px;
  }
  .slick-dots li.slick-active button:before {
    background: black;
    opacity: 1;
  }
`

export const EditorWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fdb532;
  height: auto;

  .rdw-editor-wrapper {
    flex: 1;
  }
  .rdw-editor-main {
    display: flex;
    justify-content: center;
  }
  span {
    background-color: transparent !important;
    font-size: 14px !important;
  }
  @media (max-width: 768px) {
    padding: 0 13px;
    margin-bottom: 28px;
  }
`

export const BehalfDiv = styled.div`
  position: fixed;
  bottom: -2px;
  left: calc(50vw - 126px);
  z-index: 99999;
  display: flex;
  background: #bd3348;
  padding: 10px 24px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  color: ${WHITE};
  font-size: 12px;
  align-items: center;
  box-shadow: 0px -1px 5px -1px #767676;
`

export const BehalfText = styled.div`
  font-family: Avenir;
  display: flex;
  color: ${WHITE};
  padding-right: 12px;
  border-right: 1px solid #d16767;
`

export const UserIcon = styled(Icon)`
  margin-right: 10px;
  margin-bottom: 2px;
`

export const UserDiv = styled.div`
  margin-left: 6px;
  font-family: Avenir;
  font-weight: bold;
`

export const LogoutIcon = styled(Icon)`
  margin-left: 12px;
  color: ${WHITE};
  margin-bottom: 2px;
  font-size: 13px;
  transition: all .25s;
  filter: drop-shadow(0px 0px 2px #494949);
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`