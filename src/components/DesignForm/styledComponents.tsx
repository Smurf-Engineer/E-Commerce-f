/**
 * Styled Components - Created by david on 12/07/18.
 */
import styled from 'styled-components'
import AntdButton from 'antd/lib/button'

export const Container = styled.div`
  padding: 40px 0;
`

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
