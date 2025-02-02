/**
 * Styled Components - Created by david on 12/02/18.
 */
import styled, { keyframes } from 'styled-components'
import Icon from 'antd/lib/icon'
import Spin from 'antd/lib/spin'
import { RED, TRANSPARENT, WHITE } from '../../theme/colors'

interface StyleProps {
  withBorder?: boolean
  withMargin?: boolean
  selectProduct?: boolean
  fromTop?: boolean
  isSelected?: boolean
  fitContainer?: boolean
}

export const Container = styled.section`
  margin: ${({ withMargin }: StyleProps) => (withMargin ? '0px 16px' : '0')};
  margin-bottom: ${({ selectProduct }: StyleProps) => (selectProduct ? '16px' : '0')};
  width: ${({ fitContainer }: StyleProps) => (fitContainer ? '100%' : '220px')};
  border: 3px solid;
  border-radius: 6px;
  border-color: ${({ isSelected }: StyleProps) => (isSelected ? RED : TRANSPARENT)};
  ${({ fromTop }: StyleProps) => fromTop ? `
    width: 188px;
    margin: 0 9px;
    margin-bottom: 9px;
  ` : ''}
  transition: all .45s;
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0 auto;
    width: auto;
  }
`

export const NotificationsBadge = styled.div`
  position: relative;
  z-index: 3;
  float: right;
  margin-top: -17px;
  top: 17px;
  background: ${RED};
  width: 19px;
  text-align: center;
  color: white;
  border-radius: 50%;
  font-size: 11px;
  height: 19px;
  align-items: center;
  display: flex;
  justify-content: center;
`

export const Text = styled.div`
  color: ${WHITE};
`
export const BuyNow = styled.div`
  font-size: 10px;
  border: 1px solid #51ce04;
  color: #51ce04;
  padding: 2px 4px;
  margin-left: 2px;
  letter-spacing: 1px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #51ce04;
    color: white;
  }
`

export const BuyLoader = styled(Spin)`
  align-items: center;
  justify-content: center;
  display: flex;
  margin-left: 16px;
  margin-top: 4px;
`

export const ImageContainer = styled.div`
  user-select: none;
  cursor: pointer;
  background-color: #f1f4f5;
  height: 214.13px;
  width: ${({ fitContainer }: StyleProps) => (fitContainer ? '100%' : '220px')};
  padding: 10px;
  text-align: center;
`

export const Image = styled.img`
  user-select: none;
  height: 200.29px;
  width: 180.44px;
`

export const ImageTop = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: space-between;
`
export const TopContainer = styled.div`
  height: 35.04px;
  width: 36px;
  background-color: #e61737;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TopText = styled.div`
  color: #ffffff;
  font-size: 8px;
  font-weight: 500;
  line-height: 11px;
  text-align: center;
  text-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
`

export const Footer = styled.div`
  padding: 4px;
`

export const QuickView = styled.img``

export const Type = styled.div`
  color: #5f6062;
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${({ fitContainer }: StyleProps) => (fitContainer ? '100%' : '212px')};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  ${({ fromTop }: StyleProps) => fromTop ? `
    width: 178px;
    font-size: 13px;
    font-family: Avenir;
  ` : ''}
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`
export const MenIcon = styled(Icon)`
  color: #2196f3;
`
export const WomenIcon = styled(Icon)`
  color: deeppink;
`

export const GendersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export const YouthLabel = styled.div`
  font-size: 8px;
  color: #549c8c;
  font-family: Avenir;
  font-weight: bold;
  margin-left: 3px;
  text-align: right;
  line-height: 1.5;
  max-width: 38px;
`

export const Description = styled.div`
  user-select: none;
  color: #8c8c8c;
  font-size: 12px;
  line-height: 16px;
  padding: 2px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${({ fitContainer }: StyleProps) => (fitContainer ? '100%' : '220px')};

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  user-select: none;

  @media (min-width: 320px) and (max-width: 425px) {
    flex-wrap: wrap;
  }
`

export const ProductName = styled.div``

export const Label = styled.div`
  color: #5f6062;
  display: flex;
  font-size: 12px;
  line-height: 16px;
  user-select: none;
  ${({ fromTop }: StyleProps) => fromTop ? `
    font-size: 10px;
  ` : ''}
`
export const ImgIcon = styled.img`
  height: 15px;
  margin-right: 5px;
  width: 15px;
  border-radius: 50%;
  ${({ withBorder }: StyleProps) => (withBorder ? 'border: 1px solid' : '')};
`
export const Price = styled.div`
  user-select: none;
  color: #5f6062;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  ${({ fromTop }: StyleProps) => fromTop ? `
    font-size: 11px;
  ` : ''}
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const Arrows = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 165px;
  width: 200px;
  justify-content: space-between;
  animation: ${fadeIn} 0.6s linear;
`

export const Arrow = styled.img`
  user-select: none;
`

export const RetailColors = styled.div`
  display: flex;
  align-items: center;
`
