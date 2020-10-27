/**
 * Styled Components - Created by cazarez on 13/02/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import { BLACK } from '../../screens/DesignCenter/constants'
import { GRAY } from '../../theme/colors'
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
    color: grey;
    background-color: ${({ onHeader, focused }: StyledProps) =>
      focused || !onHeader ? WHITE : '#f6f6f6'};
    border-color: ${({ onHeader, focused }: StyledProps) =>
      focused || !onHeader ? WHITE : '#f6f6f6'};
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
