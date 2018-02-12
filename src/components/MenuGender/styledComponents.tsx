/**
 * Styled Components - Created by david on 09/02/18.
 */
import AntDivider from 'antd/lib/divider'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 16px;
`

export const Filters = styled.div`
  display: flex;
  width: 15%;
  flex-direction: column;
  justify-content: space-between;
`

export const Categories = styled.div`
  width: 25%;
  padding-left: 16px;
`

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 22px;
`

export const Divider = styled(AntDivider)`
  height: 20.89em;
  margin: -12px 8px;
`
