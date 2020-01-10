/**
 * Styled Components - Created by eduardoquintero on 17/12/19.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import { BLUE, GRAY_LIGHT } from '../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`

export const Name = styled.div``

export const Info = styled.div`
  width: 100%;
`

export const Label = styled.p`
  margin-bottom: 5px;
`

export const DraggerContainer = styled.div`
  margin-bottom: 10px;
  .ant-upload.ant-upload-drag {
    padding: 8px;
  }
`

export const StyledInput = styled(Input)`
  margin-bottom: 10px;
`

export const SaveButtonStyle = {
  backgroundColor: `${BLUE}`,
  borderColor: `${BLUE}`
}

export const DisableSaveStyle = {
  backgroundColor: `${GRAY_LIGHT}`,
  borderColor: `${GRAY_LIGHT}`
}
