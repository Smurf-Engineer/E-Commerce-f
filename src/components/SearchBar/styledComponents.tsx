/**
 * Styled Components - Created by cazarez on 13/02/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'

const Search = Input.Search

interface StyledProps {
  searchWidth?: string
  onHeader?: boolean
  focused?: boolean
}
export const Container = styled.div`
  ${({ searchWidth }: StyledProps) =>
    searchWidth ? `width: ${searchWidth};` : ''};

  .ant-input {
    ${({ onHeader }: StyledProps) =>
      onHeader ? 'background-color : #f6f6f6;' : ''};
  }
  .ant-input:focus {
    ${({ onHeader }: StyledProps) =>
      onHeader ? 'background-color : #fff;' : ''};
  }

  .ant-input-suffix {
    font-size: 20px;
  }
  .ant-input-suffix:focus {
    background-color: #fff;
  }

  .ant-btn-primary {
    color: grey;
    background-color: ${({ onHeader, focused }: StyledProps) =>
      focused || !onHeader ? '#fff' : '#f6f6f6'};
    border-color: ${({ onHeader, focused }: StyledProps) =>
      focused || !onHeader ? '#fff' : '#f6f6f6'};
  }
`

export const Text = styled.div`
  color: #fff;
`
export const SearchInput = styled(Search)`
  height: 50px;
  background-color: #fff;

  &:focus {
    background-color: #fff;
  }

  input {
    width: ${(props: any) => props.width};
    border-radius: 0px;
    border: 0;
    color: #bebebe;
    font-size: 16px;
    line-height: 22px;
  }
`
