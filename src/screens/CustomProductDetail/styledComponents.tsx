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
  height: 40px;
  width: 120.79px;
  border: 2px solid #e61737;
  border-radius: 2px;
  color: #e61737;
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
  margin-top: 15px;
  height: 22px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-style: italic;
  line-height: 22px;
`
