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
  GRAY_DARK,
  BLUE
} from '../../../theme/colors'

export const Container = styled.div`
  height: 100%;
  max-height: 200px;
  overflow: auto;
  padding: 15px 32px 32px 32px;
  padding-top: 16px;

  @media only screen and (min-device-width: 1366px) and (max-device-width: 1366px) and (orientation: landscape) {
    height: 450px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    height: 350px;
    padding: 5px 5px 0px;
  }
`
type RowProps = {
  selected: boolean
}

export const Row = styled.div`
  border: 1px solid
    ${({ selected }: RowProps) => (selected ? GRAY : TRANSPARENT)};
  display: flex;
  flex: 1;
  padding: 4px;
  position: relative;
`

export const Col = styled.li`
  display: inline-block;
  height: 88px;
  list-style: none;
  margin-bottom: 6px;
  text-align: center;
  width: calc(100% / 3);
`

export const Image = styled.img`
  background-color: ${GRAY_LIGHTEST};
  cursor: pointer;
  height: 88px;
  object-fit: contain;
  width: 88px;
`

export const Text = styled.div`
  color: ${WHITE};
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 16px;
  width: 70%;
`

export const Name = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Size = styled.div`
  color: ${GRAY_DARK};
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
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;

  @media (min-width: 768px) and (max-width: 1024px) {
    margin-top: 5px;
  }
`

export const ButtonWrapper = styled.div`
  .ant-btn-primary  {
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
  .ant-btn-primary:hover {
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
`

export const Apply = styled(AntdButton)``

export const LowQualityIcon = styled.img`
  position: absolute;
  width: 40px;
  left:52px;
  top: 4px;
`
