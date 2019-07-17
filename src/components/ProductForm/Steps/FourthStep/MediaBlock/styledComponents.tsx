/**
 * Styled Components - Created by miguelcanobbio on 18/07/18.
 */
import styled from 'styled-components'
import Upload from 'antd/lib/upload'

interface DivProps {
  clickable?: boolean
  maxWidth?: boolean
}

export const Container = styled.div`
  margin: 8px 0;
  padding: 8px;
  border: 1px solid #cccccc;
  display: flex;
  flex-flow: column;
`
export const Images = styled.div`
  display: flex;
  margin-top: 8px;
`
export const ImageBox = styled.img`
  object-fit: contain;
  cursor: pointer;
  height: 220px;
  width: ${({ maxWidth }: DivProps) => (maxWidth ? '100%' : '200px')};
`

export const DeleteFile = styled.div`
  height: 17px;
  width: 50px;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  cursor: pointer;
`
export const DesktopImage = styled(Upload)`
  border: 1px dashed #cccccc;
  padding: 5px 0;
  flex: 2;
  .ant-upload {
    width: 100%;
  }
`

export const MobileImage = styled(Upload)`
  border: 1px dashed #cccccc;
  margin-left: 18px;
  padding: 5px 0;
  flex: 1;
`
