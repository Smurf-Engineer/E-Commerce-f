/**
 * Styled Components - Created by jorge on 23/07/18.
 */
import styled from 'styled-components'
import Icon from 'antd/lib/icon'
import Timeline from 'antd/lib/timeline'
import Steps from 'antd/lib/steps'
import TimelineItem from 'antd/lib/timeline/TimelineItem'

const { Step } = Steps

interface StyledProps {
  color?: string
}

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 35em;
`

export const Container = styled.div`
  margin-top: 16px;
  margin-bottom: -28px;
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
`

export const TimeLineItem = styled(TimelineItem)`
  margin-left: 3px;
  .ant-timeline-item-content {
    display: flex;
  }
`

export const DateLabel = styled.div`
  margin-right: 12px;
`

export const EventLabel = styled.div`
  font-weight: bold;
  font-family: Avenir;
`

export const LocationLabel = styled.div`
  margin-left: 12px;
  font-size: 12px;
  padding-top: 1px;
`

export const StepsStyled = styled(Steps)`
  position: absolute;
  top: 110px;
  width: 70%;
  transform: scale(0.8);
  @media (max-width: 768px) {
    position: unset;
    width: 100%;
    transform: unset;
    top: unset;
  }
`

export const StepStyled = styled(Step)``

export const StatusIcon = styled(Icon)``