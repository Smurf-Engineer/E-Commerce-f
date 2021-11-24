/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled, { keyframes } from 'styled-components'
import AntdProgress from 'antd/lib/progress'
import Spinner from 'antd/lib/spin'
import AntdIcon from 'antd/lib/icon'
import AntdButton from 'antd/lib/button'
import {
  RED,
  BLUE,
  WHITE,
  GREEN_BRIGHT,
  GRAY_LIGHT,
  GRAY_DARK,
  BLUE_DARK,
  BLACK_SHADOW,
  GRAY_LIGHTEST,
  WHITE_SMOKE
} from '../../../theme/colors'

export const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`

export const Container = styled.div`
  position: relative;
  width: 74.6%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    width: 65%;
  }

  @media only screen and (min-device-width: 1366px) and (max-device-width: 1366px) and (orientation: landscape) {
    width: 72%;
  }
`

export const MobileContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
`

export const CanvasContainer = styled.div`
  width: 388px;
  height: 388px;
  border-width: 1px;
  border-style: solid;
  border-color: #432021;
`
export const TutorialButton = styled.div`
  position: absolute;
  right: 0;
  bottom: 12%;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  flex-direction: column;
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
`

export const ClosePreview = styled(AntdIcon)`
  margin-left: -4px;
  display: flex;
  align-items: center;
  color: ${RED};
`

export const PrintPreviewLabel = styled.div`
  z-index: 11;
  max-width: ${({ hide }) => hide ? '124px' : 'calc(100% - 25px)'};
  width: 100%;
  right: -14px;
  position: absolute;
  top: 151px;
  display: flex;
  padding: 8px;
  background: ${WHITE};
  border-radius: 5px;
  border-top-right-radius: 0px
  border-bottom-right-radius: 0px
  box-shadow: 1px 1px 3px 0px #a7a7a7;
  transition: all .25s;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1024px) {
    top: ${({ hide }) => hide ? '211px' : '151px'};
    max-width: ${({ hide }) => hide ? '124px' : '100%'};
  }
  @media (max-width: 767px) {
    bottom: 12px;
    top: unset;
  }
`

export const LabelClick = styled.div`
  margin-top: -5px;
  margin-bottom: 5px;
`

export const BackgroundGray = styled.div`
  width: 100%;
  height: 100%;
  background: ${BLACK_SHADOW};
  position: fixed;
  top: 0;
  left: 200vw;
  z-index: 10;
  transition: all .25s;
  animation: fade-in 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

export const PrintPreviewIcon = styled.img`
  max-width: 86px;
`

export const PrintPreviewDiv = styled.div`
  display: inline-flex;
  margin-left: 98px;
  width: calc(100% - 105px);
  height: calc(100vh - 288px);
  top: -80px;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: white;
  border-radius: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  box-shadow: 1px 1px 3px 0px #a7a7a7;
  visibility: ${({ hide }) => hide ? 'hidden' : 'visible'};
  transition: all .25s;
  flex-flow: column;
  padding-top: 22px;
  @media (min-height: 1440px) {
    height: calc(100vh - 370px);
  }
  @media (max-width: 767px) {
    max-height: 228px;
    top: unset;
    bottom: 0px;
    border-bottom-left-radius: 0;
    justify-content: flex-start;
  }
`

export const PrintImage = styled.img`
  object-fit: contain;
  width: 100%;
  max-height: 100%;
  padding: 6px 8px;
`

export const LoadingSpinner = styled(Spinner)``

export const TutorialIcon = styled.img``

export const Render = styled.div`
  width: 100%;
  height: 100%;
  cursor: grab;
  overflow: hidden;
  @media (min-width: 768px) and (max-width: 1366px) and (orientation: landscape) {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 426px) {
    width: 100%;
    height: 100%;
  }
`

export const Model = styled.div`
  color: ${GRAY_DARK};
  user-select: none;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 18px;
  left: 26px;
`

export const QuickView = styled.img`
  cursor: pointer;
  margin-left: 8px;
`

export const Progress = styled(AntdProgress)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Button = styled(AntdButton)`
  height: 40px;
  width: 138px;
`
export const DragText = styled.div`
  color: ${GRAY_DARK};
  user-select: none;
  font-size: 14px;
  line-height: 23px;
  position: absolute;
  bottom: 16%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const ModelType = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  top: 18px;
  right: 26px;
