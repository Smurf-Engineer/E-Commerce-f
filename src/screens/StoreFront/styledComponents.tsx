/**
 * Styled Components - Created by gustavomedina on 11/04/18.
 */
import styled from 'styled-components'
import Slider from 'antd/lib/slider'
import AntdButton from 'antd/lib/button'
import { BLACK, GRAY_LIGHT, WHITE, WHITE_SMOKE } from '../../theme/colors'
import Icon from 'antd/lib/icon'

interface DivProps {
  secondary?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${WHITE};
  @media (min-width: 1452px) {
    border-top: 1px solid ${GRAY_LIGHT};
    margin-top: 10px;
    background: ${WHITE_SMOKE};
  }
`

export const HeadersContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const SideBar = styled.div`
  width: 30%;
  padding-top: 36px;
  padding-right: 32px;
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  text-transform: uppercase;
  padding-right: 10px;
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
`

export const AboutContainer = styled.div`
  padding: 30px;
`

export const TierContainer = styled.div`
  padding-top: 40px;
`

export const OrderTitle = styled.div`
  color: #5f6062;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 19px;
  text-align: right;
`

export const Content = styled.div`
  width: 70%;
  padding-top: 36px;
  padding-left: 36px;
`

export const PriceTitle = styled.div`
  padding-top: 27px;
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const PriceDescription = styled.div`
  padding-top: 10px;
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const TierTitle = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-align: center;
`

export const TierDescription = styled.div`
  padding-top: 5px;
  color: #5f6062;
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
  text-align: center;
`

export const Text = styled.div`
  color: #fff;
`

export const StyledSlider = styled(Slider)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
`

export const ButtonWrapper = styled.div`
  margin-bottom: 10px;
  padding-right: 10px;
  .ant-btn-primary {
    background-color: #4a90e2;
    border-color: #4a90e2;
    width: 70px;
  }
  .ant-btn-primary:hover {
    background-color: #4a90e2;
    border-color: #4a90e2;
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
  height: 30%;
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
  width: 81px;
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
  width: 100%;
  height: 20px;
  color: #ffffff;
  background-color: #e61737;
  text-transform: uppercase;
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
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: row wrap;
  padding-top: 20px;
  align-items: right;
  justify-content: flex-end;
`

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: row wrap;
`

export const CalendarContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
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
`

export const AnimatedDiv = styled.div`
  position: fixed;
  bottom: 24px;
  left: 30px;
  z-index: 3;
`

export const BounceDiv = styled.div`
  ${({ secondary }: DivProps) => secondary ? `
  animation: wobble-hor-bottom 0.8s 0s 2 both;
  @keyframes wobble-hor-bottom {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-15px);
    }
    60% {
      transform: translateY(-7px);
      filter: grayscale(0.7);
    }
  }
  ` : ''}
`

export const CartIcon = styled.div`
  background: ${WHITE};
  border-radius: 50%;
  width: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 68px;
  box-shadow: 0px 1px 9px -2px #6e6e6e;
  transition: all .25s;
  .ant-badge-count {
    transform: translateX(30%);
  }
  animation: fade-in-leftDesuZ 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) 1s both;
  @keyframes fade-in-leftDesuZ {
    0% {
      transform: translateX(-30px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  &:hover {
    cursor: pointer;
    filter: opacity(0.7);
  }
`

export const ShoppingCartIcon = styled(Icon)`
  font-size: 32px;
  color: ${BLACK};
`

export const CartDiv = styled.div`
  position: fixed;
  background: white;
  height: 100vh;
  max-width: 428px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  box-shadow: 1px 0px 14px 4px #b8b8b8;
  animation: slide-in-left 0.35s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  @keyframes slide-in-left {
    0% {
      transform: translateX(-450px);
    }
    100% {
      transform: translateX(0);
    }
  }

`

export const CartTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 22px 26px;
  background: #202020;
  color: ${WHITE};
`

export const CartTitleLabel = styled.div`
  display: flex;
  align-items: center;
`

export const CloseIcon = styled(Icon)`
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

export const CartIconMini = styled(Icon)`
  font-size: 18px;
  margin-right: 12px;
  margin-top: -3px;
  color: #fff7da;
`

export const CartList = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 30px;
  overflow-y: scroll;
  height: calc(100% - 146px);
`

export const CartItemDiv = styled.div`
  display: flex;
  margin-bottom: 18px;
  margin-left: 8px;
  margin-right: 8px;
`

export const CartThumbnail = styled.img`
  max-width: 128px;
  width: 100%;
  object-fit: cover;
  height: 122px;
`

export const CartInfo = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
  margin-top: 10px;
  margin-left: 10px;
  flex: 1;
  padding-right: 54px;
`

export const DesignName = styled.div`
  font-weight: bold;
  font-size: 16px;
  font-family: Avenir;
`

export const DesignCode = styled.div`
  margin-top: 4px;
`

export const ProductName = styled.div`
  font-size: 12px;
  margin-top: 4px;
`

export const Quantity = styled.div`
  position: absolute;
  right: 13px;
  top: calc(50% - 5px);
  background: #202020;
  height: 22px;
  border-radius: 50px;
  color: white;
  font-size: 10px;
  width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DeleteIcon = styled(Icon)`
  position: absolute;
  right: 13px;
  top: 1px;
  height: 22px;
  border-radius: 50px;
  color: #202020;
  font-size: 10px;
  width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
    border: 1px solid gray;
  }
`

export const CartButtonOpen = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 90%;
  background: #202020;
  color: white;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 11px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

export const GenderName = styled.div`
  font-size: 12px;
  margin-top: 6px;
`

export const SizeName = styled.div`
  font-size: 12px;
  margin-top: 2px;
`

export const UpgradeName = styled.div`
  font-size: 12px;
  margin-top: 2px;
`

export const UpgradeValue = styled.div`
  font-family: Avenir;
  font-weight: bold;
  display: inline-block;
  margin-left: 4px;
`