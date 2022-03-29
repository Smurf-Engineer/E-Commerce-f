/**
 * Styled Components - Created by david on 12/02/18.
 */
import Icon from 'antd/lib/icon'
import Popover from 'antd/lib/popover'
import styled from 'styled-components'
import { 
  GRAY_DARK, 
  GREEN_BRIGHT, 
  WHITE, 
  RED, 
  BLACK_LABEL, 
  GRAY_LIGHTEST, 
  BLACK_SHADOW, 
  GRAY, 
  BLUE_LIGHT 
} from '../../../theme/colors'

type StyledProps = {
  backgroundColor?: string
  selectProduct?: boolean
  isProDesign?: boolean
  showTooltips?: boolean
  selectedIndex?: number
  fromTop?: boolean
}

export const ImageContainer = styled.div`
  user-select: none;
  position: relative;
  cursor: pointer;
  ${({ backgroundColor }: StyledProps) =>
    backgroundColor ? `background-color: ${backgroundColor}` : ''};
  width: 100%;
  padding: ${({ backgroundColor, selectProduct }: StyledProps) => {
    if (selectProduct) {
      return '0'
    }
    return backgroundColor ? '10px' : '10px 0'
  }}
  text-align: center;
  border: ${({ backgroundColor }: StyledProps) =>
    backgroundColor ? `1px solid ${WHITE}` : 'none'};
  @media (min-width: 321px) and (max-width: 480px) {
    width: 100%;
  }
  @media only screen and (max-width: 320px) {
    height: 130px;
    width: 100%;
  }
`

export const DeleteButton = styled(Icon)`
  font-size: 16px;
  top: 5px;
  right: 5px;
  display: block;
  position: absolute;
  z-index: 9;
  transition: all .25s;
  padding: 6px;
  border-radius: 50%;
  &:hover {
    color: ${WHITE};
    background: ${RED};
  }
  @media (min-width: 320px) and (max-width: 767px) {
    filter: drop-shadow(0px 0px 2px black);
    color: ${WHITE};
  }
`

export const Page = styled.div`
  user-select: none;
  height: 200.29px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    height: 180px;
  }
`

export const Image = styled.img`
  object-fit: cover;
  user-select: none;
  height: 200.29px;
  width: 100%;

  @media (min-width: 321px) and (max-width: 480px) {
    height: 100%;
    width: 100%;
  }

  @media only screen and (max-width: 320px) {
    height: 115px;
    width: 100%;
    margin: 0;
  }
`

export const QuantityLabel = styled.div`
  position: absolute;
  right: 5px;
  top: 12px;
  color: ${WHITE};
`

export const ImageTop = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: space-between;
  padding: 4px 8px;
  width: 100%;
  cursor: pointer;
  @media (min-width: 320px) and (max-width: 480px) {
    width: ${({ selectProduct, isProDesign }: StyledProps) =>
    selectProduct || isProDesign ? `100%` : '100px'};
    &::after {
      content: "${({ selectedIndex }: StyledProps) => selectedIndex}";
      color: ${WHITE};
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background: ${RED};
      right: 5px;
      top: 5px;
      display: ${({ selectedIndex }: StyledProps) => selectedIndex ? 'flex' : 'none'};
      justify-content: center;
      align-items: center;
    }
  }
`
export const TopContainer = styled.div`
  user-select: none;
  height: 35.04px;
  width: 36px;
  background-color: #e61737;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ThumbnailImage = styled.img`
  width: 100%;
  max-width: 220px;
  height: ${({ fitContainer }: StyledProps) => (fitContainer ? '110px' : '212px')};
  object-fit: cover;
  border-radius: 3px;
  background: ${({ isProDesign }: StyledProps) => (isProDesign ? GRAY_LIGHTEST : 'unset')};
  ${({ fromTop }: StyledProps) => fromTop ? `
    max-width: 188px;
    height: 182px;
  ` : ''}
  @media (max-width: 767px) {
    max-width: ${({ isProDesign }: StyledProps) => (isProDesign ? '162px' : '220px')};
  }
`

export const ProStatus = styled.div`
  width: 70%;
  padding: 10px 0;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  background: ${BLACK_LABEL};
  border-radius: 3px;
  color: ${({ backgroundColor }: StyledProps) => backgroundColor || WHITE};
