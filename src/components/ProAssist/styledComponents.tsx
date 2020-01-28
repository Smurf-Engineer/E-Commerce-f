/**
 * Styled Components - Created by eduardoquintero on 16/01/20.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'

const Search = Input.Search

export const Container = styled.div`
  padding-bottom: 36px;
  width: 100%;
`
export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`

export const SearchInput = styled(Search)`
  margin-bottom: 20px;
  margin-top: 0px;
  border-radius: 0;
  margin-left: 4px;
  width: 500px;
  & input {
    border-radius: 0;
    padding: 7px;
    height: 48px;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-right: 34px;
`

export const ActiveLabel = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

export const SwitchLabel = styled.div``
