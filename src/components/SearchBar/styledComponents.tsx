/**
 * Styled Components - Created by cazarez on 13/02/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import { BLACK } from '../../screens/DesignCenter/constants'
import { GRAY_DARK } from '../../theme/colors'
import { WHITE } from '../../screens/DesignerTool/constants'

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
    background-color: ${WHITE};
  }

  .ant-btn-primary {
    color: ${WHITE};
    border: none;
    box-shadow: none;
    border-radius: 5px !important;
    background-color: ${({ onHeader, focused }: StyledProps) =>
      focused || !onHeader ? '#fff' : GRAY_DARK};
  }
`

export const Text = styled.div`
  color: #fff;
`
export const SearchInput = styled(Search)`
  height: 50px;
  border-radius: 3px;
  background-color: #fff;

  &:focus {
    background-color: #fff;
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
