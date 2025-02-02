/**
 * Styled Components - Created by cazarez on 10/04/18.
 */
import styled from 'styled-components'
import { WHITE } from '../DesignerTool/constants'
import { GRAY_DARK } from '../../theme/colors'

export const Container = styled.div``
export const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const SearchBarContent = styled.div`
  position: absolute;
  align-self: center;
  display: inline-flex;
  flex-flow: column;
  max-width: 942px;
  width: 100%;
  @media (max-width: 1440px) {
    max-width: 498px;
    padding: 0 16px;
  }
`

export const Text = styled.div`
  color: ${WHITE};
`

export const SearchBackground = styled.img`
  max-height: 512px;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: 50% 20%;
  filter: brightness(0.6);
  @media (max-width: 425px) {
    width: unset;
    max-width: 100%;
    max-height: 368px;
  }
`

export const TeamStoreText = styled.div`
  color: ${WHITE};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
  padding: 0 8px;
  @media (max-width: 425px) {
    font-size: 14px;
  }
`
export const SearchContainer = styled.div`
  position: absolute;
`

export const ResultContainer = styled.div`
  padding: 44px 30px 90px 30px;
  background-color: #fff;

  @media (max-width: 480px) {
    padding: 44px 10px 90px 10px;
  }
`
export const PaginationRow = styled.div``
export const TitleContainer = styled.div``
export const Title = styled.div`
  height: 33px;
  text-align: center;
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: bold;
  line-height: 33px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 20px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }
`

export const GetSponsored = styled.div`
  height: 16px;
  text-align: center;
  color: #e61737;
  font-size: 12px;
  line-height: 16px;
`

export const TeamTitle = styled.div`
  padding: 28px;
  background: ${WHITE};
`

export const TitleText = styled.div`
  text-align: center;
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: bold;
`

export const PaySection = styled.div`
  padding: 32px 0;
`

export const PayIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
`

export const Icon = styled.img`
  max-width: 85px;
  object-fit: contain;
  height: 28px;
  margin-right: 13px;
  @media (max-width: 480px) {
    object-fit: contain;
    height: 14px;
    margin-right: 4px;
  }
`