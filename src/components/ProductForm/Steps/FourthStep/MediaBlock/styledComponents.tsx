/**
 * Styled Components - Created by miguelcanobbio on 18/07/18.
 */
import styled from 'styled-components'
import Upload from 'antd/lib/upload'
import { MID_GRAY, GRAY } from '../../../../../theme/colors'

interface DivProps {
  clickable?: boolean
  maxWidth?: boolean
  mobile?: boolean
}

export const Container = styled.div`
  margin: 8px 0;
  padding: 8px;
  border: 1px solid ${MID_GRAY};
  display: flex;
  flex-flow: column;
  cursor: grab;
`
export const Images = styled.div`
  display: flex;
  margin-top: 8px;
`
export const ImageBox = styled.img`
  object-fit: contain;
  cursor: pointer;
  height: 100%;
  width: ${({ maxWidth }: DivProps) => (maxWidth ? '100%' : '200px')};
`

export const DeleteFile = styled.div`
  height: 17px;
  width: 20px;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  cursor: pointer;
  margin-right: 47%;
  display: inline-block;
`
export const ImageContainer = styled(Upload)`
  border: 1px dashed ${MID_GRAY};
  padding: 5px 0;
  flex: ${({ mobile }: DivProps) => (mobile ? '1' : '2')};
  margin-left: ${({ mobile }: DivProps) => (mobile ? '18px' : '0')};
  height: 220px;
  align-items: center;
  display: flex;
  text-align: center;
  .ant-upload {
    width: 100%;
    height: 100%;
  }
`
export const AddMaterial = styled.div`
  height: 100%;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  flex-flow: column;
  font-size: 18px;
  padding-top: 38px;
  color: ${GRAY};
`
export const Label = styled.div`
  display: flex;
  flex-flow: row;
  margin-top: 16px;
`
export const VideoBox = styled.video`
  width: 100%;
  cursor: pointer;
  height: 100%;
`
export const Loader = styled.div`
  flex: 2;
  height: 220px;
  display: inline-flex;
  border: 1px dashed ${MID_GRAY};
  justify-content: center;
  align-items: center;
`
export const SubLoader = styled.div`
  flex: 1;
  height: 220px;
  display: inline-flex;
  margin-left: 18px;
  border: 1px dashed ${MID_GRAY};
  justify-content: center;
  align-items: center;
`
