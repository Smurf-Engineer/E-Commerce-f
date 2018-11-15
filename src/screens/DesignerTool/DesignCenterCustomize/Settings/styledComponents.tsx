/**
 * Styled Components - Created by david on 26/07/18.
 */
import styled from 'styled-components'
import AntdButton from 'antd/lib/button'
import AntdInput from 'antd/lib/input'
import AntdInputNumber from 'antd/lib/input-number'

export const Container = styled.div`
  padding-top: 8px;
`

export const Text = styled.div`
  color: #fff;
`

export const UploadWrapper = styled.div`
  margin-top: 16px;
  margin-left: 16px;
`

export const List = styled.div`
  padding-top: 24px;
`

export const Button = styled(AntdButton)`
  margin-left: 8px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 16px;
`

type ColumnProps = {
  width: string
}

export const Column = styled.div`
  margin-right: 16px;
  width: ${({ width }: ColumnProps) => width};
`

export const Label = styled.div`
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  padding-bottom: 8px;
`
export const DesignInfo = styled.div`
  padding: 0 8px;
`

export const Input = styled(AntdInput)``

export const InputNumber = styled(AntdInputNumber)``
