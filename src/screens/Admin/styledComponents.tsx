/**
 * Styled Components - Created by david on 05/04/18.
 */
import styled from 'styled-components'
import { GRAY_DARK, GRAY_HEADER, WHITE } from '../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: ${WHITE};
`

export const SideBar = styled.div`
  width: 20%;
`

export const OptionMenu = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  padding-top: 8px;
  cursor: pointer;
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 20px;
  font-weight: 600;
`

export const menuStyle = { width: '100%', marginLeft: -24, paddingTop: 52 }

export const menuDeviceStyle = { width: '100%' }

export const DrawerSidebar = styled.div`
  .ant-menu-item {
    padding-left: 24px !important;
  }
  .ant-menu-item-custom {
    padding-left: 0 !important;
  }
  .ant-menu-submenu-title {
    padding-left: 0 !important;
  }
`

export const Header = styled.div`
  height: 70px;
  widht: 100%;
  background-color: ${GRAY_HEADER};
`

export const ContentHeader = styled.div`
  max-width: 1024px;
  margin: auto;
  padding: 18px 36px;
  display: flex;
  align-items: center;
`

export const LogoIcon = styled.img``

export const DesignerLink = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-left: 18px;
  cursor: pointer;
`

export const Content = styled.div`
  width: 50%;
  max-width: 900px;
  align-self: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 10vh;
`
