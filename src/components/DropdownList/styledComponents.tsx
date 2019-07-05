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
  text-transform: uppercase;
`
export const Option = styled.div`
  height: 100%;
`

export const overStyle = {
  paddingTop: 4,
  width: '100%'
}

export const menuStyle = {
  backgroundColor: 'transparent',
  borderBottom: 0,
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
} as React.CSSProperties
