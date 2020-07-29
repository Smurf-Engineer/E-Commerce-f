/**
 * Styled Components - Created by Jesús Apodaca on 17/12/19.
 */
import styled from 'styled-components'
import {
  GRAY_DARK,
  RED,
  GRAY,
  BLUE,
  WHITE,
  BLUE_SOFT
} from '../../../theme/colors'
import transparentGrid from '../../../assets/transparent_grid.png'
import AntdInput from 'antd/lib/input'
import AntdButton from 'antd/lib/button'
import AntdModal from 'antd/lib/modal'
import Icon from 'antd/lib/icon'
import Spin from 'antd/lib/spin'

interface DivProps {
  hexColor?: string
}

export const Modal = styled(AntdModal)`
  .ant-modal-content {
    border-radius: 0px;
  }
  .ant-modal-body {
    padding: 45px 40px 20px;
  }
`

export const Title = styled.div`
  height: 27px;
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  letter-spacing: 0.25px;
`

export const FormContainer = styled.div`
  margin-top: 28px;
`

export const RowInput = styled.div`
  display: flex;
  margin: 24px 0;
  font-family: 'Avenir Next';
  font-size: 14px;
`

export const NameInput = styled.div`
  max-width: 356px;
  width: 100%;
  margin-right: 12px;
  margin-bottom: 20px;
`

export const Label = styled.div`
  color: ${GRAY_DARK};
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const CloseIcon = styled.img`
  position: absolute;
  width: 20px;
  right: 36px;
  margin-top: 4px;
  &:hover {
    cursor: pointer;
  }
`

export const IconInput = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`

export const Input = styled(AntdInput)`
  border: 1px solid ${GRAY};
  border-radius: 0;
  margin-top: 5px;
  height: 40px;
  width: 100%;
  .ant-input {
    border: none;
    border-radius: 0;
    padding-left: 44px !important;
  }
  .ant-input-prefix {
    left: 4px;
  }
  &:focus {
    border: 1px solid ${RED};
    box-shadow: none;
  }
`

export const UploadContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  position: relative;
  margin-top: 4px;
  .ant-upload-select-picture-card {
    width: 40px;
    height: auto;
    margin: 0;
    background: none;
  }
`

export const StyledIcon = styled(Icon)`
  width: 18px;
  right: 22px;
  top: 14px;
  position: absolute;
  z-index: 2;
  cursor: pointer;
  color: white;
  filter: drop-shadow(0px 0px 2px ${GRAY});
`

export const Loading = styled(Spin)`
  width: 24px;
`

export const ModelIcon = styled.img`
  width: 24px;
  max-height: 100%;
  object-fit: contain;
`

export const SaveSection = styled.div`
  text-align: right;
  margin-top: 28px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const SaveButton = styled(AntdButton)`
  max-width: 98px;
  border-radius: 2px;
  border: none;
  width: 100%;
  height: 40px;
  background: ${BLUE};
  color: ${WHITE};
  &:hover {
    background: ${BLUE_SOFT};
    color: ${WHITE};
  }
`

export const CancelButton = styled(AntdButton)`
  max-width: 98px;
  margin-right: 12px;
  border: 1px solid ${GRAY};
  border-radius: 2px;
  width: 100%;
  height: 40px;
  transition: all .25s;
  background: ${WHITE};
  &:hover {
    color: ${RED};
    border: 1px solid ${RED};
  }
`

export const ColorSelected = styled.div`
  width: 31px;
  height: 31px;
  border: 1px solid ${GRAY};
  background: ${({ hexColor }: DivProps) => hexColor ? hexColor : `url(${transparentGrid})`};
`

export const maskStyles = {
  backgroundColor: 'rgba(241,244,245,0.5)'
}