`

export const ProLabel = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  width: 100%;
  top: 40%;
`

export const TopText = styled.div`
  user-select: none;
  color: #ffffff;
  font-size: 8px;
  font-weight: 500;
  line-height: 11px;
  text-align: center;
  text-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
`

export const QuickView = styled.div`
  z-index: 1;
  filter: drop-shadow(0px 0px 1px white);
  transition: all 0.25s ease;
  &:hover {
    filter: drop-shadow(0px 0px 3px white);
  }
`

export const Arrows = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 110px;
  width: 100%;
  justify-content: space-between;
  padding: 0 5px;
`

export const Arrow = styled.img``

interface ButtonContainerProps {
  myLockerList?: boolean
  fromTop?: boolean
}

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  top: ${({ myLockerList }: ButtonContainerProps) =>
    myLockerList ? '70px' : '170px'};
  user-select: none;
  width: 100%;
  ${({ fromTop }: ButtonContainerProps) => fromTop ? `
    top: 140px;
  ` : ''}
`

export const CustomizeButton = styled.div`
  user-select: none;
  background-color: #e61737b3;
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 6px 16px;
`

interface ProApprovedProps {
  proAssigned?: boolean
}

export const ProApproved = styled.div`
  background-color: ${({ proAssigned }: ProApprovedProps) =>
    proAssigned ? GREEN_BRIGHT : GRAY_DARK};
  color: ${WHITE};
  padding: 5px;
  position: absolute;
  top: 5px;
  right: 5px;
`

export const CheckboxContainer = styled.div`
  @media (min-width: 320px) and (max-width: 480px) {
    display: ${({ selectedIndex }: StyledProps) =>
    selectedIndex ? 'none' : 'inline-block'};
  }
`

export const StatusFlag = styled.img`
  position: absolute;
  height: 50px;
  right: 5px;
  top: 5px;
  z-index: 8;
  ${({ showTooltips }: StyledProps) => showTooltips ? `
    animation: pulse 2s 2s infinite;
    @keyframes pulse {
      0% {
        transform: scale(0.95);
        filter: drop-shadow(0 0 0 rgba(255, 0, 0, 1));
      }
    
      70% {
        transform: scale(1);
        filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0));
      }
    
      100% {
        transform: scale(0.95);
        filter: drop-shadow(0 0 0 rgba(255, 0, 0, 0));
      }
    }
  ` : ''}
`

export const InfoIcon = styled.img`
  height: 28px;
  position: absolute;
  right: -9px;
  top: -13px;
  z-index: 9;
  filter: brightness(140%) saturate(200%) drop-shadow(0px 2px 2px ${GRAY_DARK});
  animation: wobble-hor-bottom 1s 1s 4 both;
  @keyframes wobble-hor-bottom {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-15px);}
    60% {transform: translateY(-7px);}
  }
`

export const StyledTooltip = styled(Popover)``

export const TooltipContent = styled.div`
  max-width: 398px;
`

export const TooltipContentModal = styled.div`
  max-width: 398px;
  margin-bottom: 12px;
  margin-left: -38px;
`

export const StatusIcon = styled.img`
  float: right;
  max-width: 78px;
  margin-left: 8px;
`

export const TooltipBody = styled.div`
  padding-top: 16px;
  padding-left: 8px;
  padding-right: 10px;
  @media (max-width: 767px) {
    padding-top: 30px;
    padding-left: 19px;
    padding-right: 17px;
  }
`

export const BackgroundLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${BLACK_SHADOW};
  width: 100vw;
  height: 100vh;
  z-index: -1;
`

export const buttonStyle = {
  boxShadow: 'none',
  border: 'none',
  background: 'none',
  color: RED
}

export const ScheduledDate = styled.div`
  width: fit-content;
  position: absolute;
  top: -10px;
  left: 8px;
  padding: 8px;
  background: ${WHITE};
  box-shadow: 0px 1px 3px 0px ${GRAY};
  border-radius: 6px;
  color: ${BLUE_LIGHT};
  font-weight: bold;
`

export const DateIcon = styled(Icon)`
  margin-right: 8px;
`