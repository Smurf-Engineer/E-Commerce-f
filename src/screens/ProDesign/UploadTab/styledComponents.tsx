/**
 * Styled Components - Created by eduardoquintero on 19/09/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Search from 'antd/lib/auto-complete'
import { GRAY_LIGHTEST } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Content = styled.div`
  padding: 15px;
  display: flex;
`

export const Header = styled.div`
  background-color: ${GRAY_LIGHTEST};
  font-size: 15px;
  text-align: center;
  padding: 10px;
  font-weight: 600;
`

export const SearchButton = styled(Button)`
  height: 100%;
  border: none;
  width: 35px;
`

export const SearchInput = styled(Input)`
  input {
    border-radius: 0;
    width: 100%;
  }
`

export const StyledSearch = styled(Search)`
  width: 100%;
`
