/**
 * Styled Components - Created by cazarez on 14/03/18.
 */
import styled from 'styled-components'

interface ThumbnailProps {
  selected: boolean
}

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
`
export const ThumbnailImg = styled.img`
  background-color: #f1f4f5;
  border: 1px solid
    ${({ selected }: ThumbnailProps) => (selected ? 'grey' : '#fff')};
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`
export const SelectedImage = styled.div`
  text-align: center;
`

export const SwipeContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;

  @media (min-width: 320px) and (max-width: 1024px) {
    width: 100%;
  }
`

export const SwipeImg = styled.img`
  width: 100%;
`
export const ThreeDThumbnailContair = styled.div`
  text-align: center;
  width: 660px;
`

export const Arrows = styled.div`
  align-self: center;
  display: flex;
  justify-content: space-between;
  padding: 0;
  position: absolute;
  width: 85%;

  @media (min-width: 320px) and (max-width: 425px) {
    display: none;
  }
`
export const ArrowRight = styled.img`
  height: 22.09px;
  width: 10px;

  &:hover {
    cursor: pointer;
  }
`
export const ArrowLeft = styled.img`
  height: 22.09px;
  width: 10px;

  &:hover {
    cursor: pointer;
  }
`
