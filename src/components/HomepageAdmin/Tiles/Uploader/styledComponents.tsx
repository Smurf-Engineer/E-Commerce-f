/**
 * Styled Components - Created by eduardoquintero on 13/06/19.
 */
import styled from 'styled-components'
import Upload from 'antd/lib/upload'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'

interface ImagePreviewProps {
  src: string
}

export const Container = styled.div`
  margin-bottom: 20px;
  width: 27%;
  position: relative;
`

export const ImagesContainer = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
`

export const UploadButton = styled.div`
  color: #5f6062;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  padding: 8px;
  cursor: pointer;
  width: 100%;
`

export const StyledUpload = styled(Upload)`
  border-radius: 0;
  & .ant-upload {
    border-radius: 0;
  }
  & .ant-upload-select-picture-card {
    width: 100% !important;
    height: 140px;
  }
  width: 100%;
`

export const ImagePreview = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${({ src }: ImagePreviewProps) => src || ''});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

export const StyledInput = styled(Input)`
  border-radius: 0;
  &.margin {
    margin-bottom: 15px;
  }
`

export const Title = styled.div`
  margin-bottom: 20px;
`

export const StyledButton = styled(Button)`
  position: absolute;
  right: 5px;
  top: 5px;
`
