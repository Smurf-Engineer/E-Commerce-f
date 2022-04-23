import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'
import { WHITE } from '../../theme/colors'

interface DivProps {
  fromYotpo?: boolean
}

export const Container = styled.div``
export const Content = styled.div`
  height: ${({ fromYotpo }: DivProps) => !fromYotpo ? '70vh' : ''};
  overflow: auto;
  border-top: ${({ fromYotpo }: DivProps) => !fromYotpo ? '2px solid #e8e6e6' : ''};
  border-bottom: ${({ fromYotpo }: DivProps) => !fromYotpo ? '2px solid #e8e6e6' : ''};
  @media(max-width: 714px) {
    border-top: 2px solid #c0c0c0;
    border-bottom: 2px solid #c0c0c0;
  }
`

export const Text = styled.div`
  color: #5f6062;
  &:hover {
    cursor: pointer;
  }
`

interface HeadRowProps {
  withoutPadding?: boolean
  fromYotpo?: boolean
}

export const HeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: ${({ withoutPadding }: HeadRowProps) =>
    withoutPadding ? '0' : '0 2% 0 5%;'}
    @media (min-width: 320px) and (max-width: 480px) {
    padding: 0;
  }
`

export const TotalItems = styled.div`
  height: 23px;
  color: #5f6062;
  font-size: 16px;
  line-height: 23px;
  @media (min-width: 320px) and (max-width: 748px) {
    text-align: center;
    width: 100%;
  }
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
  overflow: auto;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  padding: 0;
  background: ${({ fromYotpo }: HeadRowProps) => !fromYotpo ? '#f8f8f8' : WHITE};
  margin-left: ${({ withoutPadding }: HeadRowProps) =>
    withoutPadding ? '-54px' : '0'};
  ${({ fromYotpo }: HeadRowProps) => fromYotpo ? `
    margin-bottom: 0;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    max-width: 100%;
    overflow-x: scroll;
    width: auto;
    max-width: 100%;
  ` : ''}
`

export const ThumbnailListItem = styled.li`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: auto;
  min-width: 228px;
  padding-bottom: 20px;
  align-items: center;
  justify-content: center;
  background: ${WHITE};
  margin: 18px 16px;
  border-radius: 3px;
  box-shadow: 0px 2px 10px -4px #b1b1b1;
  @media (min-width: 481px) and (max-width: 1024px) {
    margin: 12px 6px;
  }

  @media (min-width: 320px) and (max-width: 714px) {
    margin: 0;
    min-width: unset;
    width: calc(100% / 2);
    margin-bottom: 17px;
    ${({ fromYotpo }: DivProps) => fromYotpo ? `
      margin-left: 22px;
    ` : ''}
  }
`

export const Loading = styled.div`
  display: flex;
  height: 12px;
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

export const InfiniteScrollStyled = styled(InfiniteScroll)`
  height: 100%;
  ${({ fromYotpo }: DivProps) => fromYotpo ? `
    display: flex;
    justify-content: center;
  ` : ''}
`