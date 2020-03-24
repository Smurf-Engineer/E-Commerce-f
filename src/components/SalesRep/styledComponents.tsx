/**
 * Styled Components - Created by Jesús Apodaca on 19/03/20.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import CustomInput from '../Common/CustomInput'
import { GRAY_DARK, BLUE } from '../../theme/colors'
import { WHITE } from '../../screens/DesignerTool/constants'

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

export const Title = styled.div`
  margin-bottom: 24px;
  font-weight: 800;
  font-size: 16px;
`

export const FormContainer = styled.div``

export const StyledInput = styled(CustomInput)`
  margin-bottom: 20px;
  border-radius: 0px;
`

export const Buttons = styled.div`
  margin-top: 18px;
`

export const SaveButton = styled(Button)`
  background: ${BLUE};
  color: ${WHITE};
  margin-right: 18px;
  width: 116px;
  transition: all 0.25s;
  height: 36px;
  &:hover {
    border: 1px solid ${BLUE};
    background: ${WHITE};
    color: ${BLUE};
  }
`

export const CancelButton = styled(Button)`
  width: 116px;
  height: 36px;
`
