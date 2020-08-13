/**
 * Styled Components - Created by david on 03/04/18.
 */
import styled from 'styled-components'
import MenuAntd from 'antd/lib/menu'
import { GRAY_LIGHT } from '../../../theme/colors'
const { SubMenu } = MenuAntd

export const Container = styled.div``

export const Text = styled.div`
  color: #fff;
`

export const LoginButton = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Bottom = styled.div``

export const SeeAll = styled.div`
  @media (max-width: 991px) {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 6px;
    font-weight: bold;
  }
`

export const StyledSubMenu = styled(SubMenu)`
  border-bottom: 1px solid ${GRAY_LIGHT};
  .ant-menu-submenu-title {
    padding-left: 6px !important;
    padding-right: 2px;
    width: 100%;
  }
  .ant-menu-submenu-arrow {
    right: 12px;
  }
`

export const Item = styled(MenuAntd.Item)`
  width: 100%;
  padding: 0 6px !important;
`

export const menuStyle = { width: '100%' }