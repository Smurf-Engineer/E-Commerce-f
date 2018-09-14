/**
 * Styled Components - Created by cazarez on 12/03/18.
 */
import styled from 'styled-components'
import Breadcrumb from 'antd/lib/breadcrumb'
import Button from 'antd/lib/button'
import InputNumber from 'antd/lib/input-number'
import { RED, BLACK } from '../../theme/colors'

interface StyledProps {
  selected?: boolean
  withBorder?: boolean
}

export const Container = styled.div`
  background-color: #fff;
`

export const Content = styled.div`
  display: flex;
  padding: 0px 32px 50px 32px;

  @media (min-width: 320px) and (max-width: 480px) {
    display: block;
    padding: 0px 12px 50px 12px;
  }

  @media (min-width: 1440px) {
    justify-content: center;
  }
`

export const ImagePreview = styled.div`
  width: 50%;
  padding: 70px 50px 0px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    padding: 0;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    padding: 0 20px 0 0;
    width: 100%;
  }

  @media (min-width: 1440px) {
    max-width: 1000px;
  }
`

export const ProductData = styled.div`
  padding-top: 70px;
  width: 50%;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`
export const Title = styled.div`
  color: #5f6062;
  font-size: 24px;
  font-weight: bold;
  line-height: 33px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 18px;
  }
`

export const Subtitle = styled.div`
  color: #5f6062;
  font-size: 14px;
  line-height: 19px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`

export const TitleSubtitleContainer = styled.div``

export const StyledLink = styled.a`
  @media (min-width: 320px) and (max-width: 480px) {
    align-self: center;
  }
`

export const StyledBreadCrumb = styled(Breadcrumb)`
  border: 1px solid #dcdcdc;
  padding: 10px 0 10px 49px;
  background-color: #fff;
`

export const StyledInputNumber = styled(InputNumber)`
  border-radius: 0px;
  height: 40px;
  width: 138px;
  border: 1px solid #bebebe;
`

export const AvailablePrices = styled.div`
  margin-right: 30px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    margin-right: 20px;
  }
`

export const PricesRow = styled.div`
  display: flex;
  margin-top: 20px;

  @media (min-width: 320px) and (max-width: 480px) {
    justify-content: space-between;
  }
`

export const Description = styled.div`
  color: #5f6062;
  font-size: 16px;
  line-height: 23px;
`

export const ButtonsRow = styled.div`
  display: flex;
  margin: 20px 0 25px;

  .ant-btn {
    color: #e61737;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }
`

export const StyledButton = styled(Button)`
  height: 50px;
  width: 221px;
  border: 2px solid #e61737;
  border-radius: 2px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`
export const CompareButton = styled(Button)`
  border: 2px solid #e61737;
  border-radius: 2px;
  color: #e61737;
  height: 40px;
  width: 120.79px;
`

export const BuyNowOptions = styled.div`
  margin-bottom: 40px;
`

export const GenderRow = styled.div`
  display: flex;
  margin-bottom: 20px;
`
export const SectionTitle = styled.div`
  height: 25px;
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  margin-bottom: 15px;
`
export const SectionTitleContainer = styled.div`
  display: flex;
`

interface ButtonProps {
  selected: boolean
  large?: boolean
}

export const SectionButton = styled.div`
  align-content: center;
  background-color: #ffffff;
  border: ${({ selected }: ButtonProps) =>
    selected ? '2px solid #e61737' : '0.5px solid #dcdcdc'};
  border-radius: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  display: flex;
  height: 50px;
  margin-right: 14px;
  padding: 14px;
  justify-content: center;
  width: ${({ large }: ButtonProps) => (large ? '139px;' : '55px;')};

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 15px;
  }
`

export const SectionRow = styled.div`
  margin-bottom: 20px;
`
export const SectionButtonsContainer = styled.div`
  display: flex;
  @media (min-width: 320px) and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    flex-wrap: wrap;
  }
`
export const SizeRowTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const GetFittedLabel = styled.div`
  height: 22px;
  color: #e61737;
  font-size: 16px;
  line-height: 22px;
  &:hover {
    cursor: pointer;
  }
`

export const QuestionSpan = styled.span`
  margin-left: 5px;
  height: 23px;
  width: 8.06px;
  color: #5f6062;
  font-size: 16px;
  line-height: 23px;
  &:hover {
    cursor: pointer;
  }
`
export const AddToCartRow = styled.div`
  display: flex;
`

export const AddToCartButton = styled(Button)`
  height: 40px;
  width: 138.23px;
  border-radius: 2px;
  background-color: #4a90e2;
  color: #fff;
  margin-left: 26px;

  &:hover {
    background-color: #4a90e2;
    color: #fff;
    border-color: #4a90e2;
  }
`
export const RelatedProductsContainer = styled.div`
  margin-bottom: 80px;
  padding: 0px 32px;
`
export const ReviewsHeader = styled.div`
  align-items: center;
  background-color: #f7f7f7;
  color: #5f6062;
  display: flex;
  font-size: 18px;
  font-weight: 600;
  height: 38px;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-bottom: 15px;
  padding-left: 32px;
`

export const YotpoImageSlider = styled.div``

export const Downloadtemplate = styled.div`
  height: 19px;
  color: #8c8c8c;
  font-size: 14px;
  line-height: 19px;
  margin-left: 10px;
`

export const DownloadTemplateContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  padding-right: 20px;
`
export const DownloadAnchor = styled.a`
  display: flex;
`
export const AvailableLabel = styled.div`
  margin-top: 15px;
  height: 22px;
  color: #5f6062;
  font-size: 16px;
  font-style: italic;
  line-height: 22px;
`

export const DownloadImg = styled.img`
  &:hover {
    cursor: pointer;
  }
`
export const DetailsList = styled.ul`
  padding: 10px 0 0 20px;
`

export const DetailsListItem = styled.li`
  margin-bottom: 15px;
`

export const ProductAvailableColor = styled.img`
  margin-right: 15px;
  border-radius: 50%;
  border: ${({ selected, withBorder }: StyledProps) =>
    selected
      ? `2px solid ${RED}`
      : `1px solid ${withBorder ? BLACK : 'transparent'}`};
  width: 30px;

  &:hover {
    cursor: pointer;
  }
`

export const ColorWrapper = styled.div`
  height: 2.5em;
`

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`
