/**
 * Styled Components - Created by eduardoquintero on 29/03/19.
 */
import styled from 'styled-components'
import Menu from 'antd/lib/menu'
import { RED, WHITE } from '../../theme/colors'

const { Item } = Menu

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
  position: reltive;
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

type MenuItemProps = {
  notifications?: number
}

export const MenuItem = styled(Item)`
  position: relative;
  &.badge::after {
    content: '${({ notifications }: MenuItemProps) => (notifications)}' !important;
    font-size: 11px;
    align-items: center;
    justify-content: center;
    color: ${WHITE};
    opacity: 1;
    display: flex;
    position: absolute;
    right: 10px !important;
    width: 24px;
    height: 24px;
    background: ${RED};
    border-radius: 12px;
    top: calc(50% - 12px) !important;
    border: none;
    transform: none !important;
  }
`
