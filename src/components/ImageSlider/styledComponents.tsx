/**
 * Styled Components - Created by cazarez on 14/03/18.
 */
import styled, { css } from 'styled-components'

interface ThumbnailProps {
  selected?: boolean
  design?: boolean
}

interface ContainerProps {
  design: boolean
}

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 1440px) {
    margin: 0 auto;
    max-width: 600px;
    max-height: 800px;
  }
`

export const Text = styled.div`
  color: #fff;
`

export const ImageThumbnails = styled.div`
  display: inline-block;
  overflow-x: auto;
  white-space: nowrap;
`

export const ThumbnailContainer = styled.div`
  display: inline-block;
  width: 25%;
  ${({ design }: ContainerProps) => (design ? 'height: 100%' : '')};
`
export const ThumbnailImg = styled.img`
  background-color: #f1f4f5;
  border: 1px solid
    ${({ selected }: ThumbnailProps) => (selected ? 'grey' : '#fff')};
  ${({ design }: ThumbnailProps) => (design ? 'height: 100%' : '')};
  ${({ design }: ThumbnailProps) => (design ? 'object-fit: cover;' : '')};
  width: 99%;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 1025px) {
    height: inherit;
  }
`

interface ArrowsProps {
  squareArrows: boolean
}

export const SwipeContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;

  section {
    position: absolute;
    ${({ squareArrows }: ArrowsProps) =>
      squareArrows
        ? css`
            align-items: center;
            background-color: rgba(255, 255, 255, 0.6);
            border: 0.2px solid rgba(220, 220, 220, 0.34);
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07);
            display: flex;
            justify-content: center;
            width: 30px;
          `
        : ''};
  }

  section:first-child {
    left: ${({ squareArrows }: ArrowsProps) => (squareArrows ? '5' : '15')}px;
  }

  section:last-child {
    right: ${({ squareArrows }: ArrowsProps) => (squareArrows ? '5' : '15')}px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    margin-top: 70px;
  }

  @media (min-width: 320px) {
    height: 100%;
  }
`
export const SelectedImage = styled.article`
  height: 100%;
  text-align: center;
  width: 100%;
`
export const SwipeImg = styled.img`
  max-height: 600px;
  max-width: 600px;
  width: 100%;
`
export const ThreeDThumbnailContair = styled.div`
  text-align: center;
  width: 660px;
`
export const ArrowContainer = styled.section`
  height: 43px;
  z-index: 1;

  &:hover {
    cursor: pointer;
  }
`
export const Arrow = styled.img`
  height: 22.09px;
  width: 10px;
`