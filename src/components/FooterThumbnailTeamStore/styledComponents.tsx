/**
 * Styled Components - Created by gustavomedina on 12/04/18.
 */
import styled from 'styled-components'
import { BLUE } from '../../theme/colors'

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
  text-align: right;
`

export const PriceLabel = styled.div`
  user-select: none;
  color: #5f6062;
  padding: 4px 0px;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  margin-left: 5px;
  font-weight: bold;
`

export const BluePriceLabel = styled.div`
  user-select: none;
  color: ${BLUE};
  padding: 4px 0px;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  margin-left: 5px;
  font-weight: bold;
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
  flex-direction: row;
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
  .ant-progress-bg {
    height: 13px !important;
    background-color: #94d6fd;
  }

  .ant-progress-outer {
    display: block;
    padding-right: 0;
  }

  .ant-progress-text {
    overflow: hidden;
    color: transparent;
    display: none;
  }
`

export const ProgressText = styled.div`
  font-size: 10px;
  position: absolute;
  z-index: 1;
  margin-top: 6px;
  margin-left: 4px;
`
