/**
 * Styled Components - Created by cazarez on 01/03/18.
 */
import styled from 'styled-components'

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
`

export const ButtonContainer = styled.div`
  user-select: none;
  display: flex !important;
  align-items: center;
  margin: 8px;
  max-width: 119px;
  width: 100%;
`

export const ActionButton = styled.div`
  user-select: none;
  background-color: #ffffffb3;
  color: #5f6062;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 6px 16px;
  width: 100%;
`
