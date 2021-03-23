/**
 * Styled Components - Created by cazarez on 08/02/18.
 */
import styled from 'styled-components'
import Row from 'antd/lib/row'
import Divider from 'antd/lib/divider'
import arrowRightIcon from '../../assets/arrow.svg'

export const Container = styled.div`
  background-color: #222;

  .cont {
    width: auto;

    @media (min-width: 800px) {
      width: 800px;
    }
  }
`

export const Title = styled.div`
  height: 33px;
  width: 281px;
  color: #5f6062;
  font-size: 24px;
  font-weight: bold;
  line-height: 33px;
  margin-top: 15px;
`

export const Text = styled.div`
  color: #fff;
`

export const CloseIcon = styled.img`
  position: absolute;
  right: 20px;
  &:hover {
    cursor: pointer;
  }
`

export const StyledRow = styled(Row)`
  margin-top: 30px;
  display: inline-flex;
  flex-flow: row;
  @media (max-width: 654px) {
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`

export const PriceQuantityRow = styled(Row)`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
`
export const AvailablePrices = styled.div`
  width: 25%;
  @media (max-width: 654px) {
    margin-right: 12px;
  }
`

export const ProductInfContainer = styled.div`
  width: 329px;
  margin-bottom: 10px;
`
export const ProductInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 22px;
  width: auto;
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`
export const DescriptionContent = styled.div`
  width: 329px;
  color: #5f6062;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 0px;
  transition: visibility 0s, opacity 0.5s linear;
`

export const DetailsContent = styled.div`
  width: 329px;
  color: #5f6062;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 0px;
  transition: visibility 0s, opacity 0.5s linear;
`

export const UpDownArrow = styled.img`
  &:hover {
    cursor: pointer;
  }
`

export const ArrowRight = styled.div`
  content: url(${arrowRightIcon});
  margin-left: 5px;
`

export const FullDetails = styled.div`
  display: flex;
  justify-content: center;
  right: 20px;
  bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`

export const ColDiv = styled.div`
  display: block;
  box-sizing: border-box;
  width: 50%;
  @media (max-width: 654px) {
    width: 100%;
  }
`

export const DetailsList = styled.ul`
  padding: 10px 0px 0px 20px;
`

export const DetailsListItem = styled.li`
  margin-bottom: 15px;
`
export const StyledDivider = styled(Divider)`
  margin: 10px 0;
  border-bottom: 1px solid #bebebe;
`
export const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding: 180px;
`
