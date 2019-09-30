/**
 * Styled Components - Created by eduardoquintero on 25/09/19.
 */
import styled from 'styled-components'
import Upload from 'antd/lib/upload'
import Spin from 'antd/lib/spin'

const { Dragger } = Upload

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Text = styled.div`
  color: #fff;
`

export const DragTypes = styled.div`
  color: #bebebe;
  font-size: 13px;
  line-height: 18px;
  margin-left: 10px;
`
export const PreviewImage = styled.img`
  width: 100%
  height: 194px;
`

export const buttonStyle = {
  width: '20%',
  margin: '16px 0px'
}

export const StyledDragger = styled(Dragger)`
  width: 100%;
  height: 30px;
`

export const StyledSpin = styled(Spin)`
  height: 20px;
`

export const draggerStyle = { padding: '30px 0px' }
