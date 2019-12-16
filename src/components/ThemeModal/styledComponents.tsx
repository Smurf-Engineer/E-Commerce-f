/**
 * Styled Components - Created by david on 29/11/18.
 */
import styled from 'styled-components'
import { BLUE, GRAY_LIGHT } from '../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`

export const Name = styled.div``

export const Image = styled.img`
  width: 302px;
  height: 302px;
`

export const Info = styled.div`
  margin-right: 24px;
`

export const DraggerContainer = styled.div`
  padding-top: 16px;

  .ant-upload.ant-upload-drag {
    padding: 8px;
  }
`

export const SaveButtonStyle = {
  backgroundColor: `${BLUE}`,
  borderColor: `${BLUE}`
}

export const DisableSaveStyle = {
  backgroundColor: `${GRAY_LIGHT}`,
  borderColor: `${GRAY_LIGHT}`
}
