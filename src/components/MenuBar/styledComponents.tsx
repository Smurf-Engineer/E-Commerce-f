/**
 * Styled Components - Created by david on 07/02/18.
 */
import styled from 'styled-components'
import icon from 'antd/lib/icon'
import { RED } from '../../theme/colors'
import { AVENIR_MEDIUM } from '../../theme/fonts'

export const Container = styled.div`
  position: relative;
`

export const Row = styled.div`
  display: flex;
  padding: 10px 34px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TopRow = styled.div`
  display: flex;
  width: 16%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  @media (max-width: 1648px) {
    width: 26%;
  }
`

export const Icon = styled(icon)`
  color: ${RED};
  margin-right: 14px;
  padding-left: 8px;
  font-size: 15px;
`
export const TopText = styled.div`
  color: #5f6062;
  cursor: pointer;
  font-size: 14px;
  font-family: ${AVENIR_MEDIUM};
  @media (max-width: 991px) {
    align-items: center;
    display: flex;
    height: 40px;
    margin: 2px 0;
  }
`

export const BottomRow = styled.div`
  display: flex;
  background-color: #f6f6f6;
  padding: 16px 34px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #dcdcdc;
`

export const LogoIcon = styled.img`
  cursor: pointer;
`

export const CartIcon = styled.img`
  cursor: pointer;
`

export const SearchIcon = styled.img`
  cursor: pointer;
`

export const TeamStoresMenuContainer = styled.div`
  display: flex;
  text-align: left;
`

export const TeamStoresMenuTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  line-height: 25px;
  border-bottom: 4px solid #e61737;
  padding: 21px 0;
  &:hover {
    cursor: pointer;
  }
`
