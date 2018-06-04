/**
 * Styled Components - Created by david on 07/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 72%;
  justify-content: space-between;
  flex-direction: row;
`

export const OptionDropdown = styled.div`
  color: #5f6062;
  font-size: 18px;
  cursor: pointer;
`
export const Option = styled.div`
  height: 100%;
`

export const overStyle = {
  width: '100%',
  paddingTop: 4
}

export const menuStyle = {
  borderBottom: 0,
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  backgroundColor: 'transparent'
} as React.CSSProperties
