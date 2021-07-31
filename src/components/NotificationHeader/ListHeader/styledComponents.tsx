/**
 * Styled Components - Created by eduardoquintero on 25/08/20.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import { RED, GRAY_DARK } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 100%
  padding: 3px 8px;
`

export const Label = styled.div`
  text-align: center;
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`

export const TimeIcon = styled(Icon)`
  margin-right: 10px;
`

export const MarkButton = styled.div`
  color: ${RED};
  cursor: pointer;
  user-select: none;
  font-size: 14px;
`

export const BorderlessButton = styled(Button)`
    color: ${RED};
    border: none;
    box-shadow: none;
`
