/**
 * Styled Components - Created by cazarez on 13/02/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'

const Search = Input.Search

interface StyledProps {
  searchWidth?: string
  onHeader?: boolean
}
export const Container = styled.div`
  ${({ searchWidth }: StyledProps) =>
    searchWidth ? `width: ${searchWidth};` : ''};
`

export const Text = styled.div`
  color: #fff;
`

export const SearchInput = styled(Search)`
  height: 50px;
  background-color: ${({ onHeader }: StyledProps) =>
    onHeader ? 'transparent' : '#fff'};
  input {
    width: ${(props: any) => props.width};
    border-radius: 0px;
    border: 0;
    color: #bebebe;
    font-family: 'Avenir Next' !important;
    font-size: 16px;
    line-height: 22px;
  }

  .ant-input-suffix {
    font-size: 20px;
    :hover {
      cursor: pointer;
    }
  }

  .ant-btn-primary {
    color: grey;
    background-color: ${({ onHeader }: StyledProps) =>
      onHeader ? 'transparent' : '#fff'};
    border-color: ${({ onHeader }: StyledProps) =>
      onHeader ? 'transparent' : '#fff'};
  }
`
