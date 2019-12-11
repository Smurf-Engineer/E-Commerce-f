/**
 * Styled Components - Created by eduardoquintero on 09/12/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import radioButton from 'antd/lib/radio/radioButton'
import { GRAY_HEADER, GRAY_LIGHTEST, GRAY } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 5px;
  border: 2px dashed transparent;
  transition: background-color 0.3s ease;
  border: 1px solid ${GRAY_LIGHTEST};
  &.over {
    border-color: #d3d3d3;
    background-color: ${GRAY_HEADER};
  }
  margin-bottom: 10px;
  width: 100%;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Name = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const DeleteButton = styled.div`
  cursor: pointer;
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`
export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`

export const EditButton = styled(Button)`
  margin-left: 8px;
`

export const DragIcon = styled(Icon)`
  transform: rotate(90deg);
  font-size: 20px;
  color: ${GRAY};
  &:first-child {
    margin-right: -15px;
  }
`

export const RadioButton = styled(radioButton)`
  height: auto;
  padding: 14px 0px;
  text-align: center;
`
