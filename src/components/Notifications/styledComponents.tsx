/**
 * Styled Components - Created by eduardoquintero on 27/08/20.
 */

import styled from 'styled-components'
import { RED, GRAY_DARK } from '../../theme/colors'

export const Container = styled.div``

export const NotificationsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding-right: 10%;
    margin-bottom: 50px;
`
export const Latest = styled.div`
    font-weight: 600;
`

export const Button = styled.div`
    color: ${RED};
`

export const ScreenTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`
