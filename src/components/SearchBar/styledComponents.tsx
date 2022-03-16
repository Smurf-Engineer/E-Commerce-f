/**
 * Styled Components - Created by cazarez on 13/02/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import { BLACK, GRAY, GRAY_LIGHTEST, WHITE } from '../../theme/colors'

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
      onHeader ? `background-color : #f9f9f9;` : ''};
  }
  .ant-input:focus {
    ${({ onHeader }: StyledProps) =>
      onHeader ? `background-color : ${WHITE}` : ''};
    box-shadow: 0 0 0 2px ${GRAY};
  }

  .ant-input-suffix {
    font-size: 20px;
  }
  .ant-input-suffix:focus {
    background-color: ${WHITE};
  }

  .ant-btn-primary {
    color: #4d4d4d;
    border: none;
    box-shadow: none;
    border-radius: 3px !important;
    background-color: ${({ onHeader, focused }: StyledProps) =>
      focused || !onHeader ? '#e7e7e7' : '#e0e0e0'};
    border-color: ${({ onHeader, focused }: StyledProps) =>
      focused || !onHeader ? WHITE : GRAY_LIGHTEST};
    margin-right: 6px;
  }
`

export const Text = styled.div`
  color: ${WHITE};
`
export const SearchInput = styled(Search)`
  height: 50px;
  border-radius: 3px;
  background-color: ${WHITE};

  &:focus {
    background-color: ${WHITE};
  }

  input {
    width: ${(props: any) => props.width};
    border-radius: 3px;
    border: 0;
    color: ${BLACK};
    font-size: 16px;
    line-height: 22px;
  }
`
