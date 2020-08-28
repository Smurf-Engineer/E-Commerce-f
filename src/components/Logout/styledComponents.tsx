/**
 * Styled Components - Created by cazarez on 27/02/18.
 */
import styled from 'styled-components'
import icon from 'antd/lib/icon'
import { RED, GRAY_DARK, GRAY_LIGHT } from '../../theme/colors'

export const Container = styled.div`
  align-items: center;
  display: flex;
  border-bottom: 1px solid ${GRAY_LIGHT};
`

export const Text = styled.div`
  color: ${GRAY_DARK};
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 991px) {
    align-items: center;
    color: ${GRAY_DARK};
    display: flex;
    font-weight: 600;
    height: 40px;
    margin: 2px 0;
  }
`

export const Icon = styled(icon)`
  color: ${RED};
  margin-right: 4px;
  font-size: 15px;
  font-weight: 600;
`

export const RightIcon = styled(icon)`
  flex: 1;
  text-align: right;
  padding-right: 16px;
  font-size: 12px;
  color: ${RED};
`

export const LeftIcon = styled(icon)`
  padding-right: 28px;
  padding-left: 8px;
  font-size: 12px;
  color: ${RED};
`

export const menuStyle = {
  marginTop: 15,
  borderRadius: 0,
  paddingBottom: 20
}

export const OverviewStyle = { border: 'none' }

export const titleStyle = {
  marginBottom: 0
}