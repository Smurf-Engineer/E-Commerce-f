/**
 * Styled Components - Created by cazarez on 01/06/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  background-color: #fff;
`

export const TeamsKitsTitle = styled.div`
  color: #ffffff;
  font-family: 'Avenir Next';
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 0.61px;
  line-height: 66px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 24px;
    letter-spacing: 0.3px;
    line-height: 33px;
  }
`

export const HeaderTextContainer = styled.div`
  text-align: right;
  margin-right: 40px;
  position: absolute;
  top: 50%;
  right: 0;

  @media (min-width: 320px) and (max-width: 480px) {
    top: 40%;
    margin-right: 10px;
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

  @media (min-width: 320px) and (max-width: 480px) {
    display: none;
  }
`

export const SectionTitle = styled.div`
  margin-bottom: 30px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 480px) {
    text-align: left;
  }
`

export const SectionSubtitle = styled.div`
  margin-bottom: 25px;
  font-weight: 600;
`

export const SectionText = styled.div`
  padding: 0 25px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 50px 0 0;
  }
`
export const ImageTitleContainer = styled.div`
  position: relative;
`

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;

  @media (min-width: 320px) and (max-width: 480px) {
    height: 220px;
    object-fit: cover;
  }
`

export const DesignImage = styled.img`
  width: 49%;
  height: 50%;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const Content = styled.div`
  padding: 76px 40px 30px;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 76px 10px 0 10px;
  }
`

export const DesignRow = styled.div`
  display: flex;
  margin-bottom: 50px;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
`

export const OrderingAndFabricRow = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
`
export const Section = styled.div`
  width: calc(98% / 2);

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`
export const OrderingAndFabricImage = styled.img`
  width: 100%;
`
export const OrderAndFabricText = styled.div`
  padding: 50px 0;
  width: 95%;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const FullDetailsRow = styled.div`
  text-align: right;
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;
`
export const ButtonRow = styled.div`
  text-align: center;
  padding: 85px 0 100px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0;
    padding-bottom: 50px;
  }
`

export const FreeDesignButton = styled(Button)`
  height: 50px;
  border: 2px solid #e61737;
  border-radius: 2px;
  color: #e61737;
  background-color: #ffffff;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`
export const ArrowRight = styled.img`
  margin-left: 10px;
`
