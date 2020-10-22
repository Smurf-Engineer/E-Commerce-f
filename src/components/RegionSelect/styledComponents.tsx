/**
 * Styled Components - Created by gustavomedina on 30/07/18.
 */
import styled from 'styled-components'
import Select from 'antd/lib/select'

interface DivProps {
  reseller?: boolean
}

export const Container = styled.div`
  background-color: #ffffff;
`

export const Text = styled.div`
  color: #fff;
`

export const StyledSelect = styled(Select)`
  margin-top: ${({ reseller }: DivProps) => reseller ? '0' : '5px'};
  width: 100%;
  .ant-select-selection--single {
    border-radius: ${({ reseller }: DivProps) => reseller ? '0' : '4px'};
  }
`
