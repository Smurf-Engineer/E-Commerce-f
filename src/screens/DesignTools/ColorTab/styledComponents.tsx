/**
 * Styled Components - Created by Jesús Apodaca on 04/12/19.
 */
import styled from 'styled-components'
import icon from 'antd/lib/icon'
import { GRAY_DISABLE, GRAY_DARK } from '../../../theme/colors'

export const Container = styled.div``

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
  background-color: ${GRAY_DISABLE};
`

export const TextColors = styled.div`
  color: ${GRAY_DARK};
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
`

export const ButtonContainer = styled.div`
  display: inline-block;
  margin-left: 8px;
`

export const Icon = styled(icon)`
  margin-right: 8px;
`

export const DraggerContainer = styled.div`
  margin: 10px 32px;
  margin-bottom: 24px;
`
