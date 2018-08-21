/**
 * Styled Components - Created by david on 28/06/18.
 */
import styled from 'styled-components'
import AntdInput from 'antd/lib/input'

export const Container = styled.div``

export const Header = styled.div`
  background-color: #f1f4f5;
  padding: 10px 30px;
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`
export const ArrowIcon = styled.img`
  padding-right: 8px;
`

export const Input = styled(AntdInput)`
  border-radius: 0px;
  height: 32px;
`

export const InputWrapper = styled.div`
  padding: 12px 32px;
  border-bottom: 1px solid #dcdcdc;
  .ant-input-group-addon  {
    border: 0px;
  }

  .ant-input:hover {
    border-color: #4a90e2;
  }

  .ant-input:focus {
    border-color: #4a90e2;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`

export const Button = styled.div`
  cursor: pointer;
  user-select: none;
  color: #ffffff;
  font-size: 14px;
  line-height: 19px;
`

interface ListProps {
  height: number
}

export const List = styled.div`
  overflow: auto;
  height: ${({ height }: ListProps) => height}vh;
  padding: 0px 32px 32px 32px;

  @media (min-height: 800px) {
    height: 55vh;
  }
`

export const RowList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 0;
`

export const Col = styled.li`
  list-style: none;
  display: inline-block;
  width: calc(100% / 4);
  height: 48px;
  text-align: center;
  margin-bottom: 6px;
`

export const Icon = styled.img`
  cursor: pointer;
  width: 48px;
  height: 48px;
`

export const NotFound = styled.div`
  width: 100%;
  margin-top: 40px;
  text-align: center;
`

export const Loading = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`