`

export const ModelText = styled.div`
  color: ${GRAY_DARK};
  user-select: none;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  margin-right: 5px;
`

export const ViewButton = styled.img`
  cursor: pointer;
`

export const TopButton = styled.img`
  cursor: pointer;
  align-self: center;
  width: 15px;
  height: 15px;
  padding-bottom: 2px;
`

export const ViewControls = styled.div`
  position: absolute;
  top: 68px;
  right: 26px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1024px) {
    top: ${({ proAssistId }) => proAssistId ? '84px' : '128px'};
  }
`

export const BottomControls = styled.div`
  display: flex;
  width: 76px;
  justify-content: space-between;
  align-items: center;
`

export const LoadingContainer = styled.div`
  width: 74.6%;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 10px;

  .ant-btn-primary  {
    background-color: ${BLUE};
    border-color: ${BLUE};
    width: 138px;
  }
  .ant-btn-primary:hover {
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
  @media (max-width: 1024px) {
    flex-flow: column-reverse;
    top: 18px;
  }
`

export const MobileButtonWrapper = styled.div`
  position: absolute;
  bottom: 10%;
  width: 50%;
  .ant-btn-primary  {
    background-color: ${BLUE_DARK};
    border-color: ${BLUE_DARK};
  }
  .ant-btn-primary:hover {
    background-color: ${BLUE_DARK};
    border-color: ${BLUE_DARK};
  }
`

export const MobileButton = styled(AntdButton)`
  height: 40px;
  width: 100%;
`

export const ModalMessage = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`
export const MeasurementBox = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.5s cubic-bezier(0.67, 0.35, 0.565, 1) both;
  position: absolute;
  padding: 8px;
  top: 75px;
  left: 26px;
  border: 0.5px solid ${GRAY_LIGHT};
  border-radius: 2px;
  background-color: ${WHITE};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  min-width: 130px;
  text-align: center;
`

export const MeasurementLabel = styled.div`
  color: ${GRAY_DARK};
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const Measurement = styled.div`
  color: ${GRAY_DARK};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const HintModalImage = styled.img`
  width: 100%;
`
export const HintIcon = styled.img`
  height: 90%;
  position: absolute;
  left: 10px;
  top: 30px;
  cursor: pointer;
`

export const TurnOffHintRow = styled.div`
  display: flex;
  justify-content: center;
`

export const MobileHintIcon = styled.img`
  height: 20px;
  position: absolute;
  right: 10px;
  top: 62px;
  cursor: pointer;
`

export const DesignCheckButton = styled(AntdButton)`
  height: 40px;
  width: 138px;
  display: flex;
  align-items: center;
  margin-right: 10px;
  border: 1px solid ${GREEN_BRIGHT};
  border-radius: 2px;
  &:hover {
    border: 1px solid ${GREEN_BRIGHT};
    background: ${WHITE_SMOKE};
  }
  @media (max-width: 1024px) {
    margin-top: 12px;
  }
`

export const ProAssistText = styled.span`
  color: ${GREEN_BRIGHT};
`

export const Icon = styled.img`
  margin-right: 8px;
  width: 22px;
  margin-bottom: 2px;
`

export const Variants = styled.div`
  position: absolute;
  left: ${({ isMobile }) => (isMobile ? 'unset' : '0')};
  top: ${({ isMobile }) => (isMobile ? 'unset' : '70px')};
  bottom: ${({ isMobile }) => (isMobile ? '0' : 'unset')};
  right: ${({ isMobile }) => (isMobile ? '10px' : 'unset')};
  display: flex;
  flex-flow: column;
`

export const ModalLinkText = styled.div`
  position: absolute;
  top: 24px;
  color: ${BLUE};
  z-index: 8;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    color: ${RED};
  }
  @media (max-width: 768px) {
    top: unset;
    bottom: 24px;  
  }
`

export const InfoBody = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: -38px;
  text-align: center;
`

export const VariantButton = styled.img`
  width: 40px;
  object-fit: contain;
  max-height: 40px;
  border: 1px solid ${({ selected }) => (selected ? RED : GRAY_LIGHT)};
  border-radius: 3px;
  transition: all 0.25s;
  padding: 5px;
  margin-bottom: 8px;
  cursor: pointer;
  &:hover {
    background: ${GRAY_LIGHTEST};
  }
`

export const buttonStyle = {
  background: WHITE,
  color: BLUE,
  border: `1px solid ${BLUE}`
}
