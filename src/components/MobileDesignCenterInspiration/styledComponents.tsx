/**
 * Styled Components - Created by gustavomedina on 23/04/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  width: 115px;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  background-color: #fff;
  align-items: center;
  position: absolute;
  top: 125px;
  flex-wrap: wrap;
  max-height: 70px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  transition: max-height 0.3s ease;
  overflow: hidden;
  &.open {
    max-height: 50vh;
  }
`

export const StyledButton = styled(Button)`
  height: 70px;
  width: 100%;
  border: none;
  border-radius: 0;
  display: flex;
  white-space: normal;
  font-size: 12px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  color: #5f6062;
  font-weight: bold;
  &.ant-btn-clicked {
    background-color: #fff;
    border: none;
  }
  &.ant-btn-clicked::after,
  &:active,
  &:focus,
  &:hover {
    border-color: #fff;
    background: #fff;
    color: #5f6062;
  }
  &.small {
    height: 40px;
  }
`

export const CombosList = styled.div`
  width: 100%;
  overflow-y: scroll;
  max-height: 0;
  transition: max-height 0.3s ease;
  &.open {
    max-height: 35vh;
  }
`
