/**
 * Styled Components - Created by eduardoquintero on 30/05/19.
 */
import styled from 'styled-components'
import Upload from 'antd/lib/upload'
import Input from 'antd/lib/input'

interface ImagePreviewProps {
  src: string
}

export const Container = styled.div`
  margin-bottom: 20px;
  width: 100%;
`

export const ImagesContainer = styled.div`
  margin-bottom: 10px;
  width: 48%;
  display: inline-flex;
  justify-content: space-between;
  position: relative;
`

export const UploadButton = styled.div`
  color: #5f6062;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  padding: 8px;
  cursor: pointer;
`

export const StyledUpload = styled(Upload)`
  width: calc(70% - 5px);
  border-radius: 0;
  & .ant-upload {
    border-radius: 0;
  }
  & .ant-upload-select-picture-card {
    width: 100% !important;
    height: 140px;
  }
`

export const StyledUploadMobile = styled(Upload)`
  width: calc(30% - 5px);
  & .ant-upload {
    border-radius: 0;
  }
  & .ant-upload-select-picture-card {
    width: 100% !important;
    height: 140px;
  }
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
  margin-left: 10px;
`

export const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 10px;
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 48%;
`

export const Title = styled.div`
  margin-bottom: 20px;
`

export const UploadersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
`
