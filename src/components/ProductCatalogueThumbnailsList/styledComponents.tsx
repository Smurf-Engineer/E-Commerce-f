/**
 * Styled Components - Created by cazarez on 01/03/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  padding: 0 33px 30px 35px;
`

export const Text = styled.div`
  color: #5f6062;
  &:hover {
    cursor: pointer;
  }
`

export const HeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`

export const TotalItems = styled.div`
  height: 23px;
  color: #5f6062;
  font-family: 'Avenir Next';
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
  font-family: 'Avenir Next';
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
`

export const ThumbnailListItem = styled.li`
  list-style: none;
  display: inline-block;
  width: calc(100% / 4);
  text-align: center;
`

export const PaginationRow = styled.div`
  text-align: right;
`

export const MenuStyle = {
  width: '200px'
}
