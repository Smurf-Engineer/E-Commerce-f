/**
 * Styled Components - Created by cazarez on 28/05/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
`

export const Text = styled.div`
  color: #fff;
`

export const TitleSectionRow = styled.div`
  max-width: 1024px;
  padding: 28px 32px 64px;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 28px 32px 0px;
  }

  @media (min-width: 1025px) {
    margin: 0 auto;
  }
`

export const Title = styled.div`
  margin-bottom: 12px;
  color: #5f6062;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 23px;
  }
`

export const Subtitle = styled.div`
  height: 23px;
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  display: flex;
  justify-content: center;

  @media (min-width: 320px) and (max-width: 480px) {
    color: #5f6062;
  }
`

export const ContactUsLink = styled.a`
  color: #5f6062;
  padding-left: 4px;
`

export const AnchorsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 54px;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
`
export const AnchorButton = styled.div`
  border: 2px solid #e61737;
  border-radius: 2px;
  color: #e61737;
  flex-direction: column;
  font-size: 16px;
  justify-content: center;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-bottom: 10px;
  padding: 14px 52px;
  text-align: center;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 14px 0px;
  }
`

export const ContentSection = styled.div`
  max-width: 1024px;
  padding: 37px 32px 17px;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 20px 8px 0px;
  }

  @media (min-width: 1025px) {
    margin: 0 auto;
  }
`

export const SectionTitle = styled.div`
  margin-bottom: 20px;
  color: #5f6062;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 19px;
  }
`
