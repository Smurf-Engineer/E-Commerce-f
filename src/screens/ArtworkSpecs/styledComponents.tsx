/**
 * Styled Components - Created by gustavomedina on 05/06/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  padding: 27px 0;
  background-color: #fff;
`

export const Text = styled.div`
  color: #5f6062;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  text-align: center;
`

export const ColorWrapper = styled.div`
  width: 80%;
  text-align: center;
  align-content: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;
`

export const Subtitle = styled.div`
  height: 40px;
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-align: center;
  margin-top: 18px;
`

export const MainTitle = styled.div`
  height: 25px;
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-top: 37px;
  text-align: center;
`

export const SecondaryTitle = styled.div`
  height: 25px;
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin: 32px;
`

export const SectionText = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-left: 32px;
  margin-right: 32px;

  .highlight {
    color: red;
    font-style: italic;
  }

  b {
    font-weight: 700;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
    margin: 0px;
    padding: 30px 8px 0px;
  }
`

export const ThirdTitle = styled.div`
  height: 27px;
  color: #5f6062;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  text-align: center;
  margin-top: 32px;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-left: 32px;
  padding-right: 32px;
  margin-top: 28px;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
    padding: 0px 8px;
  }
`

export const DesignText = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-top: 25px;
`

export const StyledImage = styled.img`
  height: 254px;
  width: 302px;
  margin-right: 35px;
`

export const StyledFlatLockImage = styled.img`
  width: 70%;
  margin-top: 28px;
  text-align: center;
  align-content: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
`

export const LineCopy = styled.div`
  box-sizing: border-box;
  height: 3px;
  width: 100%;
  border: 1px solid #dcdcdc;
  background-color: #dcdcdc;
  margin-top: 36px;
`

export const FlatLockText = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-align: center;
  margin-left: 32px;
  margin-right: 32px;
  margin-top: 28px;
`
export const SectionContainer = styled.div`
  max-width: 1024px;

  @media (min-width: 1025px) {
    margin: 0 auto;
  }
`
export const ColorChartContainer = styled.div`
  @media (min-width: 1025px) {
    margin: 0 auto;
    max-width: 500px;
  }
`
