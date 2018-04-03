/**
 * Styled Components - Created by gustavomedina on 22/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div``

export const Text = styled.div`
  color: #000;
`

export const DetailsContent = styled.div`
  width: 100%;
  font-family: 'Avenir Next' !important;
`

export const TestimonialsContent = styled.div`
  max-width: 98%; !important;
  padding-left: 30px;
  font-family: 'Avenir Next' !important;
`

export const CarouselContent = styled.div`
  margin: 0 auto;
  padding: 10px;
  width: 100%;
  color: #333;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0px;
    margin: 0px;
  }
`

export const Slide = styled.img`
  width: 100%;
  padding: 5px;

  @media (min-width: 320px) and (max-width: 480px) {
    object-fit: cover;
    width: 300px;
    height: 100px;
  }
`

export const QuoteContent = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 515px;
  display: table;

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }

  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: 0px;
    height: 245px;
  }
`

export const ImageQuote = styled.img`
  height: 515px;
  width: 80%;
  float: right;
  object-fit: cover;

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    height: 245px;
  }
`

export const CardQuote = styled.div`
  padding: 16px 16px 32px 16px;
  width: 442px;
  background-color: #ffffff;
  position: absolute;
  margin-top: 60px;

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 12px;
    width: 50%;
    margin-top: 16px;
  }
`

export const TextQuote = styled.div`
  width: 384px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 36px;

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 18px;
    width: 100%;
  }
`
