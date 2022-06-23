/**
 * Styled Components - Created by cazarez on 01/03/18.
 */
import styled from 'styled-components'
import {
  WHITE_TRANSPARENT,
  GRAY_DARK,
  RED_TRANSPARENT,
  WHITE,
  BLUE
} from '../../theme/colors'

interface DivProps {
  index?: number
  secondary?: boolean
}

export const Container = styled.div``
export const Content = styled.div``

export const Text = styled.div`
  color: #5f6062;
  &:hover {
    cursor: pointer;
  }
`

interface HeadRowProps {
  withoutPadding?: boolean
}

interface ButtonProps {
  secondary?: boolean
  maxMargin?: boolean
}

export const HeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: ${({ withoutPadding }: HeadRowProps) =>
    withoutPadding ? '0' : '0 2% 0 5%;'};

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0;
  }
`

export const TotalItems = styled.div`
  height: 23px;
  color: #5f6062;
  font-size: 16px;
  line-height: 23px;
`

export const SortOptions = styled.div`
  display: flex;
  align-items: center;
`
export const SortByLabel = styled.div`
  height: 22px;
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-right: 5px;
`
export const StyledImg = styled.img`
  margin-left: 5px !important;
`

export const ThumbnailsList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ${({ withoutPadding }: HeadRowProps) =>
    withoutPadding ? 'padding: 0px;' : ''};
  width: 100%;

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 0;
  }

  @media (min-width: 320px) and (max-width: 767px) {
    padding: 0;
    justify-content: space-between;
  }
`

export const ThumbnailListItem = styled.li`
  list-style: none;
  width: calc(95% / 2);
  animation: scale-in-center 0.1s cubic-bezier(0.250, 0.460, 0.450, 0.940) 
    ${({ index }: DivProps) => `${index ? (index * 0.1) : '1'}s`} both;
  @keyframes scale-in-center {
    0% {
      transform: scale(0.95);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  @media (min-width: 481px) {
    justify-content: center;
    width: 50%;
  }

  @media (min-width: 698px) {
    width: calc(100% / 3);
  }

  @media (min-width: 769px) {
    width: 50%;
  }

  @media (min-width: 990px) {
    padding-bottom: 20px;
    width: 33%;
  }

  @media (min-width: 1260px) {
    width: 25%;
  }

  @media (min-width: 2024px) {
    width: 15%;
  }
`

export const Loading = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`
export const PaginationRow = styled.div`
  text-align: right;
  padding-right: 2%;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0;
    text-align: center;
  }
`

export const MenuStyle = {
  width: '200px'
}

export const NoResultsFound = styled.div`
  display: flex;
  height: 60vh;
  justify-content: center;
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  max-width: 148px;
  width: 100%;
`

export const ButtonContainer = styled.div`
  user-select: none;
  display: flex !important;
  align-items: center;
  margin: ${({ maxMargin }: ButtonProps) => (maxMargin ? '8px 0' : '4px 0')};
  width: 100%;
`

export const ActionButton = styled.div`
  user-select: none;
  background-color: ${({ secondary }: ButtonProps) =>
    secondary ? RED_TRANSPARENT : WHITE_TRANSPARENT};
  color: ${({ secondary }: ButtonProps) => (secondary ? WHITE : GRAY_DARK)};
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 6px 16px;
  width: 100%;
`

export const CopyButton = styled.div`
  user-select: none;
  background-color: #00000075;
  color: ${WHITE};
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 6px 16px;
  width: 100%;
`

export const AddNewDesign = styled.div`
  border: 1px dashed ${BLUE};
  height: 221px;
  margin-top: 4px;
  margin-right: 41px;
  max-width: 204px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  border-radius: 3px;
  color: ${BLUE};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    background: #f2f8ff;
  }
  animation: scale-in-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s both;
  @keyframes scale-in-center {
    0% {
      transform: scale(0.75);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  ${({ secondary }: DivProps) => secondary ? `
    margin: 0 auto;
    margin-top: -78px;
  ` : `
    @media (max-width: 768px) {
      margin-right: 30px;
    }
    @media (max-width: 720px) {
      margin-right: 20px;
    }
    @media (max-width: 440px) {
      height: 202px;
      max-width: 198px;
    }
    @media (max-width: 440px) {
      max-width: 174px;
    }
    @media (max-width: 386px) {
      max-width: 164px;
    }
    @media (max-width: 368px) {
      max-width: 154px;
    }
  `}
`

export const PlusSign = styled.div`
  font-weight: bold;
  margin-bottom: 17px;
  font-size: 18px;
`

export const NewLabel = styled.div`
  font-size: 16px;
`
