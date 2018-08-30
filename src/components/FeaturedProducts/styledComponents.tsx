/**
 * Styled Components - Created by cazarez on 22/05/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  padding: 30px 32px 70px;
  background-color: #fff;

  @media (min-width: 320px) and (max-width: 767px) {
    padding: 22px 15px 37px;
    border-top: 1px solid #dcdcdc;
  }
`

export const Title = styled.div`
  height: 27px;
  color: #5f6062;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  text-align: center;
  margin-bottom: 23px;
`

export const FeaturedContent = styled.ul`
  overflow-x: scroll;
  display: -webkit-box;
  list-style: none;
  padding: 0;
`
export const ThumbnailListItem = styled.li`
  @media (min-width: 320px) and (max-width: 480px) {
    width: 50%;
    margin: 0 5px;
  }
`

export const ItemContainer = styled.div`
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0 5px;
  }
`

export const CarouselContent = styled.div`
  margin: 0;
  padding: 0;
`

export const Arrow = styled.img`
  height: 60px !important;
  width: 50px !important;
  padding: 20px !important;
  text-align: center !important;
  z-index: 1 !important;
  border: 0.2px solid rgba(220, 220, 220, 0.34) !important;
  background-color: #ffffff !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07) !important;
`
export const Loading = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0 5px;
    height: 30vh;
  }
`
