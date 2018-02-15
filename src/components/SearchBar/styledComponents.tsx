/**
 * Styled Components - Created by cazarez on 13/02/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'

const Search = Input.Search
export const Container = styled.div``

export const Text = styled.div`
  color: #fff;
`

export const SearchInput = styled(Search)`
  height: 50px;

  input {
    border-radius: 0px;
    color: #bebebe;
    font-family: 'Avenir Next' !important;
    font-size: 16px;
    line-height: 22px;
  }

  .ant-input-suffix {
    font-size: 20px;
  }
`
