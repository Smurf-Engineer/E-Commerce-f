/**
 * Styled Components - Created by gustavomedina on 05/07/18.
 */
import styled from 'styled-components'
import Select from 'antd/lib/select'
import AntdButton from 'antd/lib/button'

export const Container = styled.div`
  background-color: #222;
`

export const Text = styled.div`
  color: #fff;
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.18px;
  line-height: 22px;
  margin-right: 24px;
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

export const StyledSelect = styled(Select)`
  margin-top: 39px;
  width: 100%;
  align-self: center;
`

export const Button = styled(AntdButton)`
  height: 40px;
  width: 93px;
`

export const ButtonWrapper = styled.div`
  margin-top: 32px;
  text-align: right;
  align-self: right;
  .ant-btn-primary {
    background-color: #4a90e2;
    border-color: #4a90e2;
    width: 93px;
    color: white;
  }
  .ant-btn-primary:hover {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }
`
