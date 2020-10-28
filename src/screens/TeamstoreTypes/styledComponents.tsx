/**
 * Styled Components - Created by eduardoquintero on 18/02/20.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Spin from 'antd/lib/spin'
import {
  BLACK,
  WHITE,
  GRAY_LIGHTEST,
  GRAY_LIGHT,
  RED,
  GRAY_SKELETON
} from '../../theme/colors'

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: 50px;
  flex-direction: column;
  background: ${WHITE};
`

export const StyledSpin = styled(Spin)`
  position: fixed !important;
  width: 100%;
`

export const LoadingContainer = styled.div`
  width: 100%;
  align-items: center;
  padding-top: 48px;
  justify-content: center;
  padding-bottom: 50px;
  display: flex;
  align-items: center;
`

export const ImageSkeleton = styled.div`
  width: 380px;
  min-height: 608px;
  margin-top: 24px;
  opacity: 0.6;
  margin-bottom: 18px;
  border: 1px solid ${GRAY_LIGHT};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  background: ${GRAY_SKELETON};
  &:last-child {
    margin-left: 30px;
  }
  @media (min-width: 320px) and (max-width: 748px) {
    &:last-child {
      margin-left: 0px;
      margin-top: 32px;
    }
  }
`

export const Title = styled.p`
  margin: 40px 0;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  text-align: center;

  @media (min-width: 320px) and (max-width: 748px) {
    margin: 40px 20px;
  }
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${WHITE};
  min-height: 608px;
  width: 380px;
  transition: all 0.25s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 3px 11px 1px rgba(0, 0, 0, 0.15);
  }
  &:last-child {
    margin-left: 30px;
  }
  @media (min-width: 320px) and (max-width: 748px) {
    &:last-child {
      margin-left: 0px;
      margin-top: 32px;
    }
  }
  border: 1px solid ${GRAY_LIGHT};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  position: relative;
`

export const CardTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  color: ${BLACK};
  background: ${GRAY_LIGHTEST};
  text-align: center;
  padding: 10px;
`

export const TeamStoreCardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 320px) and (max-width: 748px) {
    flex-flow: column;
  }
`

export const List = styled.ul`
  padding: 0;
  margin: 0 28px;
  list-style: none;
  text-align: center;
`

export const Item = styled.li`
  margin-bottom: 10px;
`

export const PaymentIcons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  margin: 0 30px;
  height: 40px;
`

export const Icon = styled.img`
  width: 100%;
  max-width: 90px;
  margin-right: 16px;
`

export const SelectTeamStoreButton = styled(Button)`
  height: 40px;
  border: 2px solid ${RED};
  border-radius: 2px;
  background-color: ${WHITE};
  color: ${RED};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
  width: 200px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom 40px;
`

export const TeamBanner = styled.img`
  max-width: 220px;
  width: 100%;
  margin-bottom: 4px;
`

export const TeamImage = styled.img`
  width: 100%;
  object-fit: cover;
  margin-bottom: 24px;
  height: 200px;
  object-position: 0 20%;
`

export const PaymentMethodsText = styled.div`
  padding-inline-start: 30px;
  margin-bottom: 10px;
`
