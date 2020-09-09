/**
 * Styled Components - Created by david on 07/02/18.
 */
import styled from 'styled-components'

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
  @media (max-width: 1350px) {
    width: 26%;
  }
`

export const TopText = styled.div`
  color: #5f6062;
  cursor: pointer;
  font-size: 14px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const notificationStyles = { cursor: 'pointer' }