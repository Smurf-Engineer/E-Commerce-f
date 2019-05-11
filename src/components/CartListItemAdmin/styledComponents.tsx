/**
 * Styled Components - Created by gustavomedina on 04/05/18.
 */
import styled from 'styled-components'
import { GREEN, GRAY_DARK, GRAY_LIGHTEST } from '../../theme/colors'

type StyleProps = {
  onlyRead?: boolean
}

export const Container = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  margin-bottom: 10px;
  width: 100%;

  @media (max-width: 640px) {
    flex-direction: column;
    margin-bottom: 40px;
  }
`

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 640px) {
    flex-direction: row;
  }
`

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

export const Image = styled.img`
  object-fit: cover;
  user-select: none;
  height: 200.29px;
  width: 180.44px;
  background-color: ${GRAY_LIGHTEST};
  ${({ onlyRead }: StyleProps) => (!onlyRead ? 'cursor: pointer' : '')};

  @media only screen and (max-width: 640px) {
    height: 129px;
    width: 46%;
    max-width: 196px;
    margin: 0;
    object-fit: cover;
  }
`

export const BottomDivider = styled.div`
  box-sizing: border-box;
  height: 1px;
  width: 100%;
  background-color: #dcdcdc;
  margin-right: 16px;
  margin-bottom: 30px;
`

export const DesignInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 16px;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
`

export const DesignInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-right: 45px;
`

export const DesignInfoTitle = styled.div``

export const DesignInfoSubtitle = styled.div`
  font-weight: 600;
`
