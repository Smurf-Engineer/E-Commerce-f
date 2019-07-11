/**
 * Styled Components - Created by david on 13/02/18.
 */
import styled from 'styled-components'
import AntDivider from 'antd/lib/divider'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: -14px;
  padding: 0px 0px 0px 16px;
`

export const LoadingContainer = styled.div`
  height: 22.67em;
  margin: -12px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface FilterProps {
  width?: string
}

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({ width }: FilterProps) => width};
`

export const Categories = styled.div`
  padding-left: 16px;
  width: 20%;
`

export const Divider = styled(AntDivider)`
  height: 22.67em;
  margin: -12px 0px;
`
