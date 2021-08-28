/**
 * Styled Components - Created by miguelcanobbio on 25/07/18.
 */
import Popover from 'antd/lib/popover'
import styled from 'styled-components'
import { GRAY_DARK, RED } from '../../../theme/colors'

interface StyledProps {
  showTooltips?: boolean
}

export const Container = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  position: relative;
  @media (min-width: 388px) and (max-width: 467px) {
    width: 180px;
  }

  @media (min-width: 320px) and (max-width: 387px) {
    width: 145px;
  }
`

export const Image = styled.img`
  width: 220px;
  height: 220px;
  object-fit: contain;
  background-color: #f1f4f5;

  @media (min-width: 388px) and (max-width: 467px) {
    width: 180px;
    height: 180px;
  }
  @media (min-width: 320px) and (max-width: 387px) {
    width: 145px;
    height: 145px;
  }
`

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`

export const Name = styled.div`
  color: #5f6062;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  margin-right: 4px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media (min-width: 320px) and (max-width: 467px) {
    font-size: 14px;
  }
`

export const Delete = styled.div`
  color: #e61737;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 23px;
  cursor: pointer;
`

export const LowQualityIcon = styled.img`
  position: absolute;
  width: 50px;
  right: 5px;
  top: 5px;
  z-index: 8;
  &:hover {
    cursor: pointer;
  }
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

export const buttonStyle = {
  boxShadow: 'none',
  border: 'none',
  background: 'none',
  color: RED
}