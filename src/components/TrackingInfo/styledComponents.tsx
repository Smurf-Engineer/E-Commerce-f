/**
 * Styled Components - Created by jorge on 23/07/18.
 */
import styled from 'styled-components'
import Icon from 'antd/lib/icon'
import Timeline from 'antd/lib/timeline'
import Steps from 'antd/lib/steps'
import TimelineItem from 'antd/lib/timeline/TimelineItem'
import { GRAY_SOFT, RED, WHITE, WHITE_TRANSPARENT } from '../../theme/colors'

const { Step } = Steps

interface StyledProps {
  color?: string
  secondary?: boolean
}

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 35em;
`

export const Container = styled.div`
  margin-top: 16px;
  margin-bottom: 18px;
`

export const StyledDot = styled(Icon)`
  color: ${({ color }: StyledProps) => color || 'gray'};
`

export const Title = styled.div`
  font-weight: bold;
  font-family: Avenir;
  margin-bottom: 24px;
  font-size: 16px;
`

export const TimeLine = styled(Timeline)`
  max-height: ${({ secondary }: StyledProps) => secondary ? '146px' : 'auto'};
  overflow-y: scroll;
  padding-top: 3px;
  animation: fade-in-left 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
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

export const TimeLineItem = styled(TimelineItem)`
  margin-left: 3px;
  .ant-timeline-item-content {
    display: flex;
    align-items: center;
    min-height: unset !important;
  }
`

export const DateLabel = styled.div`
  font-size: 13px;
`

export const EventLabel = styled.div`
  font-weight: bold;
  font-family: Avenir;
`

export const LocationLabel = styled.div`
  margin-left: 12px;
  font-size: 13px;
`

export const StepsStyled = styled(Steps)`
  position: absolute;
  top: 110px;
  width: 70%;
  left: -30px;
  @media (max-width: 530px) {
    position: unset;
    width: 100%;
    transform: unset;
    top: unset;
    margin-bottom: 14px;
  }
  @media (max-width: 480px) {
    margin-top: -16px;
    margin-left: -35px;
    margin-bottom: 0px;
  }
  animation: fadeForSteps 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  @keyframes fadeForSteps {
    0% {
      transform: translateX(-12px) scale(0.8);
      opacity: 0;
    }
    100% {
      transform: translateX(0) scale(0.8);
      opacity: 1;
    }
  }
`

export const StepStyled = styled(Step)``

export const StatusIcon = styled(Icon)``

export const Description = styled.div`
  color: ${GRAY_SOFT};
  display: flex;
  margin-top: 2px;
  margin-left: 14px;
`

export const DateIcon = styled(Icon)`
  margin-right: 5px;
  font-size: 12px;
`

export const LocationIcon = styled(Icon)`
  margin-right: 5px;
  font-size: 12px;
  color: #e2cccc;
`

export const LoadingStep = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 115px;
  padding-top: 4px;
  opacity: 0.7;
  width: 70%;
  left: -30px;
  background: ${WHITE_TRANSPARENT};
  z-index: 9;
  @media (max-width: 768px) {
    position: unset;
    width: 100%;
    transform: unset;
    top: unset;
  }
`

export const ShowMoreButton = styled.div`
  margin-top: 12px;
  border: 1px solid ${RED};
  width: fit-content;
  padding: 4px 11px;
  border-radius: 2px;
  margin-bottom: -4px;
  font-size: 12px;
  color: ${RED};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    background: ${RED};
    color: ${WHITE};
  }
`