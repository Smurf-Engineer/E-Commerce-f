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

export const Container = styled.div`
  background-color: #fff;
`

export const Content = styled.div`
  display: flex;
  padding: 0px 32px 50px 32px;
`

export const ImagePreview = styled.div`
  width: 50%;
  padding: 0 50px;
`

export const ProductData = styled.div`
  padding-top: 31px;
  width: 50%;
`
export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 24px;
  font-weight: bold;
  line-height: 33px;
`

export const Subtitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 19px;
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
`

export const PricesRow = styled.div`
  display: flex;
  margin-top: 20px;
`

export const Description = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 23px;
`

export const ButtonsRow = styled.div`
  display: flex;
  margin: 20px 0 25px;

  .ant-btn {
    color: #e61737;
    font-family: 'Avenir Next';
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
`

export const GenderRow = styled.div`
  display: flex;
  margin-bottom: 20px;
`
export const SectionTitle = styled.div`
  height: 25px;
  color: #5f6062;
  font-family: 'Avenir Next';
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
`

export const SectionRow = styled.div`
  margin-bottom: 20px;
`
export const SectionButtonsContainer = styled.div`
  display: flex;
`
export const SizeRowTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const GetFittedLabel = styled.div`
  height: 22px;
  color: #e61737;
  font-family: 'Avenir Next';
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
  font-family: 'Avenir Next';
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
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  margin-left: 34px;
`

export const YotpoImageSlider = styled.div``

export const Downloadtemplate = styled.div`
  height: 19px;
  color: #8c8c8c;
  font-family: 'Avenir Next';
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
  font-family: 'Avenir Next';
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
  &:hover {
    cursor: pointer;
  }
`
