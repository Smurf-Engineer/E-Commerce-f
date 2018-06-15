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
  color: #ffffff;
  font-family: Avenir Next;
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 0.61px;
  line-height: 66px;
  align-self: flex-end;
  text-align: right;

  @media (min-width: 320px) and (max-width: 767px) {
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
  width: 50%;

  margin: 0px;
  position: absolute;
  bottom: 70px;
  right: 36px;

  @media (min-width: 320px) and (max-width: 815px) {
    right: 5px;
    width: 100%;
  }
`

export const TopImageButton = styled(Button)`
  height: 50px;
  border-radius: 2px;
  background-color: #ffffff;
  color: #5f6062;
  font-family: Avenir Next;
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
  /* width: 20%; */
`

export const ItemTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  font-weight: bold;
`

export const ItemContent = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  width: 217px;
`

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 30px;
  margin-top: 50px;
`

export const MeetTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
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
  /* width: 20%; */
`

export const PeopleImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  display: block;
`
export const PeopleName = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const PeoplePosition = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
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
  font-family: 'Avenir Next';
  font-size: 18px;
  letter-spacing: 0.13px;
  line-height: 25px;
`

export const MapTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  text-align: left;
  width: 374px;
  padding: 22px;

  margin: 0px;
  position: absolute;
  bottom: 400px;
  right: 0px;

  background-color: #e61737;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const HeaderDialog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  text-align: left;
  width: 50%;
  height: 150px;
  padding: 22px;

  margin: 0px;
  position: absolute;
  bottom: -80px;
  right: 0px;

  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 18px;
  letter-spacing: 0.2px;
  line-height: 25px;

  background-color: #ffffff;

  @media (min-width: 320px) and (max-width: 767px) {
    width: 100%;
  }
`
