/**
 * Styled Components - Created by eduardo on 11/01/19.
 */
import Select from 'antd/lib/select'
import styled from 'styled-components'
import { GRAY_ANTDESIGN, GRAY_STRONG, RED } from '../../../theme/colors'

interface CellProps {
  width?: number
  align?: string
  start?: number
  end?: number
}

type SelectType = {
  selectWidth?: string
  highlightFields?: boolean
}

export const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  grid-column-start: ${({ start }: CellProps) => start || 'unset'};
  grid-column-end: ${({ end }: CellProps) => end || 'unset'};
  flex-flow: ${({ align }: CellProps) => align || 'row'};
  width: ${({ width }: CellProps) => (width ? width : 100)}%;
`

export const UpgradeTitle = styled.div`
  color: ${GRAY_STRONG};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  text-align: left;
  display: flex;
  width: auto;
  word-break: break-all;
`

export const QuestionSpan = styled.span`
  color: #5f6062;
  font-size: 16px;
  margin-left: 5px;
  border: 0.5px solid #dcdcdc;
  padding: 10px;
  line-height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 25px;
  height: 25px;

  &::after {
    content: '?';
  }
  &:hover {
    cursor: pointer;
  }
`

export const StyledSelect = styled(Select)`
  width: ${({ selectWidth }: SelectType) =>
    selectWidth ? selectWidth : '20%'};
  & .ant-select-selection {
    border-color: ${({ highlightFields }: SelectType) =>
    highlightFields ? RED : GRAY_ANTDESIGN};
  }
`