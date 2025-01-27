/**
 * Styled Components - Created by eduardoquintero on 04/07/19.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import Button from 'antd/lib/button'
import Search from 'antd/lib/auto-complete'
import { GRAY_LIGHTEST } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  .ant-modal-content {
    border-radius: 0;
  }
`

export const CloseIcon = styled.img`
  position: absolute;
  right: 20px;
  &:hover {
    cursor: pointer;
  }
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
`

export const Label = styled.p`
  margin: 10px 0 5px 0;
`

export const StyledInput = styled(Input)`
  border-radius: 0;
`

export const StyledSearch = styled(Search)`
  border-radius: 0;
  max-height: 32px;
  line-height: 0px;
  font-size: 14px;
  width: 96%;
  & .ant-select-search__field {
    border-radius: 0;
    max-height: 32px;
    font-size: 14px;
  }
  & .ant-select-search {
    line-height: 0px;
  }
`

export const StyledSelect = styled(Select)`
  margin-right: 10px;
  & .ant-select-selection {
    border-radius: 0;
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  &.margin {
    margin-top: 10px;
  }
`

export const Column = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`

export const StyledButton = styled(Button)`
  background-color: ${({ disabled }: any) =>
    disabled ? `${GRAY_LIGHTEST} !important` : ''};
  border-color: ${({ disabled }: any) =>
    disabled ? `${GRAY_LIGHTEST} !important` : ''};
`

type PropsButton = {
  color: string
}

export const ButtonWrapper = styled.div`
  margin-left: 10px;
  .ant-btn-primary {
    background-color: ${({ color }: PropsButton) => color};
    border-color: ${({ color }: PropsButton) => color};
    width: 100%;
  }
  .ant-btn-ghost:hover,
  .ant-btn-ghost:focus,
  .ant-btn-primary:hover {
    background-color: ${({ color }: PropsButton) => color};
    border-color: ${({ color }: PropsButton) => color};
  }
`

export const ButtonsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
