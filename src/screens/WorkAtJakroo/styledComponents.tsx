/**
 * Styled Components - Created by jorge on 31/07/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
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
  bottom: 108px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0px;
  position: absolute;
  right: 39px;
  text-align: right;
  width: 50%;

  @media (min-width: 320px) and (max-width: 767px) {
    margin-top: -40px;
    margin-left: -10px;
    position: initial;
    width: 100%;
  }
`
export const Title = styled.div`
  align-self: flex-end;
  color: #ffffff;
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 0.61px;
  line-height: 66px;
  text-align: right;

  @media (min-width: 320px) and (max-width: 767px) {
    font-size: 24px;
    letter-spacing: 0.3px;
    line-height: 33px;
  }
`
export const HeaderDialog = styled.div`
  align-items: flex-start;
  background-color: #ffffff;
  bottom: -96px;
  color: #5f6062;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  height: 200px;
  justify-content: center;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin: 0px;
  padding: 22px 40px;
  position: absolute;
  right: 0px;
  text-align: left;
  width: 81%;

  @media (min-width: 320px) and (max-width: 767px) {
    height: initial;
    padding: 40px 10px;
    position: initial;
    width: 100%;
  }
`
export const ContentSection = styled.div`
  padding: 115px 40px 300px;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0px 8px 74px;
  }
`
export const SectionTitle = styled.div`
  color: #5f6062;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  margin-bottom: 60px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 22px;
  }
`
