/**
 * Styled Components - Created by eduardoquintero on 13/05/19.
 */
import styled from 'styled-components'
import { GREEN, GRAY_DARK } from '../../../theme/colors'

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ItemDetailsHeaderName = styled.div`
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  text-transform: uppercase;
`

export const ItemDetailsHeaderNameDetail = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const ItemDetailsHeaderPrice = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;

  @media (max-width: 640px) {
    text-align: left;
  }
`

interface ItemDetailsHeaderProps {
  highlighted?: boolean
}

export const ItemDetailsHeaderPriceDetail = styled.div`
  color: ${({ highlighted }: ItemDetailsHeaderProps) =>
    highlighted ? GREEN : GRAY_DARK};
  font-size: 12px;
  letter-spacing: 0.13px;
  line-height: 14px;
  text-align: right;

  @media (max-width: 640px) {
    text-align: left;
  }
`

export const HeaderPriceDetailEmpty = styled.div`
  height: 14px;
`

export const ItemDetailsContent = styled.div``

export const ItemDetailsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    justify-content: space-around;
  }
`
