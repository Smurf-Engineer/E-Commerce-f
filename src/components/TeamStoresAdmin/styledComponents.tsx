/**
 * Styled Components - Created by eduardoquintero on 15/07/19.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import { RED } from '../../theme/colors'

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

export const AddTeamStoreButton = styled.div`
  height: 50px;
  width: 220px;
  border: 2px solid ${RED};
  border-radius: 2px;
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  font-family: 'Avenir Next';
  font-size: 16px;
  color: ${RED};
  text-transform: uppercase;
  margin-right: 26px;
  cursor: pointer;
`
