/**
 * Styled Components - Created by miguelcanobbio on 17/08/18.
 */
import styled from 'styled-components'
import icon from 'antd/lib/icon'
import { GRAY_DARK } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
`

export const Name = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-right: 8px;
`

export const Icon = styled(icon)`
  color: ${GRAY_DARK};
  font-size: 16px;
`
