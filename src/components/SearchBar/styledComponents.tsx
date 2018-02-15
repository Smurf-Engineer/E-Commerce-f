/**
 * Styled Components - Created by cazarez on 13/02/18.
 */
import styled, { ThemedStyledProps } from 'styled-components'
import Input from 'antd/lib/input'

const Search = Input.Search
export const Container = styled.div``

export const Text = styled.div`
  color: #fff;
`

export const SearchInput = styled(Search)`
  height: 50px;
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
    background-color: #fff;
    border-color: #fff;
  }
`
