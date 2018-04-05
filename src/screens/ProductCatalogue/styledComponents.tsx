/**
 * Styled Components - Created by cazarez on 27/02/18.
 */
import styled from 'styled-components'
import breadcrumb from 'antd/lib/breadcrumb'

interface StyleProps {
  showChildren?: boolean
  color?: string
}

export const Container = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  padding: 31px 36px 32px 32px;
  background-color: #fff;

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 31px 5px 32px 5px;
  }
`

export const Text = styled.div`
  color: #5f6062;
`
export const FiltersColumn = styled.div`
  flex: 1 1 auto;
`

export const FiltersTitle = styled.div`
  display: ${({ showChildren }: StyleProps) =>
    showChildren ? 'inline-block' : 'none'};
  height: 36.95px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  margin-bottom: 15px;
  ${({ color }: StyleProps) => `color: ${color};`};
`
export const ResultsColumn = styled.div`
  flex: 10;
`

export const StyledBreadcrumb = styled(breadcrumb)`
  background-color: #fff;
  padding: 10.5px 0 10.5px 48px;
  border: 1px solid #dcdcdc;
`

export const MenuStyle = {
  width: '200px'
}
