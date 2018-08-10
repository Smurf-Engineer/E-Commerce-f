/**
 * Styled Components - Created by jorge on 03/08/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  background-color: #fff;
`
export const Content = styled.div`
  display: flex;
  padding: 0px 32px 50px 32px;

  @media (min-width: 320px) and (max-width: 572px) {
    display: block;
    padding: 0px 12px 50px 12px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 573px) and (max-width: 767px) {
  }
`
export const ImagePreview = styled.div`
  padding: 0 50px;
  width: 50%;

  @media (min-width: 320px) and (max-width: 572px) {
    width: 100%;
    padding: 0;
  }

  @media (min-width: 573px) and (max-width: 984px) {
    padding: 0 20px 0 0;
    width: 100%;
  }
`
export const ProductData = styled.div`
  padding-top: 31px;
  width: 50%;

  @media (min-width: 320px) and (max-width: 572px) {
    width: 100%;
  }
`
export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`
export const TitleSubtitleContainer = styled.div``
export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 24px;
  font-weight: bold;
  line-height: 33px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 18px;
  }
`
export const Subtitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 19px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`
export const EditDesignButton = styled(Button)`
  border: 2px solid #e61737;
  border-radius: 2px;
  color: #e61737;
  height: 40px;
  width: 120.79px;
`
export const PricesRow = styled.div`
  display: flex;
  margin-top: 20px;

  @media (min-width: 320px) and (max-width: 480px) {
    justify-content: space-between;
  }
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
export const Description = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 23px;
`
export const AvailableLabel = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-style: italic;
  height: 22px;
  line-height: 22px;
  margin-top: 15px;
`
export const BuyNowOptions = styled.div`
  margin-bottom: 40px;
  margin-top: 15px;
`
export const SectionRow = styled.div`
  margin-bottom: 20px;
`
export const SectionTitleContainer = styled.div`
  display: flex;
`
export const SectionTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  height: 25px;
  line-height: 25px;
  margin-bottom: 15px;
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
export const SizeRowTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`
export const QuestionSpan = styled.span`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  height: 23px;
  line-height: 23px;
  margin-left: 5px;
  width: 8.06px;

  &:hover {
    cursor: pointer;
  }
`
export const ButtonsRow = styled.div`
  display: flex;
  margin: 30px 0 25px;

  .ant-btn {
    color: #e61737;
    font-family: 'Avenir Next';
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }
`
export const DetailsList = styled.ul`
  padding: 10px 0px 0px 20px;
`

export const DetailsListItem = styled.li`
  margin-bottom: 15px;
`
