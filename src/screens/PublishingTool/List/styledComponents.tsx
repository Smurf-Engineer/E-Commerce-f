/**
 * Styled Components - Created by eduardoquintero on 09/12/19.
 */
import styled from 'styled-components'
import AntdButton from 'antd/lib/button'
import AntdInput from 'antd/lib/input'

export const Container = styled.div``

export const Title = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.18px;
  line-height: 22px;
  padding: 16px 0px;
`

export const Subtitle = styled.div`
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  padding: 16px 0;
`

export const Button = styled(AntdButton)`
  height: 50px;
  border: 2px solid #e61737;
  border-radius: 2px;
  background-color: #ffffff;
  color: #e61737;
  margin-right: 22px;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
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
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
  padding-top: 10px;
`

export const ListContainer = styled.div`
  & .radioGroup {
    width: 100%;
  }
`
