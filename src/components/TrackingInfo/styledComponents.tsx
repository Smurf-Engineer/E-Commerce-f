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
  active?: boolean
}

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 35em;
`

export const Container = styled.div`
  margin-top: 12px;
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
  top: 34px;
  width: 95%;
  left: -9%;
  @media (max-width: 930px) {
    width: 112%;
    top: 34px;
    left: -8%;
  }
  @media (max-width: 530px) {
    flex-wrap: wrap;
    display: flex !important;
    top: 34px;
    width: 120%;
    justify-content: space-around;
    left: -56px;
    .ant-steps-item {
      flex: unset;
    }
    .ant-steps-item-tail {
      display: none !important;
    }
  }
  @media (max-width: 480px) {
    left: -34px;
    flex-wrap: nowrap;
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

export const StepStyled = styled(Step)`
  .ant-steps-item-title {
    margin-top: 4px;
    margin-left: 4px;
  }
  @media (max-width: 698px) {
    &.ant-steps-item {
      display: inline-flex !important;
      flex-flow: column !important;
    }
    .ant-steps-item-content {
      text-align: center;
    }
    .ant-steps-item-title {
      padding-right: 0px;
      margin-left: 0px;
    }
    .ant-steps-item-title:after {
      top: -24px;
    }
  }
  @media (max-width: 480px) {
    &.ant-steps-item {
      margin-right: 5px !important;
    }
    .ant-steps-item-title {
      font-size: 14px;
    }
  }
`

export const StatusIcon = styled(Icon)`
  color: ${WHITE};
  padding: 8px;
  border-radius: 35px;
  background: ${({ active }: StyledProps) => active ? '#47596a' : '#d8d6d6'};
`

export const StatusImage = styled.img`
  max-width: 43px;
  height: 43px
  margin-bottom: 6px;
  padding: 8px;
  border-radius: 35px;
  background: ${({ active }: StyledProps) => active ? '#47596a' : '#d8d6d6'};
  @media (max-width: 698px) {
    margin-bottom: -3px;
  }
  @media (max-width: 480px) {
    margin-left: 10px;
  }
`

export const StatusImageCheck = styled.img`
  width: 43px;
  height: 43px;
  margin-bottom: 6px;
  padding: 8px;
  border-radius: 35px;
  background: ${({ active }: StyledProps) => active ? '#47596a' : '#d8d6d6'};
  @media (max-width: 698px) {
    margin-bottom: -3px;
  }
  @media (max-width: 480px) {
    margin-left: 10px;
  }
`

export const StatusImagePackage = styled.img`
  width: 43px;
  height: 43px;
  margin-bottom: 6px;
  padding: 8px;
  border-radius: 35px;
  background: ${({ active }: StyledProps) => active ? '#47596a' : '#d8d6d6'};
  @media (max-width: 698px) {
    margin-bottom: -3px;
  }
  @media (max-width: 480px) {
    margin-left: 10px;
  }
`

export const StatusImageDelivery = styled.img`
  width: 43px;
  height: 43px;
  margin-bottom: 6px;
  padding: 8px;
  border-radius: 35px;
  filter: ${({ active }: StyledProps) => active ? 'brightness(1.2)' : 'unset'};
  background: ${({ active }: StyledProps) => active ? '#47596a' : '#d8d6d6'};
  @media (max-width: 698px) {
    margin-bottom: -3px;
  }
  @media (max-width: 480px) {
    margin-left: 10px;
  }
`

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
  @media (max-width: 930px) {
    left: 0px;
    height: 50px;
    top: 120px;
    width: 100%;
  }
`

export const ShowMoreButton = styled.div`
  margin-top: ${({ secondary }: StyledProps) => secondary ? '-4px' : '12px'};
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