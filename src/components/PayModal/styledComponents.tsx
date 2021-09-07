/**
 * Styled Components - Created by miguelcanobbio on 23/05/18.
 */
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import SwipeableViews from 'react-swipeable-views'
import styled from 'styled-components'
import { BLACK_SHADOW, BLUE, GRAY_DARK, GRAY_LIGHT, WHITE } from '../../theme/colors'

interface DivProps {
  invoice?: boolean
  width?: string
  bold?: boolean
  savingPdf?: boolean
}

interface ButtonProps {
  selected?: boolean
}

interface StepProps {
  clickable?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-flow: column;
`

export const ContainerMethods = styled.div`
  display: flex;
  /* justify-content: space-between; TODO: uncomment when left payment methods*/
`

export const MethodButton = styled(Button)`
  background-color: ${WHITE};
  border: 2px solid ${GRAY_LIGHT};
  border-radius: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  color: ${({ selected }: ButtonProps) => (selected ? BLUE : GRAY_LIGHT)};
  height: 40px;
  margin-left: 5px;
  width: 138.23px;

  &:hover,
  &::selection,
  &::after,
  &:focus {
    border-color: ${BLUE};
    color: ${BLUE};
  }

  border: 0.5px solid
    ${({ selected }: ButtonProps) => (selected ? BLUE : GRAY_LIGHT)};
`

export const StepWrapper = styled.div`
  margin: 0 auto;
  max-width: 528px;
  width: 100%;
  margin-top: 13px;
  margin-bottom: 28px;
  transform: scale(0.8);
  .ant-steps-item {
    display: flex;
    align-items: center;
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background: ${BLUE};
  }
  .ant-steps-item-process .ant-steps-item-icon {
    border-color: ${BLUE};
  }
  .ant-steps-item-wait .ant-steps-item-icon {
    border-color: ${BLACK_SHADOW};
    background-color: ${WHITE};
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: ${BLUE};
    background-color: ${WHITE};
  }

  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: ${BLUE};
  }
  .ant-steps-item-finish
    > .ant-steps-item-content
    > .ant-steps-item-title:after {
    background-color: ${BLUE};
  }

  @media (max-width: 480px) {
    .ant-steps-horizontal.ant-steps-label-horizontal {
      display: flex;
    }
    .ant-steps-horizontal.ant-steps-label-horizontal .ant-steps-item-title {
      font-size: 12px;
    }
    .ant-steps-horizontal.ant-steps-label-horizontal .ant-steps-item-icon {
      margin-right: 5px;
    }
  }
`

export const StepIcon = styled.div`
  background-color: ${({ clickable }: StepProps) =>
    !clickable ? '#4a90e2' : '#fff'};
  color: #fff;
  width: 32px;
  border-radius: 50%;
  font-size: 16px;
  cursor: ${({ clickable }: StepProps) => (clickable ? 'pointer' : 'default')};
`

export const CheckIcon = styled(Icon)`
  color: #4a90e2;
  font-size: 27px;
`

export const CloseIcon = styled(Icon)`
  position: absolute;
  right: 28px;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
`

export const PaymentDiv = styled.div``

export const PayForm = styled.div``

export const SummaryContainer = styled.div``

export const StyledSwipeableViews = styled(SwipeableViews)``

export const SelectPayment = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 16px;
`

export const ItemList = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  margin-bottom: 22px;
  box-shadow: 1px 2px 6px -2px grey;
  padding: 13px 18px;
  border-radius: 5px;
`

export const HeadersDiv = styled.div`
  display: flex;
  padding-bottom: 12px;
  border-bottom: 1px solid ${GRAY_LIGHT};
`

export const ItemColumn = styled.div`
  max-width: ${({ width }: DivProps) => width || '180px'};
  width: 100%;
  font-size: 12px;
  font-weight: ${({ bold }: DivProps) => bold ? 'bold' : 'unset'};
  &:last-child {
    text-align: right;
  }
`

export const ItemRow = styled.div`
  display: flex;
  margin: 12px 0;
`

export const StyledIcon = styled(Icon)`
  width: 28px;
  margin-right: 12px;
  padding-right: 1px;
  border: 1px solid ${BLUE};
  color: ${BLUE};
  border-radius: 50%;
  text-align: center;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const HeaderImages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 22px;
  margin-top: 12px;
`

export const JakrooImage = styled.img``

export const PayAnimation = styled.img`
  max-width: 36px;
  margin-right: -17px;
  margin-left: 25px;
  filter: saturate(0.75);
`

export const okButtonStyles = {
  background: BLUE,
  border: 'none',
  borderRadius: '2px'
}