/**
 * Styled Components - Created by david on 05/04/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  min-height: calc(100vh - 200px);
`

export const SideBar = styled.div`
  width: 20%;
  padding-top: 36px;
  padding-left: 32px;
`

export const OptionMenu = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  padding-top: 8px;
  cursor: pointer;
`

interface ContentProps {
  width?: string
}

export const Content = styled.div`
  width: ${({ width }: ContentProps) => (width ? width : '80%')};
  padding-top: 36px;
  padding-left: 36px;

  @media (max-width: 768px) and (min-width: 320px) {
    padding: 31px 8px 32px;
  }
`
interface StyleProps {
  showChildren?: boolean
  color?: string
}

export const FiltersTitle = styled.div`
  display: ${({ showChildren }: StyleProps) =>
    showChildren ? 'inline-block' : 'none'};
  height: 36.95px;
  color: #5f6062;
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  margin-bottom: 15px;
  ${({ color }: StyleProps) => `color: ${color};`};
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
`
interface ScreenTitleProps {
  show?: boolean
}
export const ScreenTitle = styled.div`
  color: #5f6062;
  display: ${({ show }: ScreenTitleProps) => (show ? 'block' : 'none')};
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 64px;

  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
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
