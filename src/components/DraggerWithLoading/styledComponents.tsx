/**
 * Styled Components - Created by david on 09/04/18.
 */
import styled from 'styled-components'
import Upload from 'antd/lib/upload'
import { RED } from '../../theme/colors'

const { Dragger } = Upload

interface DraggerProps {
  gallery: boolean
}

export const Container = styled.div`
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Text = styled.div`
  color: #fff;
`

export const DragMessage = styled.div`
  color: #5f6062;
  padding: 4px 0px;
  font-size: 16px;
  line-height: 22px;
`

export const DragTypes = styled.div`
  color: #bebebe;
  font-size: 13px;
  line-height: 18px;
`

export const Icon = styled.img`
  margin-bottom: 8px;
`

export const PreviewImage = styled.img`
  width: 100%
  height: 194px;
`

export const StyledDragger = styled(Dragger)`
  & .ant-upload {
    width: ${({ gallery }: DraggerProps) => gallery ? '100%' : 'auto'};
  }
`

export const GalleryButton = styled.div`
  color: ${RED};
  text-decoration: underline;
  padding: 5px;
  display: inline-flex;
  text-align: center;
  justify-content: center;
`

export const buttonStyle = {
  width: '20%',
  margin: '16px 0px'
}

export const draggerStyle = { padding: '30px 0px' }
