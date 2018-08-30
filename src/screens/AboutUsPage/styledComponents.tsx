/**
 * Styled Components - Created by gustavomedina on 14/06/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  background-color: #fff;
  width: 100%;
`

export const Text = styled.div`
  color: #fff;
`

export const ImageTitleContainer = styled.div`
  position: relative;
  width: 100%;
`

export const StyledImg = styled.img`
  width: 100%;
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

export const HeaderTextContainer = styled.div`
  align-items: flex-end;
  bottom: 108px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0px;
  position: absolute;
  right: 36px;
  text-align: right;

  @media (min-width: 320px) and (max-width: 767px) {
    margin-top: -100px;
    margin-left: -2px;
    position: initial;
    width: 100%;
  }
`

export const TopImageButton = styled(Button)`
  height: 50px;
  border-radius: 2px;
  background-color: #ffffff;
  color: #5f6062;
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

export const DescriptionItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`

export const ItemTitle = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const ItemContent = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  width: 217px;
`
export const PeopleContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 30px;
  margin-top: 50px;

  @media (max-width: 659px) {
    justify-content: center;
  }
`
export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 30px;
  margin-top: 50px;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 30px 10px;
    margin-top: 0px;
  }

  @media (max-width: 493px) {
    div {
      width: 100%;
    }
  }
`
export const SectionContainer = styled.div`
  max-width: 1024px;

  @media (min-width: 1025px) {
    margin: 0 auto;
  }
`
export const MeetTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  text-align: center;
`

export const PeopleItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

export const PeopleImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  display: block;
`
export const PeopleName = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const PeoplePosition = styled.div`
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 19px;
`

export const MapContainer = styled.div`
  height: 645px;
  width: 100%;
  margin-top: 38px;
`

export const MapMarker = styled.img`
  height: 33px;
  width: 34px;

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
`

export const ImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;

  .cornerLink {
    overflow: auto;
    opacity: 0;
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    top: 0px;
    padding: 36px;

    color: #ffffff;
    background: #000000;
    text-decoration: none;
    text-align: left;
    -webkit-transition: opacity 500ms;
    -moz-transition: opacity 500ms;
    -o-transition: opacity 500ms;
    transition: opacity 500ms;
    width: 300px;
    height: 300px;
  }

  &:hover .cornerLink {
    opacity: 0.8;
  }
`

export const IFrameContainer = styled.div`
  margin-top: 31px;
`

export const MapRelativeContainer = styled.div`
  position: relative;
  width: 100%;
`

export const LineText = styled.div`
  color: #ffffff;
  font-size: 18px;
  letter-spacing: 0.13px;
  line-height: 25px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0 auto;
  }
`

export const MapTextContainer = styled.div`
  align-items: flex-start;
  background-color: #e61737;
  bottom: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
  padding: 22px;
  position: absolute;
  right: 0px;
  text-align: left;
  width: 374px;

  @media (min-width: 320px) and (max-width: 480px) {
    bottom: 0px;
    width: 100%;
  }
`

export const HeaderDialog = styled.div`
  align-items: flex-start;
  background-color: #ffffff;
  bottom: -80px;
  color: #5f6062;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  height: 150px;
  justify-content: center;
  letter-spacing: 0.2px;
  line-height: 25px;
  margin: 0px;
  padding: 22px;
  position: absolute;
  right: 0px;
  text-align: left;
  width: 81%;

  @media (max-width: 480px) {
    padding: 0px 10px 0px;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    padding: 40px 32px 0px;
  }

  @media (max-width: 767px) {
    height: initial;
    margin-top: 5%;
    position: initial;
    width: 100%;
  }

  @media (min-width: 1440px) {
    padding-left: 5%;
    width: 50%;
  }
`
