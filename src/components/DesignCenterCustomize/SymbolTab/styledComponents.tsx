/**
 * Styled Components - Created by david on 28/06/18.
 */
import styled from 'styled-components'
import AntdInput from 'antd/lib/input'
import {
  GRAY_LIGHTEST,
  GRAY_DARK,
  GRAY_LIGHT,
  BLUE,
  WHITE,
  GRAY,
  TRANSPARENT
} from '../../../theme/colors'

export const Container = styled.div``

export const Header = styled.div`
  background-color: ${GRAY_LIGHTEST};
  padding: 10px 30px;
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
`

export const Row = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
`
export const ArrowIcon = styled.img`
  padding-right: 8px;
`

export const Input = styled(AntdInput)`
  border-radius: 0px;
  height: 32px;
`

export const InputWrapper = styled.div`
  border-bottom: 1px solid ${GRAY_LIGHT};
  padding: 12px 32px;

  .ant-input-group-addon  {
    border: 0px;
  }

  .ant-input:hover {
    border-color: ${BLUE};
  }

  .ant-input:focus {
    border-color: ${BLUE};
    -webkit-box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    outline: 0;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    padding: 12px 10px;
  }
`

export const Button = styled.div`
  color: ${WHITE};
  cursor: pointer;
  font-size: 14px;
  line-height: 19px;
  user-select: none;
`

interface ListProps {
  height: number
}

export const List = styled.div`
  height: ${({ height }: ListProps) => height}vh;
  overflow: auto;
  padding: 4px 32px 32px 32px;

  @media (min-height: 800px) {
    height: 55vh;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    padding: 4px 5px 32px 2px;
  }
`

export const RowList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 0;
  width: 100%;
`

export const Col = styled.li`
  display: inline-block;
  height: 48px;
  list-style: none;
  margin-bottom: 6px;
  text-align: center;
  width: calc(100% / 4);
`

type ColProps = {
  selected: boolean
}

export const Icon = styled.img`
  border: 1px solid
    ${({ selected }: ColProps) => (selected ? GRAY : TRANSPARENT)};
  cursor: pointer;
  height: 48px;
  width: 48px;
`

export const NotFound = styled.div`
  margin-top: 40px;
  text-align: center;
  width: 100%;
`

export const Loading = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  text-align: center;
  width: 100%;
`
