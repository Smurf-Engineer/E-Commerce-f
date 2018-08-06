/**
 * Styled Components - Created by miguelcanobbio on 01/08/18.
 */
import styled from 'styled-components'
import Icon from 'antd/lib/icon'

export const Container = styled.div``

export const ColorLabel = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const BaseColors = styled.div`
  cursor: pointer;
`

export const BaseTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 32px;
`

export const Arrow = styled(Icon)`
  color: #5f6062;
  font-size: 16px;
`

export const ColorButtons = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 14px 32px 0px 32px;
  margin-bottom: 16px;
`

export const Divider = styled.div`
  margin: 0 32px 4px 32px;
  height: 1px;
  background-color: #dcdcdc;
`
