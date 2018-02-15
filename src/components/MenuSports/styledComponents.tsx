/**
 * Styled Components - Created by david on 13/02/18.
 */
import styled from 'styled-components'
import AntDivider from 'antd/lib/divider'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 0px 0px 16px;
  margin-right: -14px;
`

export const Filters = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  justify-content: space-between;
`

export const Divider = styled(AntDivider)`
  height: 22.67em;
  margin: -12px 0px;
`
