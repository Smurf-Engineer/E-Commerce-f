/**
 * Styled Components - Created by david on 08/06/18.
 */
import styled from 'styled-components'
import AntdButton from 'antd/lib/button'
import {
  GRAY_LIGHTEST,
  WHITE,
  GRAY,
  TRANSPARENT,
  BLUE
} from '../../../theme/colors'

export const Container = styled.div`
  padding-top: 16px;
  overflow: auto;
  padding: 15px 32px 32px 32px;
  height: 200px;
`
type RowProps = {
  selected: boolean
}

export const Row = styled.div`
  display: flex;
  flex: 1;
  padding: 4px;
  border: 1px solid
    ${({ selected }: RowProps) => (selected ? GRAY : TRANSPARENT)};
`

export const Col = styled.li`
  list-style: none;
  display: inline-block;
  width: calc(100% / 3);
  height: 88px;
  text-align: center;
  margin-bottom: 6px;
`

export const Image = styled.img`
  height: 88px;
  width: 88px;
  object-fit: contain;
  background-color: ${GRAY_LIGHTEST};
  cursor: pointer;
`

export const Text = styled.div`
  color: ${WHITE};
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding-left: 16px;
  justify-content: space-between;
`

export const Name = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const Size = styled.div`
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 10px;
  padding-top: 4px;
`

export const SizeRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const Delete = styled(AntdButton)``

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`

export const ButtonWrapper = styled.div`
  .ant-btn-primary  {
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
  .ant-btn-primary:hover {
    background-color:${BLUE};
    border-color: ${BLUE};
  }
`

export const Apply = styled(AntdButton)``
