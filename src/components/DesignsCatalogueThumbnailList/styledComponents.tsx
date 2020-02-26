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
  width: 100%;
  align-items: center;
  justify-content: center;

  @media (min-width: 320px) and (max-width: 1024px) {
    padding: 0;
  }

  margin-left: ${({ withoutPadding }: HeadRowProps) =>
    withoutPadding ? '-54px' : '0'};
`

export const ThumbnailListItem = styled.li`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% / 4);
  padding-bottom: 20px;
  align-items: center;
  justify-content: center;
  @media (min-width: 481px) and (max-width: 1024px) {
    width: calc(100% / 3);
  }

  @media (min-width: 320px) and (max-width: 714px) {
    width: calc(95% / 2);
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
