/**
 * Styled Components - Created by eduardo on 24/12/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { WHITE, GRAY_DARK } from '../../theme/colors'

export const Container = styled.div`
  width: 115px;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  background-color: ${WHITE};
  align-items: center;
  position: absolute;
  top: 51px;
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
  justify-content: center;
  align-items: center;
  background-color: ${WHITE};
  color: ${GRAY_DARK};
  font-weight: bold;
  &.ant-btn-clicked,
  &.ant-btn-clicked::after,
  &:active,
  &:focus,
  &:hover {
    border-color: ${WHITE};
    background: ${WHITE};
    color: ${GRAY_DARK};
  }
  &.small {
    height: 26px;
  }
`

export const CombosList = styled.div`
  width: 100%;
  overflow-y: scroll;
  max-height: 0;
  transition: max-height 0.3s ease;
  &.open {
    max-height: 32vh;
  }
`

export const Image = styled.img`
  transition: max-height, margin-top 0.3s ease;
  max-height: 20px;
  margin-top: 8px;
  &.hide {
    margin-top: 0;
    max-height: 0;
  }
`
