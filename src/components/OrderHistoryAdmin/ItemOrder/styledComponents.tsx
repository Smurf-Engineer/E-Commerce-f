/**
 * Styled Components - Created by miguelcanobbio on 13/07/18.
 */
import styled from 'styled-components'
import { RED } from '../../../theme/colors'
import Icon from 'antd/lib/icon'
import Select from 'antd/lib/select'

export const Container = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #e6e6e5;
  }
`

interface CellProps {
  color?: string
  textAlign?: string
}

export const Cell = styled.td`
  border-bottom: 1px solid #d7d7d7;
  text-align: left;
  padding: 8px 0;
  color: ${({ color }: CellProps) => (color ? color : '#5f6062')};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 35px;
  text-align: ${({ textAlign }: CellProps) =>
    textAlign ? textAlign : 'start'};
  &.error {
    color: ${RED};
  }
  @media (min-width: 331px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 12px;
  }

  @media (max-width: 330px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 11px;
  }
`

export const WarningIcon = styled(Icon)`
  font-size: 18px;
  color: ${RED};
  margin-right: 8px;
`

export const StyledSelect = styled(Select)`
  width: 160px;
  margin-left: 15px;
  & .ant-select-selection {
    border-radius: 0;
  }
`
