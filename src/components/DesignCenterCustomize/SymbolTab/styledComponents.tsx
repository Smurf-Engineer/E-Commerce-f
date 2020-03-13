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
  TRANSPARENT,
  RED
} from '../../../theme/colors'
import { AVENIR_NEXT } from '../../../theme/fonts'

interface ClipartProps {
  stroke: string
  fill: string
  strokeWidth: number
}

export const Container = styled.div``

export const Header = styled.div`
  background-color: ${GRAY_LIGHTEST};
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  min-height: 55px;
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

export const LockContainer = styled.div`
  cursor: pointer;
  padding: 2px;
  display: inline-block;
  font-size: 20px;
`

export const AddTextButton = styled.div`
  cursor: pointer;
  height: 40px;
  max-width: 100%;
  border: 2px solid ${RED};
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  color: ${RED};
  display: flex;
  margin: 16px;
  transition: all 0.2s;
  &:hover {
    background: ${RED};
    color: ${WHITE};
  }
`

export const LayersText = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.09px;
  line-height: 22px;
  margin: 0 16px 16px;
`

export const ClipartsLayers = styled.div`
  display: flex;
  flex-flow: column;
`

export const Layer = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid ${GRAY_LIGHT};
  align-items: center;
  cursor: move;
`

export const TitleLayer = styled.div`
  flex: 1;
  font-size: 18px;
`

export const DeleteLayer = styled.div`
  color: ${RED};
  font-family: ${AVENIR_NEXT};
  font-size: 12px;
  letter-spacing: 0.09px;
  cursor: pointer;
  margin-right: 8px;
  text-align: center;
  transition: all 0.2s;
  border-radius: 2px;
  padding: 7px;
  &:hover {
    background: ${RED};
    color: ${WHITE};
  }
`

export const EditLayer = styled.div`
  width: 54px;
  border: 1px solid ${GRAY_LIGHT};
  border-radius: 2px;
  text-align: center;
  padding: 7px;
  cursor: pointer;
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 12px;
  transition: all 0.2s;
  &:hover {
    background: ${GRAY_DARK};
    color: ${WHITE};
  }
`

export const ClipartPrev = styled.div`
  text-align: center;
  svg {
    width: 60px;
    height: 68px;
    fill: ${({ fill }: ClipartProps) => fill};
    stroke: ${({ stroke }: ClipartProps) => stroke};
    stroke-width: ${({ strokeWidth }: ClipartProps) => strokeWidth}px;
  }
`

export const ClipartLeft = styled.div`
  flex: 1;
  text-align: center;
  margin-right: 8px;
  background: ${GRAY_LIGHTEST};
  border-radius: 2px;
`

export const EmptyElements = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
  text-align: center;
  padding: 16px;
`

export const DragIcon = styled.img`
  max-width: 8px;
  margin-right: 8px;
`
