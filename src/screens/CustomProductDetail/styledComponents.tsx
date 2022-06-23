/**
 * Styled Components - Created by jorge on 03/08/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import {
  WHITE,
  GREEN_BRIGHT,
  GRAY_DARK,
  GREEN_STATUS,
  GRAY_LIGHTEST,
  GRAY_STRONG,
  BLACK_BG,
  BLUE,
  GRAY_HEADER,
  GRAY,
  RED,
  GRAY_ANTDESIGN,
  BLACK
} from '../../theme/colors'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import BackTop from 'antd/lib/back-top'
import Icon from 'antd/lib/icon'

interface DivProps {
  isTeamStore?: boolean
  selected?: boolean
  disabled?: boolean
  secondary?: boolean
}

type SelectType = {
  selectWidth?: string
  highlightFields?: boolean
}

export const Container = styled.div`
  background-color: ${WHITE};
  max-width: 1452px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0px 5px 14px 8px #c7c7c7;
  @media (max-width: 700px) {
    user-select: none !important;
  }
`
export const Content = styled.div`
  display: flex;
  max-width: 1658px;
  margin: 0 auto;
  margin-bottom: 36px;
  @media (min-width: 320px) and (max-width: 572px) {
    display: block;
  }

  @media (min-width: 1440px) {
    justify-content: center;
  }
`
export const ImagePreview = styled.div`
  width: 50%;

  @media (min-width: 320px) and (max-width: 572px) {
    width: 100%;
    padding: 0;
  }

  @media (min-width: 573px) and (max-width: 984px) {
    width: 100%;
  }
`
export const ProductData = styled.div`
  padding: 18px;
  width: 50%;

  @media (min-width: 320px) and (max-width: 572px) {
    width: 100%;
  }
`

export const BackTopStyled = styled(BackTop)`
  &.ant-back-top {
    left: 30px !important;
    right: unset !important;
    bottom: 124px !important;
  }
`

export const BackButton = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  background: #ffffffcf;
  border-radius: 90px;
  padding: 10px;
  min-width: 83px;
  font-weight: bold;
  font-family: Avenir;
  box-shadow: 0px 1px 4px -1px grey;
`

export const BackIcon = styled(Icon)`
  font-size: 30px;
  margin-right: 8px;
`

export const ColorButtons = styled.div`
  display: flex;
  flex-flow: column;
  position: absolute;
  left: 25px;
  top: 20px;
  z-index: 3;
  animation: fade-in-left 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) 2s both;
  @keyframes fade-in-left {
    0% {
      transform: translateX(-7px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

export const ToneButton = styled.img`
  object-fit: contain;
  height: 27px;
  width: 27px;
  background: ${({ selected }: DivProps) => selected ? GRAY_LIGHTEST : WHITE};
  padding: 5px;
  margin-bottom: 8px;
  border-radius: 25px;
  box-shadow: ${({ selected }: DivProps) => selected ? 'unset' : `0px 2px 3px -1px ${GRAY_DARK}`};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`

export const RenderContainer = styled.div`
  position: relative;
  background: transparent;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  flex-flow: column;
  border-radius: 3px;
`
export const BannerMaterialSection = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  margin-top: 8px;
`

export const SizeChart = styled.img`
  max-width: 128px;
  width: 100%;
  object-fit: contain;
  margin: 0 0 30px 0;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    max-width: 100%;
    object-fit: contain;
    margin: 0 0 22px 0;
    padding-right: 22px;
    height: 54px;
    width: 100%;
  }
`

export const BannerMaterial = styled.img`
  max-width: 85px;
  object-fit: cover;
  max-height: 85px;
  margin-right: 8px;
  border-radius: 3px;
`
export const TitleName = styled.div`
  margin-right: 8px;
`

export const StyledInput = styled(Input)`
  position: absolute;
  top: 10px;
  max-width: 148px;
  left: 35px;
  z-index: 3;
`

export const HowItFits = styled.div`
  margin: 16px 0;
  margin-bottom: 16px;
  height: 34px;
  width: 154px;
  color: ${GRAY_STRONG};
  border: 1px solid ${GRAY_STRONG};
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  transition: all 0.2s ease;
  z-index: 2;
  background: transparent;
  cursor: pointer;
  &:hover {
    background: ${GRAY_STRONG};
    color: ${WHITE};
    font-weight: bold;
  }
`
export const Separator = styled.div`
  text-align: center;
  margin: 48px 10% 28px 10%;
  padding-bottom: 8px;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.93px;
  line-height: 18px;
`
export const SlideImage = styled.img`
  width: 100%;
`

export const SlideVideo = styled.video`
  width: 100%;
`

export const SlideImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`
export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`
export const TitleSubtitleContainer = styled.div``
export const Title = styled.div`
  color: #5f6062;
  font-size: 24px;
  font-weight: bold;
  line-height: 33px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 18px;
  }
`
export const Subtitle = styled.div`
  color: #5f6062;
  font-size: 14px;
  line-height: 19px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`
export const EditDesignButton = styled(Button)`
  border: 2px solid #e61737;
  border-radius: 2px;
  color: #e61737;
  height: 40px;
  width: 120.79px;
`

interface ProApprovedProps {
  proAssigned?: boolean
}

export const ProApproved = styled.div`
  background-color: ${({ proAssigned }: ProApprovedProps) =>
    proAssigned ? GREEN_BRIGHT : GRAY_DARK};
  color: ${WHITE};
  border-radius: 2px;
  height: 40px;
  width: 120.79px;
  display: flex;
  align-items: center;
`

export const ProApprovedLabel = styled.p`
  margin: 0;
  width: 100%;
  text-align: center;
`

export const PricesRow = styled.div`
  display: flex;
  margin-top: 20px;

  @media (min-width: 320px) and (max-width: 480px) {
    justify-content: ${({ isTeamStore }: DivProps) =>
    isTeamStore ? 'flex-start' : 'space-between'};
  }
`
export const AvailablePrices = styled.div`
  margin-right: 30px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-right: 12px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    margin-right: 20px;
  }
`
export const Description = styled.div`
  color: #5f6062;
  font-size: 16px;
  line-height: 23px;
`
export const AvailableLabel = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-style: italic;
  height: 22px;
  line-height: 22px;
  margin-top: 15px;
`
export const BuyNowOptions = styled.div`
  margin-bottom: 40px;
  margin-top: 15px;
  position: relative;
`

export const AssistanceDiv = styled.div`
  position: absolute;
  bottom: -4px;
  right: 8px;
  width: fit-content;
  padding: 8px 20px;
  text-align: center;
  font-size: 13px;
  background-color: #e6ffe5;
  border-radius: 5px;
  border: 1px solid #bfe5b8;
  @media (max-width: 1128px) {
    position: unset;
  }
  @media (max-width: 768px) {
    font-size: 10px;
    padding: 10px 18px;
  }
  @media (max-width: 740px) {
    justify-content: center;
    margin-top: 18px;
  }
  @media (max-width: 480px) {
    width: 100%;
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

export const SectionRow = styled.div`
  margin-bottom: 20px;
`
export const SectionTitleContainer = styled.div`
  display: flex;
`
export const SectionTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  height: 25px;
  line-height: 25px;
  margin-bottom: 15px;
`
export const SectionButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 320px) and (max-width: 768px) {
    justify-content: center;
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    flex-wrap: wrap;
  }
`

interface ButtonProps {
  selected: boolean
  large?: boolean
  range?: boolean
  highlight?: boolean
}

export const SectionButton = styled.div`
  align-content: center;
  background-color: ${({ selected }: ButtonProps) => selected ? BLACK_BG : WHITE};
  color: ${({ selected }: ButtonProps) => selected ? WHITE : 'rgba(0, 0, 0, 0.65)'};
  border: ${({ selected }: ButtonProps) =>
    selected ? `0.5px solid ${BLACK_BG}` : '0.5px solid #dcdcdc'};
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  display: flex;
  height: 50px;
  margin-right: 14px;
  padding: 14px;
  margin-bottom: ${({ range }: ButtonProps) => range ? '14px' : 'unset'};
  justify-content: center;
  width: ${({ large }: ButtonProps) => (large ? '139px;' : '55px;')};
  transition: all .25s;
  &:hover {
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 15px;
  }
  ${({ highlight }: ButtonProps) => highlight ? `
    animation: pulse 1s 0.5s 2;
    @keyframes pulse {
      0% {
        filter: drop-shadow(0 0 0 rgba(255, 0, 0, 1));
        transform: scale(1);
        background-color: #fff3f3 !important;
      }
    
      70% {
        filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0));
        transform: scale(1.05);
        background-color: #white !important;
      }
    
      100% {
        filter: drop-shadow(0 0 0 rgba(255, 0, 0, 0));
        transform: scale(1);
        background-color: #fff3f3 !important;
      }
    }
    background-color: #fff3f3 !important;
  ` : ''}
`
export const SizeRowTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const QuestionSpan = styled.span`
  color: #5f6062;
  font-size: 16px;
  margin-left: 5px;
  border: 0.5px solid #dcdcdc;
  padding: 10px;
  line-height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 25px;
  height: 25px;

  &:hover {
    cursor: pointer;
  }
`

export const RelatedProductsContainer = styled.div`
  margin-bottom: 80px;
  padding: 0px 32px;
`

export const ButtonsRow = styled.div`
  display: flex;
  margin: 30px 0 25px;

  .ant-btn {
    color: ${({ disabled }: DivProps) => disabled ? GRAY : WHITE} !important;
    border-color: ${({ disabled }: DivProps) => disabled ? GRAY_HEADER : BLUE} !important;
    background-color: ${({ disabled }: DivProps) => disabled ? GRAY_HEADER : BLUE} !important;
    font-size: 16px;
    border-radius: 3px;
    line-height: 22px;
    text-align: center;
    box-shadow: 1px 2px 5px 0px #b4b4b4;
    &:hover {
      cursor: ${({ disabled }: DivProps) => disabled ? 'not-allowed' : 'pointer'};
    }
  }
  &:hover {
    cursor: ${({ disabled }: DivProps) => disabled ? 'not-allowed' : 'pointer'};
  }
`

export const CartLabel = styled.div``

export const CartIcon = styled(Icon)`
  margin-right: 10px;
`

export const DetailsList = styled.ul`
  padding: 10px 0px 0px 20px;
`

export const DetailsListItem = styled.li`
  margin-bottom: 15px;
`

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
`

export const PrivateContainer = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  height: 80vh;
  justify-content: center;
`
export const PrivateTitle = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  height: 22px;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-bottom: 10px;
  margin-top: -25px;
  text-align: center;
  width: 100%;
`
export const PrivateSubtitle = styled.div`
  color: #5f6062;
  font-size: 16px;
  height: 23px;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-align: center;
  width: 100%;
`

export const layoutStyle = {
  background: GRAY_HEADER
}

export const InfoTag = styled.div`
  position: absolute;
  right: 0;
  top: 20px;
  height: 30px;
  padding: 3px 8px;
  background: ${GREEN_STATUS};
  font-family: 'Avenir Next';
  font-style: italic;
  font-weight: bold;
  font-size: 17px;

  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-right: 22px solid ${GREEN_STATUS};
    border-bottom: 30px solid transparent;
    margin-left: -30px;
    margin-top: -3px;
  }
`

export const ThreeDButton = styled.img`
  max-width: 54px;
  border-radius: 10px;
  padding: 8px;
  border: 1px solid #b1b1b1;
  margin-top: -12px;
  background: #b1b1b1;
  box-shadow: 0px 3px 6px -1px #424242;
  z-index: 2;
  right: 28px;
  position: absolute;
  bottom: 15px;
  transition: all .5s;
  -webkit-touch-callout: none !important;
  user-select: none !important;
  ${({ selected }: DivProps) => selected ? `
    background: #b1b1b1;
    box-shadow: 0px 3px 8px -2px black inset;
  ` : ''}
`

export const InfoMessage = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: -28px;
  background: #272727;
  vertical-align: middle;
`

export const FingerIcon = styled.img`
  max-width: 24px;
  vertical-align: middle;
  z-index: 2;
  background: #272727;
  margin-right: 8px;
`

export const UpgradesSection = styled.div``

export const UpgradesDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const UpgradeInput = styled.div`
  max-width: 168px;
  width: 100%;
  margin-right: 28px;
  margin-bottom: 20px;
  @media (max-width: 698px) {
    max-width: 158px;
    width: 100%;
    margin-right: 18px;
  }
`

export const UpgradeTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

export const StyledSelect = styled(Select)`
  width: 100%;
  & .ant-select-selection {
    border-color: ${({ highlightFields }: SelectType) =>
    highlightFields ? RED : GRAY_ANTDESIGN};
    transition: all .25s;
  }
  transition: all .25s;
  ${({ highlightFields }: SelectType) => highlightFields ? `
    .ant-select-selection {
      background: #fff3f3;
    }
    animation: pulse 1s 0.5s 2;
    @keyframes pulse {
      0% {
        filter: drop-shadow(0 0 0 rgba(255, 0, 0, 1));
        transform: scale(1);
        .ant-select-selection {
          background: #fff3f3 !important;
        }
      }
    
      70% {
        filter: drop-shadow(0 0 20px rgba(255, 0, 0, 0));
        transform: scale(1.05);
        .ant-select-selection {
          background: #white !important;
        }
      }
    
      100% {
        filter: drop-shadow(0 0 0 rgba(255, 0, 0, 0));
        transform: scale(1);
        .ant-select-selection {
          background: #fff3f3 !important;
        }
      }
    }
  ` : ''}
`

export const QuestionSpanUpgrade = styled.span`
  color: #5f6062;
  font-size: 14px;
  margin-left: 8px;
  border: 0.5px solid #dcdcdc;
  padding: 10px;
  line-height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 23px;
  height: 23px;

  &::after {
    content: '?';
  }
  &:hover {
    cursor: pointer;
  }
`

export const maskBlurred = {
  backdropFilter: 'blur(3px)'
}

export const buttonStyleModern = {
  background: '#3c3c3c',
  color: WHITE,
  borderColor: WHITE,
  boxShadow: 'none'
}

export const InfoBodyModern = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

export const InfoImage = styled.img`
  max-width: 75vw;
  border-radius: 5px;
  display: block;
  width: 100%;
  @media (max-width: 768px) {
    display: none;
  }
`

export const InfoImageMobile = styled.img`
  max-width: 886px;
  border-radius: 5px;
  width: 100%;
  display: none;
  margin-top: 0px;
  @media (max-width: 768px) {
    display: block;
  }
`

export const InfoURL = styled.a`
  color: ${BLUE};
`

export const QuantitySection = styled.div`
  margin-top: 4px;
`

export const QuantityDiv = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${GRAY_ANTDESIGN};
  width: fit-content;
  border-radius: 3px;
  font-size: 18px;
  input[type='number']::-webkit-inner-spin-button, 
  input[type='number']::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    margin: 0;
  }
`

export const MinusButton = styled.div`
  width: 26px;
  text-align: center;
  transition: all .25s;
  height: 24px;
  padding-top: 1px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    background: #f7f7f7;
  }
`

export const QuantityInput = styled.input`
  border: none;
  text-align: center;
  width: 33px;
  border-left: 1px solid ${GRAY_ANTDESIGN};
  border-right: 1px solid ${GRAY_ANTDESIGN};
  font-size: 15px;
  padding: 3px 0px;
  font-weight: bold;
  font-family: Avenir;
`

export const PlusButton = styled.div`
  width: 26px;
  text-align: center;
  transition: all .25s;
  height: 24px;
  padding-top: 1px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    background: #f7f7f7;
  }
`

export const VariablesSection = styled.div`
  margin-top: 4px;
`

export const VariablesInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const VariableInput = styled.div``

export const VariableTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

export const InputVariable = styled(Input)`
  max-width: 168px;
  width: 100%;
  margin-right: 28px;
  margin-bottom: 20px;
  @media (max-width: 698px) {
    max-width: 158px;
    width: 100%;
    margin-right: 18px;
  }
`

export const InfoBody = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-left: -38px;
`

export const InfoTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`

export const InfoDescription = styled.div`
  margin-top: 28px;
  center {
    font-size: 16px;
  }
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

export const CartIconBounce = styled.div`
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
  margin-top: 4px;
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