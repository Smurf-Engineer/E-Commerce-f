/**
 * Styled Components - Created by gustavomedina on 06/06/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { WHITE, GRAY_DARK, GRAY_LIGHT } from '../../theme/colors'

export const Container = styled.div`
  background-color: ${WHITE};
  width: 100%;
`
export const ImageTitleContainer = styled.div`
  position: relative;
  width: 100%;
`
export const StyledImg = styled.img`
  width: 100%;
`
export const HeaderTextContainer = styled.div`
  align-items: flex-end;
  bottom: 36px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0px;
  position: absolute;
  right: 36px;
  text-align: right;
  width: 100%;

  @media (min-width: 320px) and (max-width: 480px) {
    right: 5px;
  }
`
export const TopImageButton = styled(Button)`
  background-color: ${WHITE};
  border-radius: 2px;
  color: ${GRAY_DARK};
  font-size: 16px;
  height: 50px;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-left: 20px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 480px) {
    display: none;
  }
`
export const Content = styled.div`
  @media (min-width: 1440px) {
    max-width: 1440px;
    padding: 0px 10%;
  }

  @media (min-width: 1441px) {
    margin: 0 auto;
    padding: 0px;
  }
`
export const Title = styled.div`
  align-self: flex-end;
  color: ${WHITE};
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 0.61px;
  line-height: 66px;
  text-align: right;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 24px;
    letter-spacing: 0.3px;
    line-height: 33px;
  }
`
export const ButtonsContainer = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
`
export const Paragraph = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;

  b {
    font-weight: 600;
  }

  .highlight {
    color: red;
  }
`
export const ParagraphContainer = styled.div`
  align-items: center;
  background-color: ${WHITE};
  display: flex;
  flex-direction: row;
  margin-top: 114px;
  padding-left: 40px;
  padding-right: 40px;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
`
export const OkoeImg = styled.img`
  height: 96px;
  margin-right: 29px;
  width: 302px;
`
export const LineCopy = styled.div`
  background-color: ${GRAY_LIGHT};
  border: 1px solid ${GRAY_LIGHT};
  box-sizing: border-box;
  height: 3px;
  margin-top: 36px;
  width: 100%;
`
export const SecondTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: bold;
  height: 27px;
  letter-spacing: 0.25px;
  line-height: 27px;
  margin-top: 36px;
  text-align: center;
  text-transform: uppercase;
`
export const Subtitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 18px;
  height: 25px;
  letter-spacing: 0.13px;
  line-height: 25px;
  text-align: center;
`
export const TechContainer = styled.div`
  align-items: flex-start;
  background-color: ${WHITE};
  display: flex;
  flex-direction: row;
  padding: 40px;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
`
export const TechImg = styled.img`
  margin-right: 29px;
  width: 30%;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 300px;
  }
`

interface ContainerProps {
  fabrics?: boolean
}

export const ProContainer = styled.div`
  background-color: ${WHITE};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 40px;
  width: 100%;

  @media (min-width: 1440px) {
    justify-content: ${({ fabrics }: ContainerProps) =>
      fabrics ? 'unset' : 'space-evenly'};
  }
`
export const ProItem = styled.div`
  background-color: ${WHITE};
  display: flex;
  flex-direction: column;
  width: 300px;

  @media (min-width: 1440px) {
    ${({ fabrics }: ContainerProps) => (fabrics ? 'margin-left: 5%' : '')};
  }

  @media (min-width: 1441px) {
    ${({ fabrics }: ContainerProps) => (fabrics ? 'margin-left: 8%' : '')};
  }
`
export const ImgItem = styled.img`
  width: 300px;
`
export const ProText = styled.div`
  margin-bottom: 30px;
  margin-top: 20px;
  width: 300px;

  b {
    font-weight: 600;
  }

  .highlight {
    color: red;
  }
`
export const TechParagraph = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  width: 70%;

  b {
    font-weight: 600;
  }

  .highlight {
    color: red;
  }
`
