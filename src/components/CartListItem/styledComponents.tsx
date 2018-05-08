/**
 * Styled Components - Created by gustavomedina on 04/05/18.
 */
import styled from 'styled-components'

export const Container = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  margin-bottom: 10px;
  width: 100%;
`

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const ItemDetailsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
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
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  text-transform: uppercase;
`

export const ItemDetailsHeaderNameDetail = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const ItemDetailsHeaderPrice = styled.div`
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
`

export const ItemDetailsHeaderPriceDetail = styled.div`
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 10px;
  letter-spacing: 0.13px;
  line-height: 14px;
  text-align: right;
`

export const ItemDetailsContent = styled.div``

export const Image = styled.img`
  user-select: none;
  height: 200.29px;
  width: 180.44px;
  background-color: #f1f4f5;

  @media (min-width: 321px) and (max-width: 480px) {
    height: 100%;
    width: 100%;
  }

  @media only screen and (max-width: 320px) {
    height: 120px;
    width: 100%;
    margin: 0;
  }
`

export const AddMore = styled.div`
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
  cursor: pointer;
  padding-right: 16px;
`

export const DeleteItem = styled.div`
  margin-top: 20px;
  color: #e61737;
  font-family: Avenir Next;
  font-size: 12px;
  letter-spacing: 0.09px;
  line-height: 16px;
  text-align: right;
  cursor: pointer;
  padding-right: 16px;
`

export const BottomDivider = styled.div`
  box-sizing: border-box;
  height: 2px;
  background-color: #dcdcdc;
  margin-right: 16px;
  margin-bottom: 30px;
`
