/**
 * Styled Components - Created by david on 11/07/18.
 */
import styled from 'styled-components'
import AntdInput from 'antd/lib/input'
import AntdInputNumber from 'antd/lib/input-number'

export const Container = styled.div``

export const ListContainer = styled.div`
  overflow: auto;
`

export const Input = styled(AntdInput)``

export const InputNumber = styled(AntdInputNumber)``

export const Text = styled.div`
  color: #fff;
`

export const EmptyLabel = styled.div`
  padding-top: 16px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  padding-bottom: 16px;
  font-weight: 600;
  text-align: center;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 16px;
`

export const Label = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

type ColumnProps = {
  width: string
}

export const Column = styled.div`
  margin-right: 16px;
  width: ${({ width }: ColumnProps) => width};
`
