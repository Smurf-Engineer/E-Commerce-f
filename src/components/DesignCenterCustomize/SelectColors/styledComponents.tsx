/**
 * Styled Components - Created by miguelcanobbio on 01/08/18.
 */
import styled from 'styled-components'
import Icon from 'antd/lib/icon'
import { GRAY_DARK, GRAY_LIGHT } from '../../../theme/colors'

export const Container = styled.div``

export const ColorLabel = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const BaseColors = styled.div`
  cursor: pointer;
`

export const BaseTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 32px;
`

export const Arrow = styled(Icon)`
  color: ${GRAY_DARK};
  font-size: 16px;
`

export const ColorButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
  padding: 14px 32px 0px 32px;

  @media (min-width: 768px) and (max-width: 991px) {
    flex-wrap: wrap;
    padding: 20px 0px 10px 18px;
  }
`

export const Divider = styled.div`
  background-color: ${GRAY_LIGHT};
  height: 1px;
  margin: 0 32px 4px 32px;
`
