/**
 * Styled Components - Created by david on 03/04/18.
 */
import styled from 'styled-components'
import MenuAntd from 'antd/lib/menu'
import { GRAY_LIGHTEST, RED } from '../../../theme/colors'
const { SubMenu } = MenuAntd

interface DivProps {
  withBorder?: boolean
}

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

export const BottomDiv = styled.div`
  @media (max-width: 991px) {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 6px;
    font-weight: bold;
  }
`

export const SelectAll = styled(BottomDiv)`
  @media (max-width: 991px) {
    font-weight: normal;
  }
`

export const StyledSubMenu = styled(SubMenu)`
  border-bottom: 1px solid ${GRAY_LIGHTEST};
  .ant-menu-submenu-title {
    padding-left: 6px !important;
    padding-right: 2px;
    width: 100%;
  }
  .ant-menu-submenu-arrow {
    right: 12px;
  }
`

export const MenuTitle = styled.div``

export const BetaLabel = styled.div`
  display: inline-block;
  font-size: 9px;
  color: ${RED};
  font-style: italic;
  margin-left: 4px;
  vertical-align: top;
  margin-top: -2px;
  font-weight: bold;
`

export const Item = styled(MenuAntd.Item)`
  width: 100%;
  padding: 0 6px !important;
  text-transform: ${({ withBorder }: DivProps) => withBorder ? `uppercase` : 'capitalize'};
  border-bottom: ${({ withBorder }: DivProps) => withBorder ? `1px solid ${GRAY_LIGHTEST}` : 'none'};
`

export const SeeAllItem = styled(Item)`
  border-bottom: 1px solid ${GRAY_LIGHTEST};
`

export const containerStyle = { height: 'auto' }

export const menuStyle = { width: '100%', overflowX: 'hidden' }