/**
 * Styled Components - Created by gustavomedina on 12/04/18.
 */
import styled from 'styled-components'
import { GREEN_TRANSPARENT } from '../../theme/colors'

export const Footer = styled.div`
  padding: 4px;
`

export const Type = styled.div`
  color: #5f6062;
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 220px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
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
  width: 220px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const Bottom = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Label = styled.div`
  user-select: none;
  color: #5f6062;
  padding: 4px 0px;
  font-size: 12px;
  line-height: 16px;
  text-align: left;
  width: 82px;
`

export const PriceLabel = styled.div`
  user-select: none;
  color: ${({ color }) => (color ? color : '#5f6062')};
  padding: 4px 0px;
  font-size: 12px;
  line-height: 16px;
  text-align: left;
  margin-left: 5px;
  font-weight: bold;
  width: 62px;
`

export const Price = styled.div`
  user-select: none;
  color: #5f6062;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
`

export const Delete = styled.div`
  color: #e61737;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
`

export const Private = styled.span`
  color: #8c8c8c;
  font-size: 12px;
  line-height: 16px;
`
export const BottomPrices = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const PricesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: right;
  justify-content: flex-end;
`

export const ProgressWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 10px;
  .ant-progress-bg {
    height: 25px !important;
    background-color: ${GREEN_TRANSPARENT};
    border-radius: 3px !important;
  }

  .ant-progress-outer {
    display: block;
    padding-right: 0;
  }

  .ant-progress-inner {
    border-radius: 3px !important;
  }

  .ant-progress-text {
    overflow: hidden;
    color: transparent;
    display: none;
  }
`

export const ProgressText = styled.div`
  font-size: 13px;
  font-weight: 600;
  position: absolute;
  z-index: 1;
  margin: auto;
  left: 0;
  right: 0;
  top: 6px;
  bottom: 0;
  text-align: center !important;
`
