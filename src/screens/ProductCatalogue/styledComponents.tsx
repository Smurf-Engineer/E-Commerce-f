/**
 * Styled Components - Created by cazarez on 27/02/18.
 */
import styled from 'styled-components'
import breadcrumb from 'antd/lib/breadcrumb'

export const Container = styled.div`
  display: flex;
  flew-wrap: no-wrap;
  padding: 31px 36px 32px 32px;
  background-color: #fff;
`

export const Text = styled.div`
  color: #fff;
`
export const FiltersColumn = styled.div`
  flex: 1 1 auto;
`

export const FiltersTitle = styled.div`
  height: 36.95px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  margin-bottom: 15px;
`
export const ResultsColumn = styled.div`
  flex: 10;
`

export const StyledBreadcrumb = styled(breadcrumb)`
  background-color: #fff;
  padding: 10.5px 0 10.5px 48px;
  border: 1px solid #dcdcdc;
`
