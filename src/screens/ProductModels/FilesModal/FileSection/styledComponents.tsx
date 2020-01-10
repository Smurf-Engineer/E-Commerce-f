/**
 * Styled Components - Created by Jesús Apodaca on 17/12/19.
 */
import styled from 'styled-components'
import Icon from 'antd/lib/icon'
import {
  GRAY_DARK,
  GRAY,
  RED,
  MID_GRAY,
  GRAY_LIGHT
} from '../../../../theme/colors'
import Collapse from 'antd/lib/collapse'
import { WHITE } from '../../../DesignerTool/constants'
const { Panel } = Collapse

interface DivProps {
  active: boolean
}

export const Container = styled.div``

export const Label = styled.div`
  color: ${GRAY_DARK};
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const FileContainer = styled.div`
  margin: 12px 0;
  .ant-upload-select-picture-card {
    width: 100%;
    height: 40px;
    margin: 4px 0 12px 0;
    background: none;
    border-style: ${({ active }: DivProps) => (active ? 'solid' : 'dashed')};
  }
`

export const PlaceHolder = styled.div`
  text-align: left;
  color: ${GRAY};
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 23px;
`

export const CenterName = styled.div`
  color: ${GRAY_DARK};
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const FileTag = styled.div`
  justify-content: flex-start;
  display: flex;
  align-items: center;
`

export const FileName = styled.div`
  flex: 1;
  text-align: left;
`

export const Clip = styled(Icon)`
  margin-right: 8px;
  color: ${RED};
  opacity: 0.65;
`

export const Delete = styled(Icon)`
  color: ${MID_GRAY};
  z-index: 3;
  width: 26px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StrongLabel = styled.div`
  color: ${GRAY_DARK};
  font-family: 'Avenir Next';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const ExtraFileSection = styled(Collapse)``

export const DefaultButton = styled.div`
  margin: 18px 0;
`

export const ExtraFile = styled(Panel)`
  border: 0.5px solid ${GRAY_LIGHT};
  background-color: ${WHITE};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  margin: 10px 0;
  .arrow {
    right: 16px;
    left: unset !important;
    color: ${GRAY};
  }
  .ant-collapse-header {
    padding: 12px !important;
  }
  .ant-collapse-content-box {
    padding-bottom: 4px;
  }
  .ant-upload-select-picture-card {
    width: 100%;
    height: 40px;
    margin: 4px 0 12px 0;
    background: none;
    border-style: ${({ active }: DivProps) => (active ? 'solid' : 'dashed')};
  }
`
