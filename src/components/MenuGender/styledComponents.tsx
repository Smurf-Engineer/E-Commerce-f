/**
 * Styled Components - Created by david on 09/02/18.
 */
import AntDivider from 'antd/lib/divider'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 4px 0px 16px;
  margin-right: -14px;
`

export const LoadingContainer = styled.div`
  height: 22.67em;
  width: 25%;
  margin: -12px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  height: 22.67em;
  margin: -12px 0px;
`
