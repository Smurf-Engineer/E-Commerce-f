/**
 * Styled Components - Created by Jesús Apodaca on 17/12/19.
 */
import styled from 'styled-components'
import { GRAY_DARK, RED, GRAY } from '../../../theme/colors'
import AntdInput from 'antd/lib/input'
import AntdModal from 'antd/lib/modal'
import Icon from 'antd/lib/icon'
import Spin from 'antd/lib/spin'

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
  width: 210px;
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  letter-spacing: 0.25px;
`

export const FormContainer = styled.div``

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
`

export const Label = styled.div`
  color: ${GRAY_DARK};
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
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
  width: 344px;
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
    width: auto;
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

export const maskStyles = {
  backgroundColor: 'rgba(241,244,245,0.5)'
}
