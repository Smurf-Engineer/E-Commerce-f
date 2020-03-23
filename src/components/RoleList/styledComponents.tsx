/**
 * Styled Components - Created by Jesús Apodaca on 19/03/20.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import { GRAY_DARK } from '../../theme/colors'

const Option = Select.Option
const Search = Input.Search

export const Container = styled.div`
  padding-bottom: 36px;
  width: 100%;
`
export const ScreenTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`

export const SearchInput = styled(Search)`
  border-radius: 0;
  width: 500px;
  margin-right: 24px;
  & input {
    border-radius: 0;
    padding: 7px;
    height: 48px;
  }
`

export const HeaderList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const FilterDiv = styled.div``

export const Subtitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: -24px;
  margin-bottom: 6px;
`

export const FilterSelect = styled(Select)`
  width: 256px;
  .ant-select-selection {
    height: 48px;
    padding-top: 8px;
    border-radius: 0px;
  }
  .ant-select-selection__clear {
    right: 28px;
  }
`

export const RoleOption = styled(Option)``
