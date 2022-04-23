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
  GRAY
} from '../../theme/colors'
import Input from 'antd/lib/input'
import BackTop from 'antd/lib/back-top'
import Icon from 'antd/lib/icon'

interface DivProps {
  isTeamStore?: boolean
  selected?: boolean
  disabled?: boolean
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
    left: 24px !important;
    right: unset !important;
    bottom: 68px !important;
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