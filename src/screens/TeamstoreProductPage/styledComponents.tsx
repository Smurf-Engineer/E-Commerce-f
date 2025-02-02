/**
 * Styled Components - Created by cazarez on 12/03/18.
 */
import styled from 'styled-components'
import Breadcrumb from 'antd/lib/breadcrumb'
import Button from 'antd/lib/button'
import InputNumber from 'antd/lib/input-number'

interface ButtonProps {
  selected: boolean
}

interface ThumbnailStyle {
  labelColor?: string
}

export const Container = styled.div`
  background-color: #fff;
  padding-bottom: 8px;
`

export const Content = styled.div`
  display: flex;
  padding: 0px 32px 50px 32px;

  @media (min-width: 320px) and (max-width: 480px) {
    display: block;
    padding: 0px 12px 50px 12px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }
`

export const ImagePreview = styled.div`
  width: 50%;
  padding: 0 50px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    padding: 0;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    padding: 0 20px 0 0;
    width: 100%;
  }
`

export const ProductData = styled.div`
  padding-top: 31px;
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
  display: flex;

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
  justify-content: space-between;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
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
  color: #e61737;
  font-size: 16px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`
export const CompareButton = styled(Button)`
  height: 40px;
  width: 120.79px;
  border: 2px solid #e61737;
  border-radius: 2px;
  color: #e61737;
`

export const BuyNowOptions = styled.div`
  margin-bottom: 40px;
  margin-top: 15px;
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
export const SectionButton = styled.div`
  height: 50px;
  padding: 14px;
  margin-right: 14px;
  border: 0.5px solid
    ${({ selected }: ButtonProps) => (selected ? 'red' : '#dcdcdc')};
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);

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
export const JakrooWidgetsTitle = styled.div`
  height: 25px;
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  margin-left: 34px;
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

export const AvailableLabel = styled.div`
  margin-top: 15px;
  height: 22px;
  color: #5f6062;
  font-size: 16px;
  font-style: italic;
  line-height: 22px;
`

export const DetailsList = styled.ul`
  padding: 10px 0 0 20px;
`

export const DetailsListItem = styled.li`
  margin-bottom: 15px;
`
export const ProductAvailableColor = styled.img`
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`
export const OrdersInfo = styled.div`
  display: flex;
  text-align: right;
`

export const CurrentOrder = styled.div`
  color: #5f6062;
  font-size: 16px;
  line-height: 23px;
`
export const EstimatePrice = styled.div`
  color: #5f6062;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 15px;
  margin-top: 5px;
`
export const PricesContainer = styled.div`
  display: flex;

  @media (min-width: 320px) and (max-width: 480px) {
    justify-content: space-between;
    margin-bottom: 15px;
  }
`
export const SpanNumber = styled.span`
  font-weight: 600;
`

export const TeamBanner = styled.img`
  width: 100%;
  height: 20%;
`

export const DynamicPriceModalContainer = styled.div``

export const DynamicPriceModalTitle = styled.div`
  height: 27px;
  margin-bottom: 10px;
  color: #5f6062;
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
`
export const StyledParagraph = styled.p`
  color: #5f6062;
  font-size: 16px;
  line-height: 22px;
`

export const ButtonRow = styled.div`
  text-align: right;
`
export const GotItButton = styled(Button)`
  height: 40px;
  width: 114.36px;
  border-radius: 2px;
  background-color: #4a90e2;
  color: #fff;
`
export const BreadCrumbRow = styled.div`
  padding: 12px 0 12px 48px;
  border-bottom: 1px solid #dcdcdc;
`

export const RelatedProductsContainer = styled.div`
  padding: 20px 0 45px 40px;

  @media (min-width: 320px) and (max-width: 480px) {
    overflow: scroll;
    padding: 0 10px 10px 10px;
  }
`

export const RelatedProductsRow = styled.div`
  display: flex;
`

export const TeamStoresTitleContainer = styled.div`
  display: flex;
  text-align: left;
`

export const TeamStoresTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  line-height: 25px;
  border-bottom: 4px solid #e61737;
  padding: 21px 0;
`

// TODO: MOVE THIS STYLES TO PRODUCTTHUMBNAIL FOOTER FOR RELATED PRODUCTS WHEN COMPONENT GETS CREATED

export const ThumbnailFooterContainer = styled.div`
  padding: 5px;
`
export const ThumbnailFooterTitle = styled.div`
  height: 18.75px;
  width: 209px;
  color: #5f6062;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.16px;
  line-height: 19px;
`
export const ThumbnailFooterSubtitle = styled.div`
  height: 15.79px;
  width: 146px;
  color: #8c8c8c;
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const ThumbnailFooterPriceContainer = styled.div`
  text-align: right;
  margin-top: 3px;
`

export const ThumbnailFooterPricelabel = styled.div`
  height: 15.79px;
  color: #5f6062;
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const PriceSpan = styled.span`
  color: ${({ labelColor }: ThumbnailStyle) =>
    labelColor ? '#E61737' : '#5f6062'};
  margin-left: 3px;
  font-weight: 600;
`
