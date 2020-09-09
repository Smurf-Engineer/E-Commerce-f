/**
 * Styled Components - Created by jorge on 01/08/18.
 */
import styled from 'styled-components'
import divider from 'antd/lib/divider'
import radioGroup from 'antd/lib/radio/group'
import radioButton from 'antd/lib/radio/radioButton'
import { GRAY_DARK, BLUE } from '../../theme/colors'

export const Container = styled.div`
  background-color: #fff;
  padding-bottom: 450px;

  @media (min-width: 320px) and (max-width: 480px) {
    padding-bottom: 60px;
  }
`
export const TitleSectionRow = styled.div`
  padding: 28px 32px 28px;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 28px 32px 0px;
  }
`
export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  margin-bottom: 12px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 23px;
    margin-bottom: -25px;
  }
`
export const AnchorsRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 54px;

  @media (min-width: 320px) and (max-width: 480px) {
    align-items: center;
    flex-direction: column;
  }
`
export const AnchorButton = styled.div`
  border: 2px solid #e61737;
  border-radius: 2px;
  color: #e61737;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin: 0px 12.5px 10px;
  padding: 14px 52px;
  text-align: center;
  width: 240px;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 25px;
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
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-bottom: 22px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.25px;
    line-height: 27px;
  }
`
export const SectionDescription = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-bottom: 60px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 35px;
  }
`
export const SizingOptionsRow = styled.div`
  display: flex;
  justify-content: center;
`
export const RadioGroup = styled(radioGroup)`
  color: #e61737;
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

  @media (min-width: 320px) and (max-width: 480px) {
    flex-wrap: wrap;
    margin-top: 20px;
  }
`
export const FitStyle = styled.div`
  width: 32%;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 50px;
    width: 100%;
  }
`
export const FitStyleTitle = styled.div`
  color: ${GRAY_DARK};
  display: flex;
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
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-top: 20px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: 15px;
  }
`

export const SectionLink = styled.a`
  text-align: center;
  margin-top: 8px;
  display: block;
  font-size: 16px;
  color: ${BLUE};
`

export const AssistanceDiv = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-align: center;
  margin-top: 32px;
`