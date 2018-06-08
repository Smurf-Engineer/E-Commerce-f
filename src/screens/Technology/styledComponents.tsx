/**
 * Styled Components - Created by gustavomedina on 06/06/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  background-color: #fff;
  width: 100%;
`

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  text-align: center;
`

export const ImageTitleContainer = styled.div`
  position: relative;
  width: 100%;
`

export const StyledImg = styled.img`
  width: 100%;
`

export const Title = styled.div`
  color: #ffffff;
  font-family: 'Avenir Next';
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 0.61px;
  line-height: 66px;
  align-self: flex-end;
  text-align: right;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 24px;
    letter-spacing: 0.3px;
    line-height: 33px;
  }
`

export const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  text-align: right;

  width: 100%;

  margin: 0px;
  position: absolute;
  bottom: 36px;
  right: 36px;

  @media (min-width: 320px) and (max-width: 480px) {
    right: 5px;
  }
`

export const TopImageButton = styled(Button)`
  height: 50px;
  border-radius: 2px;
  background-color: #ffffff;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
  margin-left: 20px;

  @media (min-width: 320px) and (max-width: 480px) {
    display: none;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  align-self: flex-end;
`

export const Paragraph = styled.div`
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;

  .highlight {
    color: red;
  }

  b {
    font-weight: 600;
  }
`

export const ParagraphContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 114px;
  margin-left: 40px;
  margin-right: 40px;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
`
export const OkoeImg = styled.img`
  height: 96px;
  width: 302px;
  margin-right: 29px;
`

export const TechImg = styled.img`
  width: 700px;
  margin-right: 29px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 300px;
  }
`

export const LineCopy = styled.div`
  box-sizing: border-box;
  height: 3px;
  width: 100%;
  border: 1px solid #dcdcdc;
  background-color: #dcdcdc;
  margin-top: 36px;
`

export const SecondTitle = styled.div`
  height: 27px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  text-align: center;
  margin-top: 36px;
  text-transform: uppercase;
`

export const Subtitle = styled.div`
  height: 25px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 18px;
  letter-spacing: 0.13px;
  line-height: 25px;
  text-align: center;
`

export const TechContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 40px;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
`

export const ProContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  padding: 40px;
`

export const ProItem = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 300px;
`

export const ProText = styled.div`
  width: 300px;
  margin-top: 20px;
  margin-bottom: 30px;

  .highlight {
    color: red;
  }

  b {
    font-weight: 600;
  }
`

export const ImgItem = styled.img`
  width: 300px;
`
