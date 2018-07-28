/**
 * Styled Components - Created by david on 12/07/18.
 */
import styled from 'styled-components'
import AntdButton from 'antd/lib/button'
import AntdInput from 'antd/lib/input'

export const Container = styled.div``

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.18px;
  line-height: 22px;
  padding-bottom: 20px;
`

export const Subtitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  padding: 16px 0;
`

export const Button = styled(AntdButton)`
  width: 50%;
`

export const List = styled.div`
  border: 1px solid #f1f4f5;
  padding: 0px 30px 16px 19px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
export const Input = styled(AntdInput)`
  margin-bottom: 16px;
`

export const TextRed = styled.span`
  color: #e61737;
`

export const ImageInput = styled.div``

export const Types = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
  padding-top: 10px;
`
