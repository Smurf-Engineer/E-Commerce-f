/**
 * Styled Components - Created by jorge on 01/08/18.
 */
import styled from 'styled-components'
import divider from 'antd/lib/divider'
import radioGroup from 'antd/lib/radio/group'
import radioButton from 'antd/lib/radio/radioButton'

export const Container = styled.div`
  background-color: #fff;
  padding-bottom: 450px;
`
export const TitleSectionRow = styled.div`
  padding: 28px 32px 64px;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 28px 32px 0px;
  }
`
export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  margin-bottom: 12px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 23px;
  }
`
export const AnchorsRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 54px;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
`
export const AnchorButton = styled.div`
  border: 2px solid #e61737;
  border-radius: 2px;
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin: 0px 12.5px 10px;
  padding: 14px 52px;
  text-align: center;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 14px 0px;
  }
`
export const Divider = styled(divider)``
export const ContentSection = styled.div`
  padding: 37px 32px 17px;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 20px 8px 0px;
  }
`
export const SectionTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-bottom: 22px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 19px;
  }
`
export const SectionDescription = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-bottom: 60px;
`
export const SizingOptionsRow = styled.div`
  display: flex;
  justify-content: center;
`
export const RadioGroup = styled(radioGroup)`
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;

  .ant-radio-button-wrapper:first-child,
  .ant-radio-button-wrapper:last-child {
    border-radius: 2px;
  }

  .ant-radio-button-wrapper-checked {
    border: 2px solid #e61737;
  }

  .ant-radio-button-wrapper-checked:last-child  {
    border-left: 1px solid;
  }
`
export const RadioButton = styled(radioButton)`
  height: auto;
  padding: 14px 0px;
  text-align: center;
  width: 55px;
`
export const SizingCharts = styled.div``
export const FitStylesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`
export const FitStyle = styled.div`
  width: 32%;
`
export const FitStyleTitle = styled.div`
  color: #5f6062;
  display: flex;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.18px;
  line-height: 22px;
  margin-bottom: 25px;
`
export const FitStyleImage = styled.img`
  width: 100%;
`
export const FitStyleDescription = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-top: 20px;
`
