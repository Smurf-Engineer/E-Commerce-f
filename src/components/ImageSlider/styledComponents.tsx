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
  display: flex;
  flex-direction: row;
  overflow: auto;
  white-space: nowrap;
  justify-content: center;
  text-align: center;
`

export const ThumbnailContainer = styled.div`
  margin-right: 25px;
  max-width: 63.13px;
  max-height: 72.41px;
`
export const ThumbnailImg = styled.img`
  height: 100%;
  width: 100%;
  background-color: #f1f4f5;
  margin-right: 25px;
  border: 1px solid
    ${({ selected }: ThumbnailProps) => (selected ? 'grey' : '#fff')};
  &:hover {
    cursor: pointer;
  }
`
export const SelectedImage = styled.div`
  text-align: center;
`

export const SwipeContainer = styled.div`
  width: 80%;
  display: flex;
  position: relative;
  justify-content: center;

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
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 85%;
  padding: 0;
  align-self: center;

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
