/**
 * Styled Components - Created by david on 09/02/18.
 */
import AntDivider from 'antd/lib/divider'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Avenir Next';
  margin-right: -14px;
  padding: 0px 4px 0px 16px;
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
  flex-direction: column;
  font-family: 'Avenir Next';
  justify-content: space-between;
  width: 15%;
`

export const Categories = styled.div`
  font-family: 'Avenir Next';
  padding-left: 16px;
  width: 25%;
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
