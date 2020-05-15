/**
 * Styled Components - Created by eduardoquintero on 29/03/19.
 */
import styled from 'styled-components'
import { RED } from '../../theme/colors'

export const SideBar = styled.div`
  width: 20%;
`

export const OptionMenu = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  padding-top: 8px;
  cursor: pointer;
`

export const Container = styled.div`
  display: flex;
  justify-content: start;
`

export const Content = styled.div`
  padding: 15px 30px;
  width: 80%;
`

export const LogoutButton = styled.div`
  padding-left: 24px !important;
`

export const Advertisement = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${RED};
`