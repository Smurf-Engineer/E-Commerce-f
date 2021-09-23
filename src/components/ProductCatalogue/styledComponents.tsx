/**
 * Styled Components - Created by cazarez on 27/02/18.
 */
import styled from 'styled-components'
import breadcrumb from 'antd/lib/breadcrumb'
import icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import { WHITE, RED, GRAY_DARK, GRAY_LIGHT } from '../../theme/colors'

interface StyleProps {
  showChildren?: boolean
  color?: string
}

export const Container = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  padding: 31px 36px 32px 32px;
  background-color: ${WHITE};

  @media (min-width: 320px) and (max-width: 768px) {
    padding: 0 5px 32px 5px;
  }
`

export const Text = styled.div`
  color: ${GRAY_DARK};
`
export const FiltersColumn = styled.div`
  flex: 1 1 auto;
`

export const FiltersTitle = styled.div`
  display: ${({ showChildren }: StyleProps) =>
    showChildren ? 'inline-block' : 'none'};
  height: 36.95px;
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  margin-bottom: 15px;
  ${({ color }: StyleProps) => `color: ${color};`};
`
export const ResultsColumn = styled.div`
  flex: 10;

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const StyledBreadcrumb = styled(breadcrumb)`
  background-color: ${WHITE};
  padding: 10.5px 0 10.5px 48px;
  border: 1px solid ${GRAY_LIGHT};
`

export const MenuStyle = {
  width: '200px'
}

export const Icon = styled(icon)`
  color: ${RED};
`

const Search = Input.Search

export const SearchInput = styled(Search)`
  border-radius: 0;
  margin-left: 4px;
  width: 100%;
  margin: 0 150px 10px 40px;
  max-width: 500px;
  & input {
    border-radius: 0;
    padding: 7px;
    height: 48px;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    width: 98%;
    max-width: 100%;
    margin: 1%;
  }
`