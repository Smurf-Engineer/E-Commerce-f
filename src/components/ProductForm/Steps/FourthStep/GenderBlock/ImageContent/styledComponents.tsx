/**
 * Styled Components - Created by Jesús Apodaca on 12/09/19.
 */
import styled from 'styled-components'
import Icon from 'antd/lib/icon'
import { GRAY } from '../../../../../../theme/colors'

export const Label = styled.div`
  margin-top: 16px;
  margin-bottom: 10px;
`

export const ImageBox = styled.img`
  object-fit: contain;
  height: 200px;
  width: 200px;
`
export const EmptyBox = styled.div`
  height: 200px;
  width: 200px;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  flex-flow: column;
  font-size: 18px;
  padding-top: 38px;
  color: ${GRAY};
`

export const Loader = styled.div`
  width: 200px;
  height: 200px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

export const AddIcon = styled(Icon)`
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
`
